import {useState} from 'react'
const noteInitialState = {content: '', important: false};

const CreateNote = ({createNote, logout}) => {
    const [newNote, setNewNote] = useState(noteInitialState);
    return (
        <div className="createNote">
        <form onSubmit={(evt)=>{
            createNote(evt,newNote);
            setNewNote(noteInitialState);
            }}>
          <h3>Create Note</h3>
          <h4><b>Content</b>: <input placeholder='Write your Note' value={newNote.content} onChange={(e)=>setNewNote({...newNote, content: e.target.value})}></input></h4>
          <h4>
            <b>Important</b>: 
            <input type="checkbox"  
              checked={newNote.important} 
              onChange={()=>setNewNote({...newNote, important: !newNote.important})}/> 
          </h4>
          <button type='submit'>Create New Note</button>
        </form>
        <button onClick={logout}>Cerrar Sesion</button>
        </div>
    );
}

export default CreateNote;