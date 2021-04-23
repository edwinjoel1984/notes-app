import Note from "./Note";

const NoteList = ({noteList, setCurrentNote, deleteNote, toggleImportance}) => {
    
    return (
        <>
            <h1>
                Note List
            </h1>
            <ul>
            {noteList.map(note=>{
                return <Note note={note} toggleImportance={toggleImportance}/>
            })}
            </ul>
            <hr/>
        </>
    );
}

export default NoteList;