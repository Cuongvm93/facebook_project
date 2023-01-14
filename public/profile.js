
let string=window.location.href;
let newStr=string.slice(27,string.length)
console.log(newStr);
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
let btn_editInfo=document.querySelector(".header-info-button_edit")
let btn_cancelEdit=document.querySelector(".cancel-edit")
let btn_savenInfo=document.querySelector(".save-info")
let btn_addFriend=document.querySelector(".header-info-button_addFriend ")
let btn_message=document.querySelector(".header-info-button_Message")
if(btn_editInfo!= undefined){
    btn_editInfo.addEventListener("click",()=>{
        document.querySelector(".popup-edit-info_overlay").style.display="block"
        document.querySelector("body").style.overflow="hidden"
    })
}
btn_cancelEdit.onclick=()=>{
    document.querySelector(".popup-edit-info_overlay").style.display="none"
}
// preview avatar & cover
let input_avatar=document.querySelector("#uploadFile-avatar")
let input_cover=document.querySelector("#uploadFile-cover")
// upload avatar
input_avatar.addEventListener("change",()=>{
    uploadFileAvatar(input_avatar.files)
})
async function uploadFileAvatar(file) {
    const task=storageRef
    .child(`/${file[0].name}`)
    .put(file[0], file[0].type);
    task.then((snapshot) => snapshot.ref.getDownloadURL())
    .then(data=>{
        console.log(data);
        document.querySelector(".preview-avatar").setAttribute("src",data)
    })
}
let id_user_owner=document.querySelector(".avatar-user-login").id
//upload cover
input_cover.onchange=()=>{
    uploadFileCover(input_cover.files)
}
async function uploadFileCover(file) {
    const task=storageRef
    .child(`/${file[0].name}`)
    .put(file[0], file[0].type);
    task.then((snapshot) => snapshot.ref.getDownloadURL())
    .then(data=>{
        console.log(data);
        document.querySelector(".preview-cover").setAttribute("src",data)
    })
}
//update profile
if (btn_savenInfo) {
    btn_savenInfo.addEventListener("click",()=>{
        let data={
            avatar: document.querySelector(".preview-avatar").src,
            cover: document.querySelector(".preview-cover").src,
            displayName:document.querySelector(".edit-name").value,
            work:document.querySelector(".edit-work").value,
            study:document.querySelector(".edit-study").value,
           live:document.querySelector(".edit-live").value,
           dating:document.querySelector("#edit-dating").value
        }
        console.log(data);
        fetch(`/api/v1/user/${newStr}`,{
            method:"PUT",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
    })
}

// add friend 
if (btn_addFriend) {
    btn_addFriend.onclick=()=>{
        let data={
            sender:btn_addFriend.id,
            reciver:newStr,
            type:"Add_Friend"
        }
        console.log(data);
        fetch("/api/v1/noti",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(data)
    
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
    }
}
// Get notification
let btn_bell=document.querySelector(".bell-notifi")
btn_bell.addEventListener("click",()=>{
  document.querySelector(".dropdow-noti_menu").classList.toggle("active-noti")
  console.log(btn_bell.childNodes[0]);
  btn_bell.childNodes[0].classList.toggle("active-bell")
  fetch(`/api/v1/noti/${btn_bell.id}`)
  .then(res=>res.json())
  .then(data=>{
    let string=""
    console.log(data);
    if (data.length==0) {
      string= `<p style="width:100%;padding:20px">You have no notification!</p>`
    }else{
      for (let index = 0; index < data.length; index++) {
        if (data[index].type_noti=="Comment" && data[index].sender_noti !==btn_bell.id) {
          string+=`
          <div class="noti_item_cmt">
          <div class="noti-item-react-feature">
              <img class="img-noti-feature" src="${data[index].avatar}" alt="">
              <i class="fa-solid fa-comment cmt-noti-icon"></i>
             </div>
               <p>${data[index].display_name} đã bình luận bài viết của bạn</p>
         </div>
          `
        }else if(data[index].type_noti=="Add_Friend" && data[index].sender_noti!==btn_bell.id){
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
        }else if(data[index].type_noti=="React" && data[index].sender_noti!==btn_bell.id){
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
          <p class="username">${document.querySelector(".header-user").id} </p>
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