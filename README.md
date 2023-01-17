# Firebase 찍먹하기🍜

    - why Firebase? 내 프로젝트를 test 해보고 싶을때, dataBase 구축에 시간 들이지 않고 쉽게 시작 할 수 있다 
        => 유저가 많아지면 내 db로 변경
    - Auth (이메일/ 비밀번호 로그인 & Github 로그인)
    - fireStore (fireStore vs database 둘다 웬만한 기능은 다 가지고있어서 본인 프로젝트 성격에 따라 택해주자) </br>
        => collection, getDoc, getDocs, addDoc, getFirestore, onSnapshot, query, orderBy 
        </br>
         대충 사용해도 써야되는게 한두개가 아님.. docs가 자세하긴 한데 너무 자세해서 이것저것 해보다보면 시간 엄청쓴다.. </br>
         
         1) getDocs (내꺼 db 불러오기)  </br>
         const datebase = getFirestore(); </br>
         const bucketDB = collection(datebase, "bucket") </br>
         const getBucket = await getDocs(bucketDB) </br>

         getBucket.forEach((doc) => { // forEach는 firebase 자체 method로 자동 id가 난수로 괴랄하게 생성되서 해당 method 필수임
            const updateData = {...doc.data(), id: doc.id} // db데이터에 firebase에서 만드는 난수 id 추가해서 object 생성해줬음  </br>
            setDBdata(prev => [...prev, updateData]) </br>
            }) </br>
         
         2) addDoc (db에 저장하기) </br>
         const bucketDB = collection(datebase, "bucket") </br>
         await addDoc(bucketDB, text) </br>

         // CRUD 다 할수는 있는데 요렇게하면 실시간으로 db에 저장한걸 불러올수 없음  </br>
         => onSnapshot으로 DB 실시간 사용 </br>

         3) onSnapshot (db 변경사항 실시간 반영하기) </br>
        const q = query(collection(datebase, "bucket"), orderBy("createdDate")) //orderBy 메서드로 정렬하기 </br>
        const unsubscribe = onSnapshot(q, (state) => { </br>
            state.docs.map((v) => {  </br>
            const updateData = {...v.data(), id: v.id} </br>
            setDBdata(prev => [...prev, updateData])   </br>
            }) </br>
        }) </br>
        // 여기까지 혼자 docs 읽고 블로그 참고하고 하니까 꼬박3일은 걸렸다.. 넘나 어려운것
    

    - database (realtime) _[API로 데이터 주고받기]
        GET: fetch('Firebase URL/${자식KEY}.json')
        POST: fetch('Firebase URL/${자식KEY}.json', {
        method: 'POST',
        body: JSON.stringify({
            text (넣을 object)
        })
    
