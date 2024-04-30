console.log('잘 연결되었나 확인');
console.log('Board Detail Comment JavaScript In');
console.log(bnoVal);


document.getElementById('cmtAddBtn').addEventListener('click',()=>{

    const cmtText = document.getElementById('cmtText').value;
    const cmtWriter = document.getElementById('cmtWriter').innerText;

    if(cmtText == null || cmtText == ''){
        alert('댓글을 입력해주세요');
        document.getElementById('cmtText').focus();
        return false;
    }

    let cmtData = {
        bno : bnoVal,
        writer : cmtWriter,
        content : cmtText
    }
    
    console.log(cmtData);

    postCommentToServer(cmtData).then(result=>{
        console.log(result);

        if(result == 1){
            alert('댓글이 정상적으로 등록 되었습니다.');
            document.getElementById('cmtText').value = '';
            //화면에 뿌리기
            spreadCommentList(bnoVal);
        }
    })

});




//비동기 통신 restful
//post : 데이터 객체를 Controller로 보낼 떄 (삽입)
//get : 조회 (생략가능)
//put(patch) : 수정
//delete : 삭제

async function postCommentToServer(cmtData){
    try {
        const url = '/comment/post';
        const config = {
            method : 'post',
            headers : {
                'content-type' : 'application/json; charset = utf-8'
            },
            body : JSON.stringify(cmtData)
        };

        const resp = await fetch(url,config);
        const result = await resp.text(); //isOk값
        return result;

    } catch (error) {
        console.log(error);
    }
}


//댓글 뿌리기
function spreadCommentList(bno){
    getCommentListFromServer(bno).then(result =>{
        console.log(result);
        const div = document.getElementById('accordionExample');
        if(result.length > 0){
            //반복
            div.innerHTML = ''; //반복전 기존 샘플 버리기
            for(let i=0; i<result.length; i++){
                let add = `<div class="accordion-item">`;
                add += `<h2 class="accordion-header">`;
                add += `<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">`;
                add += `no.${result[i].cno} / ${result[i].writer} /  [${result[i].reg_date}]`;
                add += `</button>`;
                add += `</h2>`;
                add += `<div id="collapse${i}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">`;
                add += `<div class="accordion-body">`;
                
                if(result[i].writer == writerVal){
                    add += `<button type="button" data-cno="${result[i].cno}" class="btn btn-outline-warning btn-sm cmtModBtn">수정</button>`;
                    add += `<button type="button" data-cno="${result[i].cno}" class="btn btn-outline-danger btn-sm cmtDelBtn">삭제</button>`;
                }
                
                add += `<input type="text" class="form-control cmtText" value="${result[i].content}">`;
                add += `</div></div></div>`;
                div.innerHTML += add;
            }

        }else{
            div.innerHTML = `<div class="accordion-body"> Comment lIst Empty </div>`;
        }
    })
}

document.addEventListener('click',(e)=>{

    console.log(e.target);

    if(e.target.classList.contains('cmtModBtn')){
        // console.log("update");
        let cnoVal = e.target.dataset.cno;
        // console.log(cnoVal);
        let div = e.target.closest('div');
        let cmtText = div.querySelector('.cmtText').value;
        let cmtData={
            cno : cnoVal,
            content : cmtText
        };
        // console.log(cmtData);
        //update 호출
        updateCommentToServer(cmtData).then(result=>{
            if(result == '1'){
                alert('댓글 수정이 완료되었습니다.');
                spreadCommentList(bnoVal);
            }
        })
    }

    //삭제 버튼을 눌렀을 경우
    if(e.target.classList.contains('cmtDelBtn')){
        let cnoVal = e.target.dataset.cno;

        let cmtData={
            cno : cnoVal,
            bno : bnoVal
        };

        removeCommentFromServer(cmtData).then(result=>{
            if(result == '1'){
                alert('댓글 삭제가 완료되었습니다.');
                spreadCommentList(bnoVal);
            }
        });
    }

});



/*

<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        cno, writer, reg_date
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        수정, 삭제버튼 추가
        <button type="button" class="btn btn-outline-danger" btn-sm>Danger</button>
        <button type="button" class="btn btn-outline-warning" btn-sm>Warning</button>
        input 댓글 내용 표시
        <input type="text" class="form-control">
      </div>
    </div>
  </div>
</div>


*/



async function getCommentListFromServer(bno){
try {
    //get은 요청만 하기 떄문에 config는 생략가능
    // /comment/list/306 도 가능 
    const resp = await fetch('/comment/'+bno);
    const result = await resp.json();
    return result;
} catch (error) {
    console.log(error);
}
}


async function updateCommentToServer(cmtData){

    try {
        const url = '/comment/modify';
        const config = {
            method : 'put',
            headers : {
                'content-type' : 'application/json; charset=utf-8'
            },
            body : JSON.stringify(cmtData)
        };

        const resp = await fetch(url, config);
        const result = resp.text();
        
        return result;

    } catch (error) {
        console.log(error);
    }
}

async function removeCommentFromServer(cmtData){
    try {
        const url = '/comment/remove';
        const config = {
            method : 'delete',
            headers : {
                'content-type' : 'application/json; charset=utf-8'
            },
            body : JSON.stringify(cmtData)
        }
        const resp = await fetch(url,config);
        const result = await resp.text();

        return result;
        
    } catch (error) {
        console.log(error);
    }
}


