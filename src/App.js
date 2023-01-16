import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MyStore } from "./store/userState"

function App() {

const navigate = useNavigate()
const [LoginUser, setLoginUser] = useState("")

  return (
    <>
    <MyStore.Provider value={{LoginUser, setLoginUser}}>
      <ul>
        <li onClick={()=>navigate('')}>메인 페이지</li>
        <li onClick={()=>navigate('register')}>회원가입</li>
        <li onClick={()=>navigate('login')}>로그인</li>
      </ul>
      <Outlet />
    </MyStore.Provider>
    </>
  );
}

export default App;
