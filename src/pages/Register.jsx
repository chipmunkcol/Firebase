import { createUserWithEmailAndPassword } from "firebase/auth"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/app"

const Register = () => {

const [id, setId] = React.useState("")
const [password, setPassword] = React.useState("")

const navigate = useNavigate();
const onSubmit = (e) => {
    e.preventDefault();

// Firebase Auth 메서드
    createUserWithEmailAndPassword(auth, id, password)
    .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
        setId("")
        setPassword("")
        navigate('/login')
    })
}

    return(
        <div>
            <form onSubmit={onSubmit}>
                <label>아이디</label>
                <input
                type="email"
                required 
                value={id}
                onChange={(e)=>{setId(e.target.value)}}/> <br />
                비밀번호 
                <input 
                type="password"
                required
                minLength="6"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}/> <br />

                <button>회원가입</button>
            </form>
        </div>
    )
}

export default Register;