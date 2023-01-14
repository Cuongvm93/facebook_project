const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCigSIgQRvhDCYQljwPQxDqujiw_VvW0B8",
    authDomain: "ecomerce-project-f455c.firebaseapp.com",
    projectId: "ecomerce-project-f455c",
    storageBucket: "gs://ecomerce-project-f455c.appspot.com",
    messagingSenderId: "756279086762",
    appId: "1:756279086762:web:4ff6dee0188a223df2cad3",
    measurementId: "G-2REKG9LKWN" /* Firebase config */,
  });
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const storageRef = firebase.storage().ref();
  let textOfpost=document.querySelector("#textOfPost")
  let imgOfPost;
  let private=document.getElementById("privatOfPost")
  
  let input_something=document.querySelector("#input_something")
  input_something.addEventListener("click",(e)=>{
    document.querySelector(".popup-create_post_overlay").style.display="block"
    document.querySelector("body").style.overflow="hidden"
  })
  console.log(input_something);
  let upload_btn=document.getElementById("upload_btn")
  let media_container=document.querySelector(".create_post_body_media")
  upload_btn.addEventListener("change",()=>{
    
    uploadFile(upload_btn.files)
  })
async function uploadFile(file){
    let arrFile= Array.from(file)
    console.log("hello",arrFile);
    let arrImageUrl = [];
    for (let i = 0; i < arrFile.length; i++) {
      const task = storageRef
        .child(`/${arrFile[i].name}`)
        .put(arrFile[i], arrFile[i].type);
      arrImageUrl.push(task.then((snapshot) => snapshot.ref.getDownloadURL()))
    }
    Promise.all(arrImageUrl).then(url => {
        console.log(url)
        let string="";
        url.forEach((item)=>{
            string +=`<div class="media-preview"><img src="${item}" class="imgOfPost" alt="..."><i class="fa-sharp fa-solid fa-circle-xmark"></i></div>`
        })
        media_container.innerHTML=string
        let cancelImg=document.querySelectorAll(".fa-circle-xmark")
        cancelImg.forEach(item=>{
          item.onclick=()=>{
            item.parentNode.remove()
            
            imgOfPost=document.querySelectorAll(".imgOfPost")
          }
        })
         imgOfPost=document.querySelectorAll(".imgOfPost")
         
        
    })
}

// upload post
let id_user_owner=document.querySelector(".id_user_owner").id
console.log(id_user_owner);
let post_btn=document.querySelector(".post_btn")
post_btn.addEventListener("click",()=>{
    let arrImg_Post=Array.from(imgOfPost).map(item=>item.src)
    console.log(arrImg_Post);
    let data={}
    if (arrImg_Post[0]==undefined) {
      data={
        content:textOfpost.value,
        private: private.value
      }
    }else{
      data={
        content:textOfpost.value,
        media:arrImg_Post,
        private: private.value
    }
    }
    console.log(data);
     
    fetch("/api/v1/post",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then((data)=>{
        console.log(data);
        if(data.status){
          document.querySelector(".popup-create_post_overlay").style.display="none";
          // let element= document.createElement("div")
          //   element.classList.add("post")
          window.onload();
        }
    })
    
})

// get all post
// fetch("/api/v1/post")
// .then(res=>res.json())
// .then((data)=>{
//   console.log(data);
//   console.log(data[0][0]);
//   console.log(data[1][0][0]);
  
//   let string="";
//   console.log(document.querySelector(".header-user").childNodes);
//   document.querySelector(".header-user").childNodes[5].src=data[1][0][0].avatar
//   document.querySelector(".feed-input").childNodes[1].src=data[1][0][0].avatar
//   for (let index = 0; index < data[0][0].length; index++) {
//     console.log(data[0][0][index].date);
//    string+=`
//    <div class="post">
//    <div class="post-header">
//        <div class="post-header-user">
//            <img src="${data[0][0][index].avatar}" alt="">
//            <div class="post-header-user_name">
//                <h4>${data[0][0][index].display_name}</h2>
//                <p>${data[0][0][index].date.toLocaleTimeString()}</p>
//            </div>
//        </div>
//        <i class="fa-sharp fa-solid fa-bars"></i>
//    </div>
//    <div class="post-content">${data[0][0][index].content}</div>
//    <div class="post-body">
//        <img src="${data[0][0][index].photo[0]}" alt="">
       
//    </div>
//    <div class="post-footer">
//        <div class="post-footer_reaction">
//            <div class="reaction">
             
//                   <span> <i class="fa-solid fa-heart"></i>
//                     3M</span>
              
//            </div>
//            <div class="comment">
//                <p>200k comments</p>
//            </div>
//        </div>
//        <div class="post_footer_button">
//         <div><i class="fa-sharp fa-solid fa-heart"></i> &nbsp Love</div>
//         <div><i class="fa-sharp fa-solid fa-comment"></i>&nbsp  Comment</div>
//         <div><i class="fa-sharp fa-solid fa-share"></i> &nbsp Share</div>
//        </div>
//        <div class="post-footer-conmment-container">
//            <div class="write-comment">
//                <img src="${data[1][0][0].avatar}" alt="">
//                <input type="text" placeholder="comment something...">
//            </div>
//            <div class="view-comment">
//            </div>
//        </div>
//    </div>
// </div>
//    `
    
//   }
    
//   document.querySelector(".feed-content").innerHTML=string
  
// })

// Get notification
let btn_bell=document.querySelector(".bell-notifi")
btn_bell.addEventListener("click",()=>{
  document.querySelector(".dropdow-noti_menu").classList.toggle("active-noti")
  console.log(btn_bell.childNodes[0]);
  btn_bell.childNodes[0].classList.toggle("active-bell")
  fetch(`api/v1/noti/${btn_bell.id}`)
  .then(res=>res.json())
  .then(data=>{
    let string=""
    console.log(data);
    if (data.length==0) {
      string= `<p style="width:100%;padding:20px">You have no notification!</p>`
    }else{
      for (let index = 0; index < data.length; index++) {
        if (data[index].type_noti=="Comment" && data[index].sender_noti !==id_user_owner) {
          string+=`
          <div class="noti_item_cmt">
          <div class="noti-item-react-feature">
              <img class="img-noti-feature" src="${data[index].avatar}" alt="">
              <i class="fa-solid fa-comment cmt-noti-icon"></i>
             </div>
               <p>${data[index].display_name} đã bình luận bài viết của bạn</p>
         </div>
          `
        }else if(data[index].type_noti=="Add_Friend" && data[index].sender_noti!==id_user_owner){
          string += `
          <div class="noti_item_addFriend " >
        <img class="img-noti-feature" src="${data[index].avatar}" alt="">
        <div class="body-content-noti">
            <p style="font-size:14px;margin-bottom: 0px;"><a href="/user/${data[index].sender_noti}" style="text-decoration: none;color:black; font-weight: 700">${data[index].display_name}</a> đã gửi cho bạn lời mời kết bạn</p>
            <div class="d-flex gap-5 mt-2 w-75 justify-content-between">
                <button class="btn btn-primary accept-friend" id="${data[index].sender_noti}">Accept</button>
                <button class="btn btn-signin decline-request" id="${data[index].sender_noti}">Decline</button>
            </div>
        </div>
          </div>
          `
        }else if(data[index].type_noti=="React" && data[index].sender_noti!==id_user_owner){
          string+=`
          <div class="noti_item_react" >
        <div class="noti-item-react-feature">
         <img class="img-noti-feature" src="${data[index].avatar}" alt="">
         <i class="fa-solid fa-heart react-noti-icon"></i>
        </div>
          <p>${data[index].display_name} đã thích bài viết của bạn</p>
     </div>
          `
        }
        }
    }
    
    document.querySelector(".dropdow-noti_menu").innerHTML=string
  })
})
// accept and decline request
let btn=document.querySelector(".dropdow-noti_menu")
console.log(btn);

  btn.addEventListener("click",(e)=>{
    if (e.target.classList.contains("accept-friend")) {
      let data={
        sender:e.target.id,
        reciver: id_user_owner
      }
      console.log(data);
      fetch("/api/v1/friend",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(data2=>{
      if (data2.status) {
        data['type']="Add_Friend"
        e.target.parentElement.parentElement.parentElement.remove()
        console.log(data);
        fetch("/api/v1/noti",{
          method:"DELETE",
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify(data)
        })
      }
    })
    }
    })
    

//decline request
let btn_decline=document.querySelector(".decline-request")
if (btn_decline) {
  btn_decline.addEventListener("click",()=>{
    let data={
      sender:btn_decline.id,
      reciver: id_user_owner,
      type:"Add_Friend"
    }
      btn_accept.parentElement.parentElement.parentElement.remove()
     
      fetch("/api/v1/noti",{
        method:"DELETE",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(data)
      })
    })
  }
// write comment
let writeCmt=document.querySelectorAll(".write-comment-input")
writeCmt.forEach((item,index)=>{
  item.addEventListener("keypress",(e)=>{
    let data={
      sender_cmt:item.parentElement.id,
      id_post:item.id,
      contentCmt:item.value
    }
    if(e.key=="Enter"){
      let element=document.querySelectorAll(".view-comment")
      console.log(element);
      console.log(element[index]);
      element[index].insertAdjacentHTML("afterbegin",`
      
      <div class="comment-compoment">
      <img src="${item.previousElementSibling.src}" alt="">
      <div class="content-container">
          <p class="username">${document.querySelector(".select_private").childNodes[1].innerText} </p>
          <p class="content">${item.value}</p>
      </div>
      </div>
    
      `)
      console.log(data);
      fetch("/api/v1/comment",{
        method: "POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(data)
      })
      .then(res=>res.json())
      .then(data=>{
        item.value=""
        // console.log(document.querySelector(".select_private").childNodes);
      
      
      })
      
    }
  })
})

// view more commnet
let btn_viewcomment=document.querySelectorAll(".view-more-cmt")
btn_viewcomment.forEach((item,index)=>{
  item.addEventListener("click",()=>{
    console.log(item.id);
    fetch(`/api/v1/comment/${item.id}`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      let string=""
      for (let index = 0; index < data.length; index++) {
        string+=`
        <div class="comment-compoment">
          <img src="${data[index].avatar}" alt="">
          <div class="content-container">
              <p class="username">${data[index].display_name} </p>
              <p class="content">${data[index].comment}</p>
          </div>
          </div>
        `
      }
      item.parentElement.innerHTML=string
    })
  })
})

// Love Post
let btn_love =document.querySelectorAll(".btn-love-post")
btn_love.forEach(item=>{
  item.addEventListener("click",()=>{
    item.style.color="red";
    fetch(`api/v1/love/${item.id}`,{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        id_post:item.id,
        sender:id_user_owner
      })
    })     
  })
})