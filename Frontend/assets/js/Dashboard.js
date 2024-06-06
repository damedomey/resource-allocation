document.addEventListener("DOMContentLoaded", function () {
    let resources = [];
    let reservations = [];

    // Chargement des données depuis l'API et mise à jour de l'affichage
    Promise.all([
        fetch('http://localhost:3000/resources').then(response => response.json()),
        fetch('http://localhost:3000/reservations').then(response => response.json())
    ]).then(data => {
        resources = data[0];
        reservations = data[1];
        updateLayout(resources);  // Mise à jour initiale avec toutes les ressources
    });

    // Initialisation du tooltip pour afficher des détails
    const tooltip = d3.select('body').select('div.container').select('div.row').append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('padding', '10px')
        .style('background', 'white')
        .style('border', '1px solid #ccc')
        .style('border-radius', '5px')
        .style('pointer-events', 'none');


    const rectWidth = 100;
    const rectHeight = 50;
    const spacing = 10;
    const maxSvgWidth = 960;


    function updateLayout(filteredResources) {
        const svgWidth = Math.min(window.innerWidth, maxSvgWidth);
        const numItemsPerRow = Math.floor(svgWidth / (rectWidth + spacing));
        const svgHeight = (Math.ceil(filteredResources.length / numItemsPerRow) * (rectHeight + spacing)) + spacing;
    
        let svg = d3.select('svg');
        if (svg.empty()) {
            svg = d3.select('body').append('svg');
        }
    
        svg.attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .style('width', '100%')
            .style('height', 'auto');
    
        // Clean up existing groups
        svg.selectAll('g').remove();
    
        // Create a group for each resource
        const groups = svg.selectAll('g')
                          .data(filteredResources, d => d.id)
                          .enter()
                          .append('g')
                          .attr('transform', (_, i) => `translate(${(i % numItemsPerRow) * (rectWidth + spacing) + spacing}, ${Math.floor(i / numItemsPerRow) * (rectHeight + spacing) + spacing})`);
    
        // Add rectangles to each group
        groups.append('rect')
              .attr('width', rectWidth)
              .attr('height', rectHeight)
              .attr('fill', d => {
                  const rate = calculateOccupancy(d.id, d.maxCapacity);
                  return rate > 0 ? 'red' : 'green';
              });
    
        // Add text to each group
        groups.append('text')
              .attr('x', rectWidth / 2)
              .attr('y', rectHeight / 2)
              .attr('dy', '0.35em')
              .attr('text-anchor', 'middle')
              .style('font-size', '12px')
              .text(d => truncateText(d.resourceName, 10));
    
        // Mouseover events for the rectangles
        groups.select('rect')
              .on('mouseover', function (event, d) {
                  const occupancyRate = calculateOccupancy(d.id, d.maxCapacity);
                  const infoBox = document.getElementById('infoBox');
                  infoBox.innerHTML = `Nom: ${d.resourceName}<br>Capacité Max: ${d.maxCapacity}<br>Area Size: ${d.areaSize}<br>Type: ${d.resourceType}<br>Taux d'occupation: ${occupancyRate}%`;
                  infoBox.style.visibility = 'visible';
              })
              .on('mousemove', function (event) {
                  const infoBox = document.getElementById('infoBox');
                  infoBox.style.left = (event.pageX + 15) + 'px'; // 15 pixels à droite du curseur
                  infoBox.style.top = (event.pageY + 15) + 'px'; // 15 pixels en dessous du curseur
              })
              .on('mouseout', function () {
                  const infoBox = document.getElementById('infoBox');
                  infoBox.style.visibility = 'hidden';
              });
    
        // Remove any old groups that are no longer needed
        svg.selectAll('g').data(filteredResources, d => d.id).exit().remove();
    }
    
    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    }

    // Filtrer les ressources en fonction des critères sélectionnés
    window.applyFilters = function () {
        const selectedType = Array.from(document.getElementById('filterType').selectedOptions).map(option => option.value);
        const selectedCapacity = document.getElementById('filterCapacity').value;
        const selectedUsers = Array.from(document.getElementById('filterUsers').selectedOptions).map(option => option.value);
        const selectedEquipment = Array.from(document.getElementById('filterEquipment').selectedOptions).map(option => option.value);
        const isAccessible = document.getElementById('filterAccessible').checked;

        const filteredResources = resources.filter(resource => {
            // Vérifiez que les utilisateurs autorisés et les équipements existent avant de les utiliser
            const TypeMatch = selectedType.length === 0 || (resource.resourceType && selectedType.every(type => resource.resourceType.includes(type)));
            const usersMatch = selectedUsers.length === 0 || (resource.authorizedUsers && selectedUsers.every(user => resource.authorizedUsers.includes(user)));
            const equipmentMatch = selectedEquipment.length === 0 || (resource.equipmentContainer && selectedEquipment.every(equip => resource.equipmentContainer.includes(equip)));
            const accessibilityMatch = isAccessible ? resource.accessible === 'on' : true;
            //(selectedType === 'all' || resource.resourceType === selectedType) &&
            return (selectedCapacity === '' || parseInt(resource.maxCapacity) >= parseInt(selectedCapacity)) && TypeMatch &&
                usersMatch && equipmentMatch && accessibilityMatch;
        });

        updateLayout(filteredResources);
    };

    function calculateOccupancy(resourceId, maxCapacity) {
        maxCapacity = parseInt(maxCapacity, 10);
        const reservationsForThisResource = reservations.filter(r => r.resourceId === resourceId);
        const totalPeople = reservationsForThisResource.reduce((acc, curr) => acc + curr.numberOfPeople, 0);
        const occupancyRate = (totalPeople / maxCapacity) * 100;
        return occupancyRate.toFixed(0);
    }

    // Événement pour gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', () => updateLayout(resources));
});