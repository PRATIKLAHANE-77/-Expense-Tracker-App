const Login = document.getElementById("Login");
const Signup = document.getElementById("Signup");

Login.addEventListener("click", (event) => {
  event.preventDefault();
  const Email = document.getElementById("Email").value;
  const Password = document.getElementById("Password").value;
  const obj = {
    Email: Email,
    Password: Password,
  };
  check(obj);
});

function check(param) {
  axios
    .post("http://localhost:5000/user/signin", param)
    .then((response) => {
      alert(response.data.token);
       // localStorage.setItem("userId", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isprime",response.data.isprime);
      console.log("value of isprime = ", response.data);
      window.location.href = "expense.html";
    })
    .catch((err) => {
      alert("User does not exist");
    });
}

Signup.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "signup.html";
});
