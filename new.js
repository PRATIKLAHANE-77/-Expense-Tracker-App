document
  .getElementById("submit-btn")
  .addEventListener("click", function display(event) {
    event.preventDefault();
    const mainlist = document.getElementById("list");
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    let obj = {
      amount: amount,
      category: category,
      description: description,
    };
    let uid =
      JSON.stringify(amount) +
      JSON.stringify(category) +
      JSON.stringify(description);
    localStorage.setItem(uid, JSON.stringify(obj));
    const newli = document.createElement("li");
    newli.id = "newli";
    newli.textContent = localStorage.getItem(uid);
    const deletebtn = document.createElement("button");
    deletebtn.id = "delete-btn";
    deletebtn.className = "btn btn-danger btn-lg";
    deletebtn.textContent = "Delete";
    newli.appendChild(deletebtn);
    const Editbtn = document.createElement("button");
    Editbtn.className = "btn btn-warning btn-lg ";
    Editbtn.textContent = "Edit";
    newli.appendChild(Editbtn);
    mainlist.appendChild(newli);

    // delete functionality
    deletebtn.addEventListener("click", function deleteInfo(event) {
      event.preventDefault();
      localStorage.removeItem(uid); /// how it work
      mainlist.removeChild(deletebtn.parentElement);
    });
    Editbtn.addEventListener("click", function editInfo(event) {
      event.preventDefault();
      mainlist.removeChild(newli);
      document.getElementById("amount").value = obj.amount;
      document.getElementById("category").value = obj.category;
      document.getElementById("description").value = obj.description;
    });
  });
