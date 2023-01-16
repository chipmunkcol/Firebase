# Firebase 찍먹하기🍜

    - why Firebase? 내 프로젝트를 test 해보고 싶을때, dataBase 구축에 시간 들이지 않고 쉽게 시작 할 수 있다 
        => 유저가 많아지면 내 db로 변경
    - Auth (이메일/ 비밀번호 로그인 & Github 로그인)
    - database (realtime) _[API로 데이터 주고받기]
        GET: fetch('Firebase URL/${자식KEY}.json')
        POST: fetch('Firebase URL/${자식KEY}.json', {
        method: 'POST',
        body: JSON.stringify({
            text (넣을 object)
        })
    - Storage
