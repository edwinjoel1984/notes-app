const Note = ({note, toggleImportance}) => {
    const label = note.important ? 'Make Not Important': 'Make Important'
    return (
        <li key={note.id}>
        
        {note.content} 
        
        <button style={{marginLeft: '10px'}} onClick={()=>toggleImportance(note)}>{label}</button>
        {/* <button onClick={()=>setCurrentNote(note)}>View</button><button onClick={()=>deleteNote(note)}>Delete</button> */}
        </li>
    );
}

export default Note;