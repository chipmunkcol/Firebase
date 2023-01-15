import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function App() {

const navigate = useNavigate()

  return (
    <>
    <ul>
      <li onClick={()=>navigate('')}>메인 페이지</li>
      <li onClick={()=>navigate('register')}>회원가입</li>
      <li onClick={()=>navigate('login')}>로그인</li>
    </ul>
    <Outlet />
    </>
  );
}

export default App;
