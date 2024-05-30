document.addEventListener("DOMContentLoaded", function () {
    let resources = [];

    // Chargement des données depuis l'API
    fetch('http://localhost:3000/resources')
        .then(response => response.json())
        .then(data => {
            resources = data; // Stocke les données dans la variable 'resources'
            updateLayout(resources);
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

    // Fonction pour mettre à jour la mise en page des ressources
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

        const rects = svg.selectAll('rect').data(filteredResources, d => d.id);
        // rects.enter().append('rect').merge(rects)
        //     .attr('x', (_, i) => (i % numItemsPerRow) * (rectWidth + spacing) + spacing)
        //     .attr('y', (_, i) => Math.floor(i / numItemsPerRow) * (rectHeight + spacing) + spacing)
        //     .attr('width', rectWidth)
        //     .attr('height', rectHeight)
        //     .attr('fill', 'lightblue')
        //     .on('mouseover', function(event, d) {
        //         console.log('Données du rectangle survolé:', d);
        //         tooltip.html(`Nom: ${d.resourceName}<br>Capacité Max: ${d.maxCapacity}<br>Taille: ${d.areaSize}<br>Type: ${d.resourceType}<br>ID: ${d.id}`)
        //                .style('visibility', 'visible')
        //                .style('left', (event.pageX + 15) + 'px')
        //                .style('top', (event.pageY - 35) + 'px');
        //     })
        //     .on('mouseout', function() {
        //         tooltip.style('visibility', 'hidden');
        //     });
        // rects.enter().append('rect').merge(rects)
        //     .attr('x', (_, i) => (i % numItemsPerRow) * (rectWidth + spacing) + spacing)
        //     .attr('y', (_, i) => Math.floor(i / numItemsPerRow) * (rectHeight + spacing) + spacing)
        //     .attr('width', rectWidth)
        //     .attr('height', rectHeight)
        //     .attr('fill', 'lightblue')
        //     .on('mouseover', function (event, d) {
        //         const infoBox = document.getElementById('infoBox');
        //         infoBox.style.display = 'block';
        //         infoBox.innerHTML = `Nom: ${d.resourceName}<br>Capacité Max: ${d.maxCapacity}<br>Taille: ${d.areaSize}<br>Type: ${d.resourceType}<br>ID: ${d.id}`;
        //     })
        //     .on('mouseout', function () {
        //         document.getElementById('infoBox').style.display = 'none';
        //     });
        rects.enter().append('rect').merge(rects)
            .attr('x', (_, i) => (i % numItemsPerRow) * (rectWidth + spacing) + spacing)
            .attr('y', (_, i) => Math.floor(i / numItemsPerRow) * (rectHeight + spacing) + spacing)
            .attr('width', rectWidth)
            .attr('height', rectHeight)
            .attr('fill', 'lightblue')
            .on('mouseover', function (event, d) {
                const infoBox = document.getElementById('infoBox');
                infoBox.innerHTML = `Nom: ${d.resourceName}<br>Capacité Max: ${d.maxCapacity}<br>Taille: ${d.areaSize}<br>Type: ${d.resourceType}<br>ID: ${d.id}`;
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



        rects.exit().remove();
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

    // Événement pour gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', () => updateLayout(resources));
});
