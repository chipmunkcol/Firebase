import { useContext, useEffect, useRef, useState } from "react";
import { MyStore } from "../store/userState";
import { collection, getDoc, getDocs, addDoc, getFirestore, onSnapshot, query, orderBy } from "firebase/firestore"


function Home () {

const { LoginUser, setLoginUser } = useContext(MyStore)
const [DBdata, setDBdata] = useState([])
console.log('DBdata: ', DBdata);
const contentRef = useRef(null)

// firestore에서 가져오기
const datebase = getFirestore()

useEffect(()=>{
    const q = query(collection(datebase, "bucket"), orderBy("createdDate"))
    const unsubscribe = onSnapshot(q, (state) => {
        state.docs.map((v) => { 
        const updateData = {...v.data(), id: v.id}
        setDBdata(prev => [...prev, updateData])  
        })
    })
}, [])

// firestore에 저장하기

const postFB = async(text) => {
    const bucketDB = collection(datebase, "bucket")
    await addDoc(bucketDB, text)
}
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
                <h3
                >{data?.content}</h3>
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

// const getFB = async() => {
//     const bucketDB = collection(datebase, "bucket")
//     const getBucket = await getDocs(bucketDB)

//     getBucket.forEach((doc) => {
//         const updateData = {...doc.data(), id: doc.id} // db데이터에 firebase에서 만드는 난수 id 추가해서 객체생성 
//         setDBdata(prev => [...prev, updateData])
//     })
// }