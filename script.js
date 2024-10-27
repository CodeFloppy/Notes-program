const searchNote = document.getElementById('searchNote');
const addNote = document.getElementById('addNote');
const updateNote = document.getElementById('updateNote');

const addBt = document.getElementById('addBt');


let notes = [];

// notes[0] = {
//     id: 1,
//     text: 'programar',
// }

function noteElement(id, text){
    document.getElementById('notesArea').innerHTML += `
    <div class="note-elements__note">
        <p class="note-elements__number tag-number" id>${id}</p>
                        
        <div class="note-elements__text tag-note">
            <p class="note-elements__text--text">${text}</p>
            <input type="text" name="" class="note-elements__imput" id="updateNote" placeholder="write note...">
        </div>

        <div class="note-elements__buttons">
            <div class="note-elements__rename-bt">rename</div>
            <div class="note-elements__delete-bt">delete</div>
        </div>
     </div>
    `;
}

addBt.addEventListener('click', _=>{
    if(addNote.value !== ' ' && addNote.value !== ''){
        notes[notes.length] = {
            id: notes.length + 1,
            text: addNote.value,
        }

        noteElement(notes[notes.length - 1].id, notes[notes.length - 1].text);
    }
    addNote.value = '';

    
});
document.addEventListener('mousemove', function(event){
    console.log(event.x);
});