import { useContext, useEffect, useRef, useState } from "react";
import { MyStore } from "../store/userState";
import { collection, getDoc, getDocs, addDoc, getFirestore } from "firebase/firestore"

function Home () {

const { LoginUser, setLoginUser } = useContext(MyStore)
const postRef = useRef(0)
const postId = postRef.current
const [DBdata, setDBdata] = useState([])
console.log('DBdata: ', DBdata);

const contentRef = useRef(null)
const datebase = getFirestore()
const getFB = async() => {
    const bucketDB = collection(datebase, "bucket")
    const query = await getDocs(bucketDB)
    console.log('query: ', query);
    query.forEach((doc) => {
        // DBdata.concat(doc.data())
        setDBdata([doc.data()])
    })
}

const postFB = (text) => {
    const bucketDB = collection(datebase, "bucket")
    addDoc(bucketDB, text)
}

useEffect(()=>{
    getFB()
}, [])



const onSubmit = (e) => {
    e.preventDefault();
    const content = contentRef.current.value;
    const text = {
        content,
        createdId: LoginUser,
        createdDate: Date()
    }
    postFB(text)
}


if(!LoginUser) { return <h1>로그인 후 사용해주세요 {":)"}</h1> }

// if(!DBdata) { return <h1>로딩 중~</h1> }

    return(
        <>
        <h1>firebase database CRUD!</h1>

            <form onSubmit={onSubmit}>
                <label >내용</label>
                <input ref={contentRef}/>

                <button>database에 등록</button>
            </form>

            {DBdata?.map(data => 
                <h3>{data?.content}</h3>
            )}
        {/* <h3>{DBdata?.content}</h3> */}
        </>
    )
}

export default Home;


// const getFB = async() => {
//     const response = await fetch('https://auth-c1322-default-rtdb.firebaseio.com/order.json')
//         .then((res) => res.json())
//         setDBorder(response.LoginUser)
//         console.log('response: ', response.LoginUser);
// }
// useEffect(()=> {
//     getFB()
// }, [])

// const postFB = (text) => {
//     fetch('https://auth-c1322-default-rtdb.firebaseio.com/order.json', {
//         method: 'POST',
//         body: JSON.stringify({
//             text
//         })
//     })
// }