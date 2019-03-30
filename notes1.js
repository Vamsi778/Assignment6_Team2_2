const fs =  require('fs');

// ------------------Begin of Reusable functions ---------------------

var fetchNotes1 = () => {
    try {                          //if file won't exist
        var notes1String = fs.readFileSync('notes1-data.json')
        return JSON.parse(notes1String);
    } catch(e){
        return [];
    }
};

var saveNotes1 = (notes1) => {
    fs.writeFileSync('notes1-data.json',JSON.stringify(notes1));
};


// ------------------End of Reusable functions ---------------------


//  to add a new note

var addNote = (customer_id,customer_name,customer_email) => {
    var notes1 = fetchNotes1();
    var note = {customer_id,customer_name,customer_email}

    var duplicateNotes1 =  notes1.filter((note) => { // to check if the note already exists
        return note.customer_id === customer_id;
    });

    if (duplicateNotes1.length === 0){
        notes1.push(note);
        saveNotes1(notes1);
        return note
    }

};


//to list all the notes

var getAll = () => {
    return fetchNotes1();
};


// to read a note

var getNote = (customer_id) => {

    var notes1 = fetchNotes1();

    var getNotes1 =  notes1.filter((note) => {  // to check if note exists and return note
        return note.customer_id === customer_id;
    });

    return getNotes1[0]

};


// to delete a note

var remove = (customer_id) => {

    var notes1 = fetchNotes1(); // reusable func

    var filteredNotes1 =  notes1.filter((note) => { // will return all other notes other than "note to be removed"
        return note.customer_id !== customer_id;
    });

    saveNotes1(filteredNotes1); //save new notes array

    return notes1.length !== filteredNotes1.length

};

var updateNote = (customer_id,customer_name,customer_email) => {
    var notes1 = fetchNotes1();
    var note = {customer_id,customer_name,customer_email}

    var duplicateNotes2 =  notes1.filter((note) => { // to check if note already exists
        return note.customer_id === customer_id;
    });

    if (duplicateNotes2.length !== 0){
        notes1.push(note);
        saveNotes1(notes1);
        return note
    }

};

// function just to print out note to screen

var logNote = (note) => {
    console.log('--');
    console.log(`Customer_ID: ${note.customer_id}`);
    console.log(`CustomerName: ${note.customer_name}`);
    console.log(`CustomerEmail: ${note.customer_email}`);

};

// add new function names here to be accessible from other modules

module.exports = {
    addNote, getAll, remove, getNote,logNote,updateNote
};
