
const fs =  require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes1 = require('./notes1.js');


// ------------ Begin - command configuration -----------------


const customer_idOptions = {
    describe: 'Customer_ID',
    demand : true,
    alias : 'a'
}

const customer_nameOptions = {
    describe: 'CustomerName',
    demand : true,
    alias : 'b'
}

const customer_emailOptions = {
    describe: 'CustomerEmail',
    demand : true,
    alias : 'c'
}
const argv =  yargs

    .command('add','Add a new note',{
        customer_id: customer_idOptions,
        customer_name: customer_nameOptions,
        customer_email: customer_emailOptions
    })
    .command('list','List all  notes')
    .command('read','Read a note',{
        customer_id: customer_idOptions
    })
    .command('remove','Remove a Note',{
        customer_id: customer_idOptions
    })
    .command('update', 'Update a Note',{
        customer_id: customer_idOptions,
        customer_name: customer_nameOptions,
        customer_email: customer_emailOptions
    })
    .help()
    .argv;


// ------------ End - command configuration -----------------


var command = argv._[0];


if (command === 'add'){
    var note = notes1.addNote(argv.customer_id,argv.customer_name,argv.customer_email);
    if (note){
        notes1.logNote(note);                                       //add a new note
    } else{
        console.log("Note already exists");
    }
}

else if (command === 'list') {
    var AllNotes1 = notes1.getAll();
    console.log(`Printing ${AllNotes1.length} note(s).`);
    AllNotes1.forEach((note)=>{                                //list all note(s)
        notes1.logNote(note);
    });
}

else if (command === 'read') {
    var note = notes1.getNote(argv.customer_id);
    if(note){
        notes1.logNote(note);                                //read a note
    }
    else{
        console.log("Note not found");
    }
}
else if (command === 'remove') {
    var note = notes1.remove(argv.customer_id);
    if(note){
        notes1.logNote(note);                                //read a note
    }
    else{
        console.log("Note not found");
    }
}
if (command === 'update'){
    var note = notes1.remove(argv.customer_id);

    var note = notes1.addNote(argv.customer_id,argv.customer_name,argv.customer_email);
    if (note){
        notes1.logNote(note);                                       //add a new note
    } else{
        console.log("Note already exists");
    }
}

else{
    console.log('command note recognized');
}


