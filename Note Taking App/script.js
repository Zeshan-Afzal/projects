// Getting DOM elements and storing them in variables
const inputAreaElement = document.querySelector('.input-area');
const writeNoteButton = document.querySelector('.button');
const saveButton = document.querySelector('.save');
const noteBoxElement = document.querySelector('.note-box');
const textValueElement = document.querySelector('#text-value');
let notesArray = JSON.parse(localStorage.getItem('notes')) || [];

// Check if there are notes in the local storage and load them
if (notesArray) {
    loadNotesFromLocalStorage();

    // Function to load notes from local storage
    function loadNotesFromLocalStorage() {
        notesArray.forEach(note => {
            makeNoteElement(note.id, note.text);
        });
    }
}

// Event listener for the "Write Note" button
writeNoteButton.addEventListener('click', () => {
    inputAreaElement.style.display = 'block';
});

// Event listener for the "Save" button
saveButton.addEventListener('click', () => {
    // Generate a random number for a unique ID
    const random = Math.round(Math.random() * 1000) + 1;
    const id = String(random);

    // Add the new note to the array and save it to local storage
    notesArray.push({ 'id': id, 'text': textValueElement.value });
    saveNoteToLocalStorage();

    // Create and display the new note in the DOM
    makeNoteElement(id, textValueElement.value);
});

// Event listener for the note box container
noteBoxElement.addEventListener('click', (e) => {
    // Check if the "Edit" or "Save" button is clicked
    if (e.target.classList.contains('edit')) {
        let key = e.target.dataset.key;
        const noteElement = document.getElementById(key);

        // Toggle between "Edit" and "Save" modes
        if (e.target.innerHTML == 'Edit') {
            e.target.innerHTML = 'Save';
            editNoteElement(noteElement);
        } else if (e.target.innerHTML == 'Save') {
            e.target.innerHTML = 'Edit';
            saveChangesToNoteElement(noteElement, key);
        }
    }

    // Check if the "Delete" button is clicked
    if (e.target.classList.contains('delet')) {
        let key = e.target.dataset.key;
        const noteElement = document.getElementById(key);

        // Remove the note from the array and update local storage
        notesArray = notesArray.filter(note => key !== note.id);
        saveNoteToLocalStorage();

        // Remove the note element from the DOM
        noteElement.remove();
    }
});

// Function to create and display a new note element in the DOM
function makeNoteElement(id, text) {
    inputAreaElement.style.display = 'none';
    const noteElement = document.createElement('div');
    noteElement.setAttribute('class', 'note');
    noteElement.setAttribute('id', id);
    noteElement.innerHTML = `
        <div class='texts'>
            <p class="note-text ${id}" > 
                ${text} 
            </p>
        </div>
        <div class='butns'>
            <button class="edit" data-key='${id}'>Edit</button>
            <button class="delet" data-key='${id}'>Delete</button>
        </div>
    `;
    textValueElement.value = '';
    noteBoxElement.appendChild(noteElement);
}

// Function to set up the "Edit" mode for a note
function editNoteElement(noteElement) {
    const newInput = createTextAreaElement(noteElement.firstElementChild.firstElementChild.innerHTML);
    const noteText = noteElement.firstElementChild;
    noteElement.firstElementChild.style.display = 'none';
    noteElement.appendChild(newInput);
}

// Function to create a text area element
function createTextAreaElement(value) {
    let newInput = document.createElement('textarea');
    newInput.setAttribute('class', 'text-box');
    newInput.setAttribute('cols', '12');
    newInput.setAttribute('rows', '12');
    newInput.value = value;
    return newInput;
}

// Function to save changes to a note element
function saveChangesToNoteElement(noteElement, key) {
    let inpVal = document.querySelector('.text-box');
    let noteText = noteElement.firstElementChild;
    noteText.firstElementChild.innerHTML = inpVal.value;
    noteElement.firstElementChild.style.display = 'block';

    // Update the corresponding note in the array
    const noteToUpdate = notesArray.find(note => key === note.id);
    if (noteToUpdate) {
        noteToUpdate.text = inpVal.value;
    }

    // Save the updated array to local storage
    saveNoteToLocalStorage();
    noteElement.removeChild(inpVal);
}

// Function to save the notes array to local storage
function saveNoteToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notesArray));
}
