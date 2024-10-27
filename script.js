window.addEventListener('load',_=>{
    let dataNotes = [
        {id:0, note:'ir al parque', description:'sal de la casa, has vida social jajaja'},
        {id:1, note:'programar', description:'sin esto no podremos avanzar'},
        {id:2, note:'practicar ingles', description:'no mas para hablar gringo jajaja'},
        {id:3, note:'ver series', description:'un rato al dia no va mal'},
        {id:4, note:'tomar sol', description:'vitamina d para el cuerpo'},
        {id:5, note:'hacer ejercicio', description:'para una buena salud'},
        {id:6, note:'ir a la playa', description:'tomar el sol'},
        {id:7, note:'jugar lol', description:'un jugo bastante adictivo'},
        {id:8, note:'trotar', description:'mover el cuerpo'},
        {id:9, note:'cantar', description:'no mas porque me gusta'}
    ];
    let arrayOfNotes = dataNotes;

    let idOfNote = 0;
    let maxOfNotes = 5;
    let update;

    let btRead ;
    let btDelete;

    let readNote = document.getElementById('readNote');
    const btUpdate = document.getElementById('btUpdate');

    function displayReadNote(){
        readNote.style.display = 'flex';
    }

    function searchId(id){
        for(let i = 0; i < dataNotes.length; i++){
            if(dataNotes[i].id === id) return i;
        }
    }

    btUpdate.addEventListener('click',_=>{
        let i = searchId(idOfNote);
        readNote.style.display = 'none';
        inpNote.value = dataNotes[i].note;
        inpDescription.value = dataNotes[i].description;
        update = 1;
        displayCreateNote();
    });

    const btExit = document.getElementsByClassName('bt-exit');
    arrAddEvent(btExit, closeWindow);

    let alertMessge = document.getElementById('alertMessge');
    const btYes = document.getElementById('btYes');
    const btNo  = document.getElementById('btNo');

    btYes.addEventListener('click',_=>{
        dataNotes.splice(searchId(idOfNote), 1);
        refresh();
    });

    btNo.addEventListener('click',_=>{
        closeWindow();
    });

    const wrapperGlass = document.getElementById('wrapperGlass');
    function displayGlass(){
        wrapperGlass.style.visibility = 'visible';
    }

    function arrAddEvent(arr, funct){
        for(let i = 0; i < arr.length; i++){
            arr[i].addEventListener('click',_=>{
                funct(i + dir);
            });
        }
    }

    const search = document.getElementById('search');

    let searchText = [];

    search.addEventListener('keydown',(e)=>{

        if(e.key === 'Backspace'){
            searchText.pop();
        }else{
            searchText.push(e.key);
        }

        dir = 0;

        searchNote(dataNotes, searchText);
    });

    function cleanSpaces(arr){
        let newArr = [];
        for(let i = 0; i < arr.length; i++){
            if(arr[i] !== ' '){
                newArr.push(arr[i]);
            }
        }

        return newArr;
    }

    function searchNote(arrNote, arrSearch){
        let newArr = [];
        let arrayA;
        let arrayB = cleanSpaces(arrSearch);


        for(let i = 0; i < arrNote.length; i++){
            arrayA = cleanSpaces(arrNote[i].note);

            if(arrSearch[0] === undefined){
                newArr.push(arrNote[i]);

            }else if(compareArray(arrayA, arrayB)){
                newArr.push(arrNote[i]);
            }
        }

        arrayOfNotes = newArr;

        displayNotes();
    }

    function compareArray(a , b){
        for(let i = 0; i < a.length; i++){

            if((a.length - i) < b.length){
                return 0;
            }

            for(let j = 0; j < b.length; j++){
                if(a[i+j] !== b[j]){
                    break;
                }
                if((j + 1) === b.length){
                    return 1;
                }
            }
        }
    }


    const newNote = document.getElementById('newNote');
    const createNote = document.getElementById('createNote');
    const inpNote = document.getElementById('inpNote');
    const inpDescription = document.getElementById('inpDescription');
    const btCheck = document.getElementById('btCheck');


    newNote.addEventListener('click',_=>{
        displayGlass();
        inpNote.value = '';
        inpDescription.value = '';
        update = 0;
        displayCreateNote();
        console.log(idOfNote);
    });
    
    function displayCreateNote(){
        createNote.style.display = 'flex';
    }

    function addData(data1, data2){
        let i = searchId(idOfNote);

        if(data1 !== '' && data1 !== ' '){
            if(update){
                dataNotes[i].note = data1;
                dataNotes[i].description = data2;

            }else if(update === 0){
                dataNotes.push({id:dataNotes.length, note:data1, description:data2});
            }

            closeWindow();
        }else{
            alert('please add note');
        }
    }

    btCheck.addEventListener('click',_=>{
        addData(inpNote.value, inpDescription.value);
        inpNote.value = '';
        inpDescription.value = '';
        refresh();
    });

    function displayNotes(){

        document.getElementById('notesCollection').innerHTML = '';

        for(let i = dir; i < arrayOfNotes.length; i++){
            document.getElementById('notesCollection').innerHTML += `

                <div class="notes-collection__note note">
                    <div class="note__number">${i+1}</div>
                    <div class="note__bt-read bt-read icon" id='btRead${i+1}'>
                        <i class="fa-solid fa-eye"></i>
                    </div>
                    <div class="note_text">${arrayOfNotes[i].note}</div>
                    <div class="note__bt-delete bt-delete icon" id='btDelete${i+1}'>
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>
            `;
                
            if(i === maxOfNotes + (dir - 1)) break;
        }

        // botton read
        btRead = document.getElementsByClassName('bt-read');
        arrAddEvent(btRead, (i)=>{
            displayGlass();
            displayReadNote();
            document.getElementById('readNoteNote').innerHTML = arrayOfNotes[i].note;
            document.getElementById('readNoteDescription').innerHTML = arrayOfNotes[i].description;

            idOfNote = arrayOfNotes[i].id;

            console.log(arrayOfNotes[i].id);
            
        });

        // botton delete
        btDelete = document.getElementsByClassName('bt-delete');
        arrAddEvent(btDelete, (i)=>{
            displayGlass();
            alertMessge.style.display = 'block';

            idOfNote = arrayOfNotes[i].id;
        });
    }

    function closeWindow(){
        readNote.style.display = 'none';
        alertMessge.style.display = 'none';
        createNote.style.display = 'none';
        wrapperGlass.style.visibility = 'collapse';
    }
    function showNumOfNote(){
        document.getElementById('NotesCouter').innerHTML = dataNotes.length;
    }
    function refresh(){
        closeWindow();
        arrayOfNotes = dataNotes;
        searchNote(dataNotes, searchText);
        showNumOfNote();
    }

    const arrowLeft  = document.getElementById('arrowLeft');
    const arrowRight = document.getElementById('arrowRight');
    let dir = 0;

    arrowRight.addEventListener('click',_=>{
        if(dir + 5 < arrayOfNotes.length){
            dir += 5;

            searchNote(arrayOfNotes, searchText);
        }
    });

    arrowLeft.addEventListener('click',_=>{
        if(dir - 5 >= 0){
            dir -= 5;

            searchNote(arrayOfNotes, searchText);
        }
    });

    // -----------------------------
    refresh();
});













