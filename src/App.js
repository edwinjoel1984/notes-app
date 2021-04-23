import {useState, useEffect} from 'react'
import './App.css';
import CreateNote from './components/CreateNote';
import LoginForm from './components/LoginForm';
import NoteList from './components/NoteList';
import {login} from './services/login'
import * as noteService from './services/notes'
function App() {
  const [noteList, setNoteList] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [user, setUser] = useState(null)
  const [errorLogin, setErrorLogin] = useState(false)
  useEffect(() => {
    async function getNotes (){
      const data = await noteService.getAllNotes();
      setNoteList(data)
    }
    getNotes();
    
  }, [])

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token)

    }
  }, [])

  const logout = () =>{
    setUser(null);
    noteService.setToken(null);
    window.localStorage.removeItem('loggedNoteAppUser')
  }


  const createNote = async (evt , newNote)=>{
    evt.preventDefault();
    const data = await noteService.createNote(newNote);
    setNoteList([...noteList, data])
  }
  const updateNote = async ()=>{
    const data = await noteService.updateNote(currentNote);
    const temporalList = [...noteList];
    const currentIndex = temporalList.findIndex(note=>note.id===currentNote.id)
    if(currentIndex){
      temporalList.splice(currentIndex,1, data)
      setNoteList(temporalList)
    }
  }

  const toggleImportance = async (_note)=>{
    const updatedNote = {..._note};
    updatedNote.important = !updatedNote.important ;
    const data = await noteService.updateNote(updatedNote);
    const temporalList = [...noteList];
    const currentIndex = temporalList.findIndex(note=>note.id===updatedNote.id)
    if(currentIndex!==-1){
      temporalList.splice(currentIndex,1, data)
      setNoteList(temporalList)
    }
  }


  const deleteNote = async (_note)=>{
    if(window.confirm("Seguro que desea eliminar la Nota?")){
      await noteService.deleteNote(_note.id)
      const temporalList = [...noteList];
      const currentIndex = temporalList.findIndex(note=>note.id===_note.id)
      if(currentIndex){
        temporalList.splice(currentIndex,1)
        setNoteList(temporalList)
      }
    }
  }
  const handleSubmit = async(event, username, password) =>{
    event.preventDefault();
    try{
      const data = await login({username, password});
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(data))
      noteService.setToken(data.token)
      setUser(data);
      setErrorLogin(false);
      // setUsername('')
      // setPassword('')
    }catch(e){
      setErrorLogin(true);
      console.error("🚀 ~ file: App.js ~ line 67 ~ handleSubmit ~ e", e.response.data.error)      
    }
  }
  return (
    <div className="App">
    {errorLogin && (
      <div className='login-error'>Wrong Credentials</div>
    )}
    {user ? 
      <CreateNote logout={logout} createNote={createNote}/> : 
      <LoginForm handleSubmit={handleSubmit}/>
    }
    <NoteList 
      noteList={noteList} 
      setCurrentNote={setCurrentNote} 
      deleteNote={deleteNote} 
      toggleImportance={toggleImportance}/>
     
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
