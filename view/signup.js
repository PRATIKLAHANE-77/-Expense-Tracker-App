const signup = document.getElementById("Signup");
const login = document.getElementById("login");
const errorMessage = document.getElementById("error-message");

signup.addEventListener("click", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("Password").value;

  const obj = {
    name: name,
    email: email,
    password: password,
  };
  console.log(name, email, password);

  send(obj);
});

function send(param) {
  axios
    .post("http://localhost:5000/user/signup", param)
    .then((response) => {
      console.log(response.data);
      alert("suceesfully signup");
      // You can handle success here if needed
    })
    .catch((error) => {
      // Display the error message on the frontend
      errorMessage.textContent = error.response.data;
    });
}

login.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "login.html";
});
