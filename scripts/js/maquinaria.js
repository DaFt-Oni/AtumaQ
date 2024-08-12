// Menu dropdown
document.getElementById('nav-toggle').addEventListener('click', function(event) {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
    this.classList.toggle('active');
    event.stopPropagation();
});

document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    // Verifica si el clic fue fuera del menú o del botón de toggle
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});




// Funcionalidad Dínamica
document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial de modales
    setupModal('addMachineModal', 'openModal');
    setupModal('addGroupsModal', 'addGroupsButton');
    setupModal('addLabelsModal', 'addLabelsButton');

    // Funcionalidad para agregar maquinaria
    document.getElementById('submitMachine').addEventListener('click', function() {
        const name = document.getElementById('machine-name').value;
        const labels = Array.from(document.getElementById('machine-labels').selectedOptions).map(option => option.text);
        const group = document.getElementById('machine-group').value;
        const description = document.getElementById('machine-description').value;
        const image = document.getElementById('machine-image').files[0];

        if (name && labels.length && group && description && image) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                const machineItem = document.createElement('div');
                machineItem.classList.add('machine-item');
                machineItem.innerHTML = `
                    <img src="${imageUrl}" alt="Imagen de Maquinaria" class="machine-img">
                    <div class="info-machine">
                        <h3>${name}</h3>
                        <p>${description}</p>
                        <p>Grupo: ${group}</p>
                        <p>Etiquetas: ${labels.join(', ')}</p>
                        <button class="training-button">Capacitación General</button>
                    </div>
                `;
                document.getElementById('machine-list').appendChild(machineItem);
                document.getElementById('addMachineModal').style.display = "none";
                document.getElementById('addMachineForm').reset();
                updateFilters();
            };
            reader.readAsDataURL(image);
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });

    // Funcionalidad para agregar grupos
    document.getElementById('submitGroup').addEventListener('click', function() {
        const groupName = document.getElementById('group-name').value;
        if (groupName) {
            const option = document.createElement('option');
            option.value = groupName;
            option.text = groupName;
            document.getElementById('machine-group').appendChild(option);
            document.getElementById('addGroupsModal').style.display = "none";
            document.getElementById('addGroupForm').reset();
            updateFilters();
        }
    });

    // Funcionalidad para agregar etiquetas
    document.getElementById('submitLabel').addEventListener('click', function() {
        const labelName = document.getElementById('label-name').value;
        if (labelName) {
            const option = document.createElement('option');
            option.value = labelName;
            option.text = labelName;
            document.getElementById('machine-labels').appendChild(option);
            document.getElementById('addLabelsModal').style.display = "none";
            document.getElementById('addLabelForm').reset();
            updateFilters();
        }
    });

    // Funcionalidad de filtrado
    document.getElementById('label-filter').addEventListener('change', filterMachines);
    document.getElementById('group-filter').addEventListener('change', filterMachines);

    function filterMachines() {
        const selectedLabel = document.getElementById('label-filter').value;
        const selectedGroup = document.getElementById('group-filter').value;

        const machines = document.querySelectorAll('.machine-item');
        machines.forEach(machine => {
            const labels = machine.querySelector('.info-machine').textContent.includes(selectedLabel) || selectedLabel === '';
            const group = machine.querySelector('.info-machine').textContent.includes(selectedGroup) || selectedGroup === '';

            if (labels && group) {
                machine.style.display = 'block';
            } else {
                machine.style.display = 'none';
            }
        });
    }

    function setupModal(modalId, buttonId) {
        const modal = document.getElementById(modalId);
        const btn = document.getElementById(buttonId);
        const span = modal.querySelector('.close');

        btn.onclick = function() {
            modal.style.display = "block";
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }

    function updateFilters() {
        // Actualiza los filtros para que reflejen las opciones disponibles
        const allLabels = new Set();
        const allGroups = new Set();

        document.querySelectorAll('.machine-item').forEach(machine => {
            const labels = machine.querySelector('.info-machine').textContent.match(/Etiquetas: (.*)/)[1].split(', ');
            const group = machine.querySelector('.info-machine').textContent.match(/Grupo: (.*)/)[1];

            labels.forEach(label => allLabels.add(label));
            allGroups.add(group);
        });

        const labelFilter = document.getElementById('label-filter');
        const groupFilter = document.getElementById('group-filter');

        labelFilter.innerHTML = '<option value="">Todos</option>';
        groupFilter.innerHTML = '<option value="">Todos</option>';

        allLabels.forEach(label => {
            const option = document.createElement('option');
            option.value = label;
            option.text = label;
            labelFilter.appendChild(option);
        });

        allGroups.forEach(group => {
            const option = document.createElement('option');
            option.value = group;
            option.text = group;
            groupFilter.appendChild(option);
        });
    }
});
