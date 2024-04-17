

document.addEventListener('DOMContentLoaded', function () {
    console.log('Le DOM est chargé.');

    document.getElementById('addEquipment').addEventListener('click', function () {
        console.log('Le bouton + a été cliqué.');
        var input = document.getElementById('equipmentInput');
        var equipmentName = input.value.trim();
        console.log('Équipement:', equipmentName);

        if (equipmentName) {
            var li = document.createElement('li');
            li.className = 'equipment-item';
            li.textContent = equipmentName;

            console.log('Équipement:', li.textContent);

            var removeBtn = document.createElement('button');
            removeBtn.textContent = 'x';
            removeBtn.addEventListener('click', function () {
                li.remove();
            });

            li.appendChild(removeBtn);
            document.getElementById('equipmentList').appendChild(li);

            input.value = ''; // Clear the input

            // Ajout de la ligne suivante pour afficher les éléments dans la console
            console.log('Élément ajouté à la liste:', li);
        }
    });




    // Gestionnaire d'événements pour le formulaire
    document.getElementById('resourceForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Ici, vous pouvez ajouter le code pour traiter les données du formulaire
        var resourceName = document.getElementById('resourceName').value;
        var maxCapacity = document.getElementById('maxCapacity').value;
        var areaSize = document.getElementById('areaSize').value;
        var startTime = document.getElementById('startTime').value;
        var endTime = document.getElementById('endTime').value;

        // Récupération du type d'occupation de la ressource
        var resourceType = document.getElementById('resourceType').value;

        // Vérification de l'accessibilité pour les personnes handicapées
        var isAccessible = document.getElementById('accessible').checked;

        // Collectez les types d'utilisateurs autorisés
        var authorizedUsers = [];
        var userTypeCheckboxes = document.querySelectorAll('.users-checkbox-container input[type="checkbox"]:checked');
        userTypeCheckboxes.forEach(function (checkbox) {
            authorizedUsers.push(checkbox.value);
        });



        // Collectez les équipements ajoutés
        var equipmentItems = document.querySelectorAll('#equipmentList .equipment-item');
        var equipmentNames = Array.from(equipmentItems).map(function (item) {
            return item.firstChild.textContent; // Obtenez le texte avant le bouton de suppression
        });


        // Créez un objet avec toutes les données collectées
        var formData = {
            resourceName: resourceName,
            maxCapacity: maxCapacity,
            areaSize: areaSize,
            startTime: startTime,
            endTime: endTime,
            resourceType: resourceType,
            isAccessible: isAccessible,
            authorizedUsers: authorizedUsers,
            equipmentNames: equipmentNames
        };


        // Affichez les données du formulaire dans la console pour vérification
        console.log('Données du formulaire:', formData);

        // Ici, le code pour envoyer les données "formData" au serveur


    });
});