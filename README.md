# Firebase ์ฐ๋จนํ๊ธฐ๐

    - why Firebase? ๋ด ํ๋ก์ ํธ๋ฅผ test ํด๋ณด๊ณ  ์ถ์๋, 
        dataBase ๊ตฌ์ถ์ ์๊ฐ ๋ค์ด์ง ์๊ณ  ์ฝ๊ฒ ์์ ํ  ์ ์๋ค 
        => ์ ์ ๊ฐ ๋ง์์ง๋ฉด ๋ด db๋ก ๋ณ๊ฒฝ
    - Auth (์ด๋ฉ์ผ/ ๋น๋ฐ๋ฒํธ ๋ก๊ทธ์ธ & Github ๋ก๊ทธ์ธ)
    - fireStore (fireStore vs database ๋๋ค ์ฌ๋งํ ๊ธฐ๋ฅ์ ๋ค ๊ฐ์ง๊ณ ์์ด์ ๋ณธ์ธ ํ๋ก์ ํธ ์ฑ๊ฒฉ์ ๋ฐ๋ผ ํํด์ฃผ์) 
        => collection, getDoc, getDocs, addDoc, getFirestore, onSnapshot, query, orderBy 
        
         ๋์ถฉ ์ฌ์ฉํด๋ ์จ์ผ๋๋๊ฒ ํ๋๊ฐ๊ฐ ์๋.. docs๊ฐ ์์ธํ๊ธด ํ๋ฐ 
         ๋๋ฌด ์์ธํด์ ์ด๊ฒ์ ๊ฒ ํด๋ณด๋ค๋ณด๋ฉด ์๊ฐ ์์ฒญ์ด๋ค.. 
         
         1) getDocs (๋ด๊บผ db ๋ถ๋ฌ์ค๊ธฐ)  
         const datebase = getFirestore(); 
         const bucketDB = collection(datebase, "bucket") 
         const getBucket = await getDocs(bucketDB) 

         getBucket.forEach((doc) => { // forEach๋ firebase ์์ฒด 
         method๋ก ์๋ id๊ฐ ๋์๋ก ๊ดด๋ํ๊ฒ ์์ฑ๋์ ํด๋น method ํ์์

         const updateData = {...doc.data(), id: doc.id} 
         // db๋ฐ์ดํฐ์ firebase์์ ๋ง๋๋ ๋์ id ์ถ๊ฐํด์ object ์์ฑํด์คฌ์ 

         setDBdata(prev => [...prev, updateData]) 
         })
         
         2) addDoc (db์ ์ ์ฅํ๊ธฐ)
         const bucketDB = collection(datebase, "bucket") 
         await addDoc(bucketDB, text) 

         // CRUD ๋ค ํ ์๋ ์๋๋ฐ ์๋ ๊ฒํ๋ฉด ์ค์๊ฐ์ผ๋ก db์ ์ ์ฅํ๊ฑธ ๋ถ๋ฌ์ฌ์ ์์ 
         => onSnapshot์ผ๋ก DB ์ค์๊ฐ ์ฌ์ฉ 

         3) onSnapshot (db ๋ณ๊ฒฝ์ฌํญ ์ค์๊ฐ ๋ฐ์ํ๊ธฐ)
        const q = query(collection(datebase, "bucket"), orderBy("createdDate")) 
        //orderBy ๋ฉ์๋๋ก ์ ๋ ฌํ๊ธฐ

        const unsubscribe = onSnapshot(q, (state) => { 
            state.docs.map((v) => {  </br>
            const updateData = {...v.data(), id: v.id} 
            setDBdata(prev => [...prev, updateData])  
            }) 
        })
        // ์ฌ๊ธฐ๊น์ง ํผ์ docs ์ฝ๊ณ  ๋ธ๋ก๊ทธ ์ฐธ๊ณ ํ๊ณ  ํ๋๊น ๊ผฌ๋ฐ3์ผ์ ๊ฑธ๋ ธ๋ค.. ๋๋ ์ด๋ ค์ด๊ฒ
    

    - database (realtime) _[API๋ก ๋ฐ์ดํฐ ์ฃผ๊ณ ๋ฐ๊ธฐ]
        GET: fetch('Firebase URL/${์์KEY}.json')
        POST: fetch('Firebase URL/${์์KEY}.json', {
        method: 'POST',
        body: JSON.stringify({
            text (๋ฃ์ object)
        })
    
