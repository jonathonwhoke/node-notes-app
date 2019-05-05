const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNote();
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
         saveNotes(notes)
         console.log('New note added')
    }
    else {
        console.log('Note title taken')
    }
}

const removeNote = title => {
    const notes = loadNote();
    const notesToKeep = notes.filter( note => note.title !== title)

    if (notesToKeep.length < notes.length) {
        console.log(chalk.bgGreen('Note removed!'))
    }
    else {
        console.log(chalk.bgRed('No note found!'))
    }
    saveNotes(notesToKeep)
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNote = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNote()
    console.log(chalk.bgRed('-----Your Notes:-----'))

    notes.forEach(notes => {
        console.log(notes.title)
    });
}

const readNotes = title => {
    const notes = loadNote();
    const note = notes.find(note => note.title === title)
    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
};