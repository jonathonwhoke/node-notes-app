const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('12.0.2')

// Add Command
yargs.command({
    command: 'add',
    describe: 'Adds a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Description',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Remove Command
yargs.command({
    command: 'remove',
    describe: 'removes note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//List Command
yargs.command({
    command: 'list',
    describe: 'list all note',
    handler() {
        notes.listNotes()
    }
})

//Read Command
yargs.command({
    command: 'read',
    describe: 'reads notes',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})

yargs.parse() 