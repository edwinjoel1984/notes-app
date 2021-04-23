import axios from 'axios';
const baseUrl = 'http://localhost:3001'
// const baseUrl = 'https://safe-wave-36858.herokuapp.com'
let token = null;
const setHeaders = () =>{
    return {
        headers: {
            Authorization: token
        }
    }
}
export const setToken = newToken =>{
    token= `Bearer ${newToken}`;
}
export const createNote = async (newNote) =>{
    const config = setHeaders()
    const {data} = await axios.post(baseUrl + '/api/notes', {
        content: newNote.content,
        important: newNote.important
      }, config)
    return data;
}
export const getAllNotes = async () =>{
    const {data} = await axios.get(baseUrl + '/api/notes')
    return data;
}
export const updateNote = async (currentNote) =>{
    const config = setHeaders()
    const {data} = await axios.put(baseUrl + '/api/notes/'+currentNote.id, {
        content: currentNote.content,
        important: currentNote.important
      }, config);
    return data;
}
export const deleteNote = async (note_id) =>{
    const config = setHeaders()
    const {data} = await axios.delete(baseUrl + '/api/notes/'+note_id, config);
    return data;
}