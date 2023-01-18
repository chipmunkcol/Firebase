import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { MyStore } from "../store/userState";
import { collection, getDoc, getDocs, addDoc, getFirestore, onSnapshot, query, orderBy } from "firebase/firestore"


function Home () {

const { LoginUser, setLoginUser } = useContext(MyStore)
const [DBdata, setDBdata] = useState([])
console.log('DBdata: ', DBdata);
// const [loading, setLoading] = useState(false)
const contentRef = useRef(null)

// firestore에서 실시간 가져오기
const datebase = getFirestore()

const fnOnsnapshot = () => {
    const q = query(collection(datebase, "bucket"), orderBy("createdDate"))

    onSnapshot(q, (state) => {
        setDBdata([])   // 이상하게 함수 호출이 두번씩돼서 dbdata를 초기화 시켜줬는데 디버깅 해봐도 원인을 정확히 모르겠다.. 한참 고민했는데 흠.. 뭐 덕분에 디버거 쓰는 법 정도는 익힌듯 
        state.docs.map((v) => { 
        const updateData = {...v.data(), id: v.id}
        setDBdata(prev => [...prev, updateData])
        })
    })
}
useEffect(()=>{
    fnOnsnapshot()
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

            {DBdata?.reverse().map(data => 
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