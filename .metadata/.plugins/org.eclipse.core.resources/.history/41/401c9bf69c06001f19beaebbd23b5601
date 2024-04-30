console.log("board_detail.js in");

console.log("연결된 스크립트 : "+bnoVal);

document.getElementById('cmtAddBtn').addEventListener('click',()=>{

    let cmtText = document.getElementById('cmtText').value;
    const cmtWriter = document.getElementById('cmtWriter').value;
    if(cmtText == null || cmtText == ''){
        alert('댓글을 입력해주세요.');
        return false;
    }else{
        //댓글 등록
        let cmtData = {
            bno : bnoVal,
            writer : cmtWriter,
            content : cmtText
        }; 
        //댓글 비동기로 전송
        postCommentToServer(cmtData).then(result=>{
            console.log(result); //여기에 isOk기록
            if(result === '1'){
                alert('댓글 등록 성공~!');
                document.getElementById('cmtText').value = '';
            }
            // 댓글 출력
            printCommentList(bnoVal);
        });
    }

});

async function postCommentToServer(cmtData){
    try {
        //method(get,post), header(content-Type), body
        const url = "/cmt/post";
        const config = {
            method : 'post',
            Headers : {
                'Content-Type' : 'application/json; charset=utf-8'
            },
            body : JSON.stringify(cmtData)
        }

        const resp = await fetch(url,config);
        const result = await resp.text(); //isOk를 값을 리턴
        return result;
    } catch (error) {
        console.log(error);
    }
}

function spreadCommentList(result){  //result = 댓글 리스트

    console.log(result);
    let div = document.getElementById('commentLine');
    div.innerText = ''; //div의 원래 만들어 두었던 구조를 지우기
    for(let i=0; i<result.length; i++){
        let html = `<div>`;
        html += `<div>${result[i].cno}, ${result[i].bno}, ${result[i].writer}, ${result[i].regdate}</div>`;
        html += `<div>`;
        html += `<input type="text" class="cmtText" value="${result[i].content}">`;
        if(result[i].writer==idVal){
            html += `<button type="button" data-cno=${result[i].cno} class="cmtModBtn">수정</button>`;
            html += `<button type="button" data-cno=${result[i].cno} class="cmtDelBtn" >삭제</button><br>`;
        }
        html += `</div></div><hr>`;
        div.innerHTML += html; //각 댓글을 누적하여 담기
    }

}

//댓글리스트 요청
async function getCommentListFromServer(bno){
    try {
        const resp = await fetch('/cmt/list?bno='+bno);
        const result = await resp.json();   // '[{...},{...},{...}]'
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

function printCommentList(bno){
    getCommentListFromServer(bno).then(result =>{
        console.log(result);
        if(result.length>0){
            spreadCommentList(result);
        }else{
            let div = document.getElementById('commentLine');
            div.innerHTML = `<div>Comment가 없습니다. 댓글을 작성해보세요.</div>`;
        }
    })
};


//수정 : cno, content => result isOk => post처럼 

async function updateCommentFromServer(cmtData){
    try {
        const url = "/cmt/modify";
        const config = {
            method : 'post',
            Headers : {
                'Content-Type' : 'application.json; charset=utf-8'
            },
            body : JSON.stringify(cmtData)
        }
        const resp = await fetch(url,config);
        const result = await resp.text(); //isOk 값을 리턴
        return result;

    } catch (error) {
        console.log(error);
    }
}


//삭제 : cno => result isOk => list처럼
async function removeCommentFromServer(cnoVal){
    try {
        const resp = await fetch("/cmt/remove?cno="+cnoVal);
        const result = await resp.text(); //isOk 값 리턴
                
        return result;

    } catch (error) {
        console.log(error);
    }

}


document.addEventListener('click',(e)=>{

console.log(e.target);

//삭제버튼일 경우

if(e.target.classList.contains('cmtDelBtn')){
    let cnoVal = e.target.dataset.cno; //data= cno 값 추출
    console.log(cnoVal);
    removeCommentFromServer(cnoVal).then(result=>{
        if(result === '1'){
            alert('댓글 삭제 성공!!');
            //댓글 출력
            printCommentList(bnoVal);
        }
    })
}



//수정버튼일 경우

if(e.target.classList.contains('cmtModBtn')){
    let cnoVal = e.target.dataset.cno; //data = cno 값 추출
    console.log(cnoVal);
    //내 타겟을 기준으로 가장 가까운 div를 찾기
    let div = e.target.closest('div');
    console.log(div);
    let cmtText = div.querySelector('.cmtText').value;
    console.log(cmtText);

    let cmtData={
        cno : cnoVal,
        content : cmtText
    }
    updateCommentFromServer(cmtData).then(result=>{
        if(result === '1'){
            alert('댓글 수정 성공!!');
            printCommentList(bnoVal);
        }
    })

}

});

