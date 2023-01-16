import { async } from "@firebase/util";
import { useContext, useEffect, useRef } from "react";
import { postNewFB } from "../firebase/app";
import { MyStore } from "../store/userState";

function Home () {

const { LoginUser, setLoginUser } = useContext(MyStore)
console.log('LoginUser: ', LoginUser);
const contentRef = useRef(null)

const onSubmit = (e) => {
    e.preventDefault();
    const content = contentRef.current.value;
    const text = {
        content,
        createdId: LoginUser,
        createdDate: new Date()
    }
    postFB(text)
}
const getFB = async() => {
    const response = await fetch('https://auth-c1322-default-rtdb.firebaseio.com/meal.json')
        .then((res) => res.json())
    console.log(response)
}
useEffect(()=> {
    // console.log(getFB(LoginUser))
    getFB()
}, [])

const postFB = (text) => {
    fetch('https://auth-c1322-default-rtdb.firebaseio.com/text.json', {
        method: 'POST',
        body: JSON.stringify({
            text
        })
    })
}

if(!LoginUser) {
    return <h1>로그인 후 사용해주세요 {":)"}</h1>
}
    return(
        <>
            <h1>firebase database CRUD!</h1>

            <form onSubmit={onSubmit}>
                <label >내용</label>
                <input ref={contentRef}/>

                <button>database에 등록</button>
            </form>
        </>
    )
}

export default Home;