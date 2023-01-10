import { GithubAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import * as React from 'react'
import { auth, provider } from '../firebase/app'

const Login = () => {

const [id, setId] = React.useState("")
const [password, setPassword] = React.useState("")

const [errMessage, seterrMessage] = React.useState('')

const onSubmit = (e) => {
e.preventDefault();

// Firebase Auth 메서드
signInWithEmailAndPassword(auth, id, password)
    .then((userInfo) => {
        const user = userInfo.user
        console.log('user: ', user);
    })
    .catch((err) => {
        const code = err.code;
        const message = err.message;
        console.log(code, message)
        seterrMessage(message)
    })
}

const onClickGithub = () => {

// Firebase Github Auth 메서드
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(token, user)

  }).catch((error) => {
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GithubAuthProvider.credentialFromError(error);
    console.log(errorMessage)
    console.log(email)
    console.log(credential)
  })
}

React.useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if(user) {
            const uid = user.uid;
            console.log('uid: ', uid);
        }
    })
},[])


    return(
        <>
        <form onSubmit={onSubmit}>
            <div>아이디
                <input 
                type="email"
                required
                onChange={(e)=>{setId(e.target.value)}}
                />
            </div> 
            <div>비밀번호
                <input 
                type="password"
                required
                onChange={(e)=>{setPassword(e.target.value)}}
                />
            </div>
            <button>로그인</button>
        </form>
        <div style={{color:"red"}}>{errMessage}</div>
        <button 
        style={{width:'10vw', height:'4vh', backgroundColor:'#956b6b', border:'none'}}
        onClick={onClickGithub}>Github 로그인</button>
        </>
    )
}

export default Login;