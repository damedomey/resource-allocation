

document.addEventListener('DOMContentLoaded', function () {


    // formilaire dynamique 
    fetch('http://localhost:3000/resources/form')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(fields => {
            const form = document.getElementById('resourceForm');
            fields.forEach(field => {
                if (field.fields) { // Vérifie si le champ est un groupe de champs
                    const groupContainer = document.createElement('div');
                    groupContainer.className = "time-container";  // Ajustez cette classe si nécessaire

                    const groupTitle = document.createElement('h2');
                    groupTitle.textContent = field.groupLabel;
                    groupContainer.appendChild(groupTitle);

                    const inputsContainer = document.createElement('div');
                    inputsContainer.className = "inputs-container"; // Assurez-vous que cette classe correspond à vos styles

                    field.fields.forEach(subfield => {
                        const inputGroup = document.createElement('div');
                        inputGroup.className = "input-group"; // Assurez-vous que cette classe correspond à vos styles

                        const label = document.createElement('label');
                        label.htmlFor = subfield.id;
                        label.textContent = subfield.label + " *";

                        const input = document.createElement('input');
                        input.type = subfield.type;
                        input.id = subfield.id;
                        input.name = subfield.name;
                        input.required = subfield.required;
                        input.placeholder = subfield.placeholder;

                        inputGroup.appendChild(label);
                        inputGroup.appendChild(input);
                        inputsContainer.appendChild(inputGroup);
                    });

                    groupContainer.appendChild(inputsContainer);
                    form.appendChild(groupContainer);
                }
                else if (field.type === 'checkbox') {
                    const checkboxContainer = document.createElement('div');
                    checkboxContainer.className = "checkbox-container";

                    const checkboxWrapper = document.createElement('div');
                    checkboxWrapper.className = "checkbox-wrapper";

                    const checkbox = document.createElement('input');
                    checkbox.type = field.type;
                    checkbox.id = field.id;
                    checkbox.name = field.name;
                    checkbox.required = field.required;

                    const checkboxLabel = document.createElement('label');
                    checkboxLabel.className = "checkbox-label";
                    checkboxLabel.htmlFor = field.id;
                    checkboxLabel.textContent = field.checkboxLabel;

                    const iconSpan = document.createElement('span');
                    iconSpan.className = "checkbox-icon";
                    iconSpan.textContent = field.icon; // Assume using text icon

                    checkboxLabel.appendChild(iconSpan);
                    checkboxWrapper.appendChild(checkbox);
                    checkboxWrapper.appendChild(checkboxLabel);

                    checkboxContainer.appendChild(checkboxWrapper);
                    form.appendChild(checkboxContainer);
                }
                else if (field.checkboxes) { // Check if the field has multiple checkboxes


                    const mainContainer = document.createElement('div');
                    mainContainer.className = "checkbox-container";

                    const label = document.createElement('label');
                    label.htmlFor = "equipmentInput";
                    label.textContent = field.label + " *";
                    mainContainer.appendChild(label);


                    const usersCheckboxContainer = document.createElement('div');
                    usersCheckboxContainer.className = "users-checkbox-container";

                    const checkboxesGrid = document.createElement('div');
                    checkboxesGrid.className = "checkboxes-grid";

                    field.checkboxes.forEach(checkbox => {
                        const checkboxWrapper = document.createElement('div');
                        checkboxWrapper.className = "checkbox-wrapper-users";

                        const input = document.createElement('input');
                        input.type = checkbox.type;
                        input.id = checkbox.id;
                        input.name = checkbox.name;
                        input.value = checkbox.value;

                        const label = document.createElement('label');
                        label.htmlFor = checkbox.id;
                        label.textContent = checkbox.label;
                        label.className = "checkbox-label";

                        checkboxWrapper.appendChild(input);
                        checkboxWrapper.appendChild(label);
                        checkboxesGrid.appendChild(checkboxWrapper);
                    });

                    usersCheckboxContainer.appendChild(checkboxesGrid);
                    mainContainer.appendChild(usersCheckboxContainer);
                    form.appendChild(mainContainer);
                }
                else if (field.type === 'equipmentSelector') {

                    const mainContainer = document.createElement('div');
                    mainContainer.className = "checkbox-container";

                    const label = document.createElement('label');
                    label.htmlFor = "equipmentInput";
                    label.textContent = field.label + " *";
                    mainContainer.appendChild(label);

                    const usersCheckboxContainer = document.createElement('div');
                    usersCheckboxContainer.className = "users-checkbox-container";

                    const equipmentContainer = document.createElement('div');
                    equipmentContainer.className = "equipment-container";

                    const select = document.createElement('select');
                    select.id = "equipmentInput";
                    const defaultOption = document.createElement('option');
                    defaultOption.disabled = true;
                    defaultOption.selected = true;
                    defaultOption.textContent = "Sélectionnez un équipement";
                    select.appendChild(defaultOption);

                    field.options.forEach(option => {
                        const opt = document.createElement('option');
                        opt.value = option.value;
                        opt.textContent = option.text;
                        select.appendChild(opt);
                    });

                    const addButton = document.createElement('button');
                    addButton.id = "addEquipment";
                    addButton.type = "button";
                    addButton.textContent = "+";
                    addButton.addEventListener('click', () => {
                        var input = document.getElementById('equipmentInput');
                        var equipmentName = input.value.trim();
                        console.log('Équipement:', equipmentName);

                        if (equipmentName) {
                            var li = document.createElement('li');
                            li.className = 'equipment-item';
                            li.textContent = equipmentName;

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

                    const list = document.createElement('ul');
                    list.id = "equipmentList";

                    equipmentContainer.appendChild(select);
                    equipmentContainer.appendChild(addButton);
                    equipmentContainer.appendChild(list);

                    usersCheckboxContainer.appendChild(equipmentContainer);
                    mainContainer.appendChild(usersCheckboxContainer);
                    form.appendChild(mainContainer);
                } else if (field.type === 'select') {
                    const label = document.createElement('label');
                    label.htmlFor = field.id;
                    label.textContent = field.label + " *";

                    const selectContainer = document.createElement('div');
                    selectContainer.className = "select-container";

                    const selectWrapper = document.createElement('div');
                    selectWrapper.className = "select-wrapper";

                    const select = document.createElement('select');
                    select.id = field.id;
                    select.name = field.name;
                    select.required = field.required;

                    field.options.forEach(option => {
                        const opt = document.createElement('option');
                        opt.value = option.value;
                        opt.textContent = option.text;
                        if (option.disabled) opt.disabled = true;
                        if (option.selected) opt.selected = true;
                        select.appendChild(opt);
                    });

                    selectWrapper.appendChild(select);
                    selectContainer.appendChild(label);
                    selectContainer.appendChild(selectWrapper);
                    form.appendChild(selectContainer);
                }
                else {
                    const label = document.createElement('label');
                    label.htmlFor = field.id;
                    label.textContent = field.label + " *";

                    const input = document.createElement('input');
                    input.type = field.type;
                    input.id = field.id;
                    input.name = field.name;
                    input.required = field.required;
                    input.placeholder = field.placeholder;

                    form.appendChild(label);
                    form.appendChild(input);
                }
            });
            // Create and append the submit button at the end
            const submitButton = document.createElement('input');
            submitButton.type = 'submit';
            submitButton.value = 'Enregistrer';
            submitButton.id = 'submitBtn'; // Optional: Add ID for styling or JavaScript reference
            submitButton.addEventListener('click', () => {
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
                const formData = {
                    name: resourceName,
                    capacity: maxCapacity,
                    size: areaSize,
                    startTime: startTime,
                    endTime: endTime,
                    type: resourceType,
                    isAccessible: isAccessible,
                    authorizedUsers: authorizedUsers,
                    equipments: equipmentNames
                };
        
                // Affichez les données du formulaire dans la console pour vérification
                console.log('Données du formulaire:', formData);
        
                const response = fetch('http://localhost:3000/resources', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
        
                response.then(res => {
                    if (res.ok) {
                        alert('Ressource enregistrée avec succès!');
                    } else {
                        alert('Erreur lors de l\'enregistrement de la ressource');
                        console.log(res.statusText)
                    }
                });
            });

            form.appendChild(submitButton);
            
        }).catch(error => console.error('Erreur lors du chargement du formulaire:', error));
});