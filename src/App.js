import {useState, useEffect} from 'react'
import axios from "axios"
import './App.css';

function App() {
  const [noteList, setNoteList] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [newNote, setNewNote] = useState({content: '', important: false});
  
  useEffect(() => {
    
    async function getNotes (){
      const {data} = await axios.get('https://safe-wave-36858.herokuapp.com/api/notes');
      setNoteList(data)
    }
    getNotes();
    
  }, [])

  const createNote = async ()=>{
    console.log("Create")
    const {data} = await axios.post('https://safe-wave-36858.herokuapp.com/api/notes', {
      content: newNote.content,
      important: newNote.important
    })
    setNoteList([...noteList, data])
  }
  const updateNote = async ()=>{
    console.log("Update")
    const {data} = await axios.put('https://safe-wave-36858.herokuapp.com/api/notes/'+currentNote.id, {
      content: currentNote.content,
      important: currentNote.important
    });
    const temporalList = [...noteList];
    const currentIndex = temporalList.findIndex(note=>note.id===currentNote.id)
    if(currentIndex){
      temporalList.splice(currentIndex,1, data)
      setNoteList(temporalList)
    }
      

  }
  const deleteNote = async (_note)=>{
    if(window.confirm("Seguro que desea eliminar la Nota?")){
      await axios.delete('https://safe-wave-36858.herokuapp.com/api/notes/'+_note.id)
      const temporalList = [...noteList];
      const currentIndex = temporalList.findIndex(note=>note.id===_note.id)
      if(currentIndex){
        temporalList.splice(currentIndex,1)
        setNoteList(temporalList)
      }
    }
  }
  return (
    <div className="App">
     <div className="createNote">
        <h3>Create Note</h3>
        <h4><b>Content</b>: <input value={newNote.content} onChange={(e)=>setNewNote({...newNote, content: e.target.value})}></input></h4>
          <h4>
            <b>Important</b>: 
            <input type="checkbox"  
              checked={newNote.important} 
              onChange={()=>setNewNote({...newNote, important: !newNote.important})}/> 
          </h4>
          <button onClick={createNote}>Create Note</button>

      </div>
        <h1>
          Note List
        </h1>
      <ul>
        {noteList.map(note=>{
          return <li key={note.id}>{note.content} <button onClick={()=>setCurrentNote(note)}>View</button><button onClick={()=>deleteNote(note)}>Delete</button></li>
        })}
      </ul>
      <hr/>
     
      {currentNote && (
        <div className="currentNote">
          <h3>Current Note</h3>
          <h4><b>Date</b>: {currentNote.date} </h4>
          <h4><b>Content</b>: <input value={currentNote.content} onChange={(e)=>setCurrentNote({...currentNote, content: e.target.value})}></input></h4>
          <h4>
            <b>Important</b>: 
            <input type="checkbox"  
              checked={currentNote.important} 
              onChange={()=>setCurrentNote({...currentNote, important: !currentNote.important})}/> 
          </h4>
          <button onClick={updateNote}>Update Note</button>
        </div>

      )}
    </div>
  );
}

export default App;
