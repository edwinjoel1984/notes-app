import {useState} from 'react'
const LoginForm = ({handleSubmit}) => {
    const [showLogin, setShowLogin]= useState(false);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return (
      <div>
        {showLogin ? (
        <form data-testid='login-form' onSubmit={(evt)=>handleSubmit(evt, username, password)}>
        <div>

          <input type="text"
          value={username}
          placeholder="Username" 
          onChange={({target})=>setUsername(target.value)}/>
        </div>
        <div>

          <input type="password"
          value={password}
          placeholder="Password"
          onChange={({target})=>setPassword(target.value)}/>
        </div>
        <button type="submit">Submit</button>
      </form>

        ): (
          <button onClick={()=>setShowLogin(true)}>Show Login</button>
        )}
        </div>
    );
}

export default LoginForm;