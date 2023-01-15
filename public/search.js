console.log(1111);
let search_input=document.querySelector(".search-container")
console.log(search_input);
search_input.addEventListener("input",()=>{
   if (search_input.value.trim()!="") {
    document.querySelector(".search-result").classList.add("active-search-result")
    document.querySelector("body").addEventListener("click",()=>{
        document.querySelector(".search-result").classList.remove("active-search-result")
    })
    
    let string='';
    console.log(search_input.value);
    fetch("/api/v1/user")
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        for (let index = 0; index < data.length; index++) {
         if (data[index].display_name !=null ) {
            if (((data[index].display_name).toLowerCase()).includes(search_input.value.toLowerCase())) {
                string+=`
                <div class="search-result-content">
                    <img src="${data[index].avatar}" alt="">
                    <a style="font-weight:600; text-decoration: none; color: black" href="/user/${data[index].id_user}">${data[index].display_name}</a>
                </div>
                
                `
            }
         }
            
        }
        document.querySelector(".search-result").innerHTML=string
    })
   }
})