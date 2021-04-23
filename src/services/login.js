import axios from 'axios';
const baseUrl = 'http://localhost:3001'
// const baseUrl = 'https://safe-wave-36858.herokuapp.com'

export const login = async (credentials) =>{
    const {data} = await axios.post(baseUrl + '/api/login',credentials)
      return data;
}