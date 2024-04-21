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
        console.log("Building the resource creation form")
        fetch('http://localhost:3000/resources/form')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(fields => { createForm(resourceCreationFormContainer.getAttribute('id'), fields); });
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
                        <input class="form-check-input" type="checkbox" value="" id="${fieldId}" />
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