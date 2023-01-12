// fetch("http://localhost:3000/api/v1/user")
// .then(res=>res.json())
// .then(data=>{
//     console.log(data);
// })



// .catch(err=>console.log(err))
let btn_signin=document.querySelector(".btn-signin")
btn_signin.addEventListener("click",()=>{
    document.querySelector(".popup-create_post_overlay").style.display="block";
    document.querySelector("body").style.overflow="hidden"
})
let form=document.querySelector(".form-signup")
console.log(form);
form.addEventListener("submit",(e)=>{
    console.log(1111);
    e.preventDefault()
    let data={
        username:form.username.value,
        name:form.displayName.value,
        email:form.email.value,
        password:form.password.value,
        repassword:form.repassword.value
    }
    console.log(data);
    if(data.username!==""&&data.name!==""&&data.email !=="" && data.password!=="" && data.repassword!==""){
        fetch("/api/v1/user",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.status) {
              document.querySelector(".popup-create_post_overlay").style.display="none"  
            }else{
                if (data.err_email) {
                    document.querySelector(".err_email").innerHTML=data.err_email
                }else{
                    document.querySelector(".err_email").innerHTML=""
                }
                if (data.err_pass) {
                    document.querySelector(".err_pass").innerHTML=data.err_pass
                }else{
                    document.querySelector(".err_pass").innerHTML=""
                }
                if (data.err_username) {
                    document.querySelector(".err_username").innerHTML=data.err_username
                }else{
                    document.querySelector(".err_username").innerHTML=""
                }
            }

        })
    }
})
// login
let formLogin=document.querySelector(".form-login")
console.log(formLogin);
formLogin.addEventListener("submit",(e)=>{
    e.preventDefault();
    let data={
        email:formLogin.email.value,
        password: formLogin.password.value
    }
    fetch("/api/v1/login",{
        method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(data)

    })
    .then(res=>res.json())
    .then(data=>{
        if(data.status){
            window.location.href="http://localhost:3000/"
        }else{
            if (data.err_emai) {
                document.querySelector(".err_email_login").innerHTML=data.err_email
            }else{
                document.querySelector(".err_password_login").innerHTML=data.err_pass
            }

        }

    })
})

