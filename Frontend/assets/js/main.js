(function () {
    'use strict';

    // Load occupation type from api
    fetch('http://localhost:3000/occupation-types')
        .then(response => response.json())
        .then(data => {
            const occupationTypeSelect = document.getElementById('resourceType');
            data.forEach(occupationType => {
                const option = document.createElement('option');
                option.value = occupationType.id;
                option.textContent = occupationType.name;
                occupationTypeSelect.appendChild(option);
            });
        });
})();
