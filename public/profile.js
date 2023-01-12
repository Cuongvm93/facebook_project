
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

// add friend 
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

let a=[1,3,4,5,6,7]
for (let index = 0; index < a.length; index++) {
    switch (a[index]) {
        case 1:
            console.log(111);
            break;
    
        case 3:
            console.log("haha");;
    }
    
}