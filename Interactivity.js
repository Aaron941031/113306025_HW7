let isEditing = false; 

const editButton = document.createElement('button');
editButton.textContent = 'edit';
editButton.id = 'editButton';

// Insert button next to the name
const nameElement = document.querySelector('.text-content h1');
nameElement.insertAdjacentElement('afterend', editButton);

editButton.addEventListener('click', () => {
    if (isEditing) {
        // Save state: Update name and revert button
        const input = document.getElementById('nameInput');
        nameElement.textContent = input.value;
        input.remove();
        editButton.textContent = 'edit';
    } else {
        // Edit state: Show input field
        const currentName = nameElement.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentName;
        input.id = 'nameInput';
        nameElement.textContent = '';
        nameElement.appendChild(input);
        editButton.textContent = 'save';
    }
    isEditing = !isEditing;
});

// Handle add music functionality
const addButton = document.createElement('button');
addButton.textContent = 'add';
addButton.id = 'addButton';

document.querySelector('.spotify-column').appendChild(addButton);

addButton.addEventListener('click', () => {
    const form = document.createElement('div');
    form.id = 'addMusicForm';
    form.innerHTML = `
        <label for="musicLink">Music Link:</label>
        <input type="url" id="musicLink" required><br>
        <label for="musicName">Music Name:</label>
        <input type="text" id="musicName" required><br>
        <button id="submitMusic">Submit</button>
    `;
    document.body.appendChild(form);

    document.getElementById('submitMusic').addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default form submission

        const link = document.getElementById('musicLink').value;
        const name = document.getElementById('musicName').value;

        if (link && name) {
            // Create new music entry
            const spotifyColumn = document.querySelector('.spotify-column');
            const musicRow = document.createElement('div');
            musicRow.className = 'spotify-row';
            musicRow.innerHTML = `
                <a href="${link}" target="_blank">
                    <img src="spotify.svg" alt="${name}" width="50" height="50">
                </a>
                ${name}
            `;
            spotifyColumn.appendChild(musicRow);

            // Remove form
            form.remove();
        } else {
            alert('Please fill in all fields!');
        }
    });
});

