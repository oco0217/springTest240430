console.log("boardModify.js in");
// fileDao에서 요청에서 DB에서 지워서 목록에 안나오게
//파일 form 태그 안에 있어야됌


//서버에 파일리스트 요청
async function getFileListFromServer(bno){
    try {
        const resp = await fetch('/board/'+bno);
        const result = await resp.json();
    } catch (error) {
        console.log(error);
    }
}


//파일 뿌리기 
function spreadFileList(bno){
    getFileListFromServer(bno).then(result=>{
        console.log(result);
    })
}



document.addEventListener('click',(e)=>{
    
    if(e.target.classList.contains('file-x')){
        
        let uuid = e.target.dataset.uuid;
        let bno = e.target.dataset.bno;
        console.log(uuid);
        console.log(bno);

        let fileData={
            uuid : uuid,
            bno : bno
        };

        removeFileToSever(fileData).then(result=>{
            if(result === '1'){
                alert('파일 삭제 완료');
                //내주변에 있는 li를 지우기
                e.target.closest('li').remove();
            }
        })
        
    }
    
});


//서버에 Delte 통신 
//비동기 메서드 맵핑방법 : post, get, put, delete

async function removeFileToSever(fileData){

    try {
        const url = '/board/removeFile';
        const config = {
            method : 'delete',   
            headers : {
                'content-type' : 'application/json; charset=utf-8'
            },
            body : JSON.stringify(fileData)
        }
        const resp = await fetch(url, config);
        const result = await resp.text();
    
        return result;
        
    } catch (error) {
        console.log(error);
    }

}
