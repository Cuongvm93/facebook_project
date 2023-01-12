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
})
// accept and decline request
let btn_accept=document.querySelector(".accept-friend")
btn_accept.addEventListener("click",()=>{
  let data={
    sender:btn_accept.id,
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
    btn_accept.parentElement.parentElement.parentElement.remove()
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
  