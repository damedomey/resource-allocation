(() => {
    const form = document.getElementById('resourceCreationFormContainer');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        for (const [key, value] of Object.entries(collectMultiSelectValue())) {
            data[key] = value;
        }

        fetch('http://localhost:3000/resources', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                alert('Resource successfully saved !');
                form.reset();
            } else {
                alert('Unable to save the resource !');
            }
        }).catch(error => console.error('Erreur lors de l\'enregistrement de la ressource:', error));
    });
})();

function collectMultiSelectValue() {
    const data = {};

    const containers = document.querySelectorAll('.add-multiple-container');

    containers.forEach(container => {
        const select = container.getElementsByTagName('select')[0];
        const name = select.getAttribute('name');
        let value = "";

        for (const element of container.getElementsByTagName("strong")) {
            value += element.innerText + ", ";
        }
        data[name] = value;
    });

    return data;
}