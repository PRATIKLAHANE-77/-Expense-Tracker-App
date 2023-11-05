// const { response } = require("express");

const submit = document.getElementById("submitemail");

submit.addEventListener("click", (event) =>{
    event.preventDefault();
    const email = document.getElementById("resetemail").value;
    const obj = {email:email};
    axios.post("http://localhost:5000/password/forgotpassword",obj).then((response)=>{
        console.log(response.data);
        alert("link send to registered mail id");
    })
})