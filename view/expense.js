const mainlist = document.getElementById("mainlist");
const token = localStorage.getItem("token");

const addExpense = document.getElementById("add-expense");

addExpense.addEventListener("click", (event) => {
  event.preventDefault();
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const userId = localStorage.getItem("userId");
  // console.log("userId: ", userId);
  const obj = {
    amount: amount,
    description: description,
    category: category,
  };

  postdata(obj);
});

function postdata(param) {
  axios
    .post("http://localhost:5000/expense/addexpense", param, {
      headers: { Authorization: token },
    })
    .then((response) => {
      const li = document.createElement("li");
      const deldata = document.createElement("button");
      deldata.textContent = "DELETE";
      const { amount, description, category } = response.data;
      li.textContent = `Amount: ${amount} Description: ${description} Category: ${category}`;
      li.appendChild(deldata);
      mainlist.appendChild(li);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  showAllExpenses();
});

function showAllExpenses() {
  axios
    .get("http://localhost:5000/expense/getall", {
      headers: { Authorization: token },
    })
    .then((response) => {
      const ans = response.data.forEach((data) => {
        const { amount, description, category, id } = data;
        console.log("id, ", id);
        const li = document.createElement("li");
        const deldata = document.createElement("button");
        deldata.textContent = "DELETE";
        li.textContent = `Amount: ${amount} Description: ${description} Category: ${category}`;
        li.appendChild(deldata);
        mainlist.appendChild(li);
        deldata.addEventListener("click", () => delData(id, li));
      });
    })
    .catch((err) => {
      const li = document.createElement("li");
      li.textContent = `Something went wrong`;
    });
}

// function delData(id, li) {
//   axios
//     .delete("http://localhost:5000/expense/deldata", { data: id},{headers: { Authorization: token }})
//     .then((response) => {
//       // console.log(response.data);
//       alert("data deleted sucessfully");
//       mainlist.removeChild(li);
//     })
//     .catch((error) => {
//       alert("something went wrong");
//     });
// }

function delData(id, li) {
  axios
    .delete(`http://localhost:5000/expense/deldata/${id}`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      // console.log(response.data);
      alert("data deleted sucessfully");
      mainlist.removeChild(li);
    })
    .catch((error) => {
      alert("something went wrong");
    });
}

// premium.addEventListener("click", (event) => {
//   event.preventDefault();
//   axios
//     .get("http://localhost:5000/purchase/premiummembership", {
//       headers: { Authorization: token },
//     })
//     .then((response) => {
//       console.log(response.data);
//       var options = {
//         key: response.data.key_id,
//         order_id: response.data.order.id,
//         handler: async function (response) {
//           await axios.post(
//             "http://localhost:5000/purchase/updatetransactionstatus",
//             {
//               order_id: options.order_id,
//               payment_id: response.razorpay_payment_id,
//             },
//             { headers: { Authorization: token } }
//           );
//           alert("you are a premium user now");
//         },
//       };
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

const isprime = localStorage.getItem("isprime");
if(isprime == 0) {
  const premium = document.getElementById("premium");
premium.addEventListener("click", (event) => {
  event.preventDefault();
  axios
    .get("http://localhost:5000/purchase/premiummembership", {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response.data);
      var options = {
        key: response.data.key_id,
        order_id: response.data.order.orderid,
        handler: async function (response) {
          if (response.razorpay_payment_id) {
            // Payment succeeded
            await axios.post(
              "http://localhost:5000/purchase/updatetransactionstatus",
              {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
              },
              { headers: { Authorization: token } }
            );
            showAlert("Payment Success: You are a premium user now");
            document.body.removeChild(premium);
          } else {
            // Payment failed
            showAlert("Payment Failed: Please try again.");
          }
        },
      };

      // Initialize the payment with Razorpay
      var rzp = new Razorpay(options);

      rzp.open();
    })
    .catch((err) => {
      console.log(err);
      showAlert("An error occurred. Please try again later.");
    });
});

function showAlert(message) {
  alert(message);
}


}

