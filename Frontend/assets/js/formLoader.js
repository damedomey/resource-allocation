/**
 * This file contains functions to create forms dynamically
 * Based on a specific ID, this file will get the form from the server
 * and create it.
 */
////////////// FORM LOAD ////////////////
(function () {
    // Load resource creation form
    const resourceCreationFormContainer = document.getElementById('resourceCreationFormContainer');
    if (resourceCreationFormContainer) {
        fetch('http://localhost:3000/resources/form')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(fields => { createForm(resourceCreationFormContainer.getAttribute('id'), fields); });
    }

    // Load reservation creation form
    const reservationCreationFormContainer = document.getElementById('reservationCreationFormContainer');
    if (reservationCreationFormContainer) {
        const fields = [
            {
                "type": "text",
                "name": "name",
                "required": true,
                "description": "Votre nom complet",
                "label": "Nom du demandeur"
            },
            {
                "type": "select",
                "name": "resourceType",
                "required": true,
                "label": "Type d'occupation de la ressource",
                "values": ["Bureau", "Salle de réunion", "Individuel", "Salle de cours", "Amphi", "Salle de TP"]
            },
            {
                "type": "number",
                "name": "minCapacity",
                "required": true,
                "description": "Nombre de personnes",
                "label": "Capacité minimale requise"
            },
            {
                "type": "group",
                "label": "Plage horaire d'utilisation",
                "values": [
                    {
                        "type": "datetime-local",
                        "name": "startTime",
                        "required": true,
                        "description": "",
                        "label": "Début"
                    },
                    {
                        "type": "datetime-local",
                        "name": "endTime",
                        "required": true,
                        "description": "",
                        "label": "Fin"
                    }
                ]
            },
        ];

        createForm('reservationCreationFormContainer', fields);
    }

    // Active validators
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
            "submit",
            function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add("was-validated");
            },
            false
        );
    });
})();

//////////////// FORM LOADER FUNCTIONS BELOW ////////////////
/**
 * Create a form in the container with the given fields
 * @param {string} containerId - The id of the container where the form will be created
 * @param {Array} fields - The fields of the form
 */
function createForm(containerId, fields) {
    const form = document.getElementById(containerId);
    fields.forEach(field => {
        switch (field.type) {
            case 'number':
            case 'text':
                form.appendChild(createInputField(field));
                break;
            case 'checkbox':
                form.appendChild(createCheckboxField(field));
                break;
            case 'select':
                form.appendChild(createSelectField(field));
                break;
            case 'group':
                form.appendChild(createGroupField(field));
                break;
            case 'multi-select':
                form.appendChild(createMultiSelectField(field));
                break;
            default:
                console.error('Field type not supported:', field.type);

        }
    });

    form.appendChild(createSubmitButton());
}

function createInputField(field) {
    const fieldId = field.name + Math.random().toString(36).substring(7);

    const col12 = document.createElement('div');
    col12.className = "col-12";

    const inputStyle1 = document.createElement('div');
    inputStyle1.className = "input-style-1";

    const label = document.createElement('label');

    label.htmlFor = fieldId;
    label.textContent = field.label;
    label.textContent += field.required ? " *" : "";
    label.className = "form-label";

    const input = document.createElement('input');
    input.type = field.type;
    input.id = fieldId;
    input.name = field.name;
    input.required = field.required;
    input.placeholder = field.description;
    input.className = "form-control";

    inputStyle1.appendChild(label);
    inputStyle1.appendChild(input);
    col12.appendChild(inputStyle1);

    return col12;
}

function createCheckboxField(field) {
    const fieldId = field.name + Math.random().toString(36).substring(7);

    const div = document.createElement('div');
    div.className = 'col-12';

    div.innerHTML = `
                    <div class="form-check checkbox-style checkbox-primary mb-30">
                        <input class="form-check-input" type="checkbox" id="${fieldId}" />
                        <label class="form-check-label" for="${fieldId}">
                            description
                        </label>
                    </div>
                `;

    const input = div.getElementsByTagName('input')[0];
    const label = div.getElementsByTagName('label')[0];

    input.required = field.required;
    input.name = field.name;
    input.placeholder = field.description;

    label.textContent = field.label;

    return div;
}

function createSelectField(field) {
    const div = document.createElement('div');
    div.className = 'select-style-1';
    div.innerHTML = `
            <label>Category</label>
            <div class="select-position">
                <select>
                    <option selected disabled>Choose one</option>
                </select>
            </div>
        `;

    const select = div.getElementsByTagName('select')[0];
    const label = div.getElementsByTagName('label')[0];

    label.textContent = field.label;

    select.required = field.required;
    select.name = field.name;
    select.placeholder = field.description;

    for (const value of field.values) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    }

    return div;
}

function createGroupField(groupField) {
    const div = document.createElement('div');
    div.className = 'row';
    div.innerHTML = `
            <div class="col-12">
                <label>${groupField.label}</label>
            </div>
        `;
    for (const field of groupField.values) {
        const col6 = document.createElement('div');
        col6.className = 'col-6';

        col6.appendChild(createInputField(field));
        div.appendChild(col6);
    }
    return div;
}

function createMultiSelectField(multiSelectField) {
    const fieldId = multiSelectField.name + Math.random().toString(36).substring(7);
    const selectedContainerId = fieldId + 'Selected';

    const div = document.createElement('div');
    div.innerHTML = `<label>${multiSelectField.label}</label>
                <div class="add-multiple-container">
                    <div style="margin-bottom: 20px;" class="select-style-1">
                        <select class="col-9 col-md-4" name="${multiSelectField.name}">
                            <option disabled selected>Choose</option>
                        </select>
                        <button class="add-multiple-button" id="${fieldId}" type="button">+</button>
                        <ul class="row multi-select-container" id="${selectedContainerId}"></ul>
                    </div>
                </div>`;

    const select = div.getElementsByTagName('select')[0];
    for (const value of multiSelectField.values) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;

        select.appendChild(option);
    }

    addSelectEventListeners(div);

    return div;
}

function addSelectEventListeners(group) {
    const addMultipleButton = group.getElementsByTagName("button")[0];

    addMultipleButton.addEventListener('click', () => {
        const select = addMultipleButton.previousElementSibling;
        const selectedContainer = select.nextElementSibling.nextElementSibling;
        const selectedValue = select.value;
        if (selectedValue === 'Choose') return;

        const div = document.createElement('div');
        div.className = 'col-3 p-3';
        div.innerHTML = `<div class="toast show">
                        <div class="toast-header">
                            <strong class="me-auto">${selectedValue}</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div>`;

        selectedContainer.appendChild(div);

        select.value = 'Choose';
    });
}

function createSubmitButton(){
    const div = document.createElement('div');
    div.className = 'col-12';
    div.innerHTML = `
                    <div class="button-group d-flex justify-content-center flex-wrap">
                        <button type="submit" class="main-btn w-100 primary-btn btn-hover m-2">
                            Submit Form
                        </button>
                    </div>
                `;

    return div;
}