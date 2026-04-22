const API = "http://localhost:5000/api/transactions";

const list = document.getElementById("list");
const balance = document.getElementById("balance");
const form = document.getElementById("form");

// get data
async function getData() {
  const res = await fetch(API);
  const data = await res.json();

  list.innerHTML = "";
  let total = 0;

  data.forEach(item => {
    total += item.amount;

    const li = document.createElement("li");
   li.innerHTML = `
  <span style="color:${item.amount > 0 ? 'green' : 'red'}">
    ${item.text} ₹${item.amount > 0 ? '+' : ''}${item.amount}
  </span>
  <button onclick="deleteItem('${item._id}')">X</button>
`;
    list.appendChild(li);
  });

  balance.innerText = total;
}

// add data
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = document.getElementById("text").value;
  const amount = document.getElementById("amount").value;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text, amount: +amount })
  });

  form.reset();
  getData();
});

// delete
async function deleteItem(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });
  getData();
}

// load
getData();
