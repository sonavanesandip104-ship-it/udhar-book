let customers =
JSON.parse(localStorage.getItem("data")) || [];

show();

/* ADD CUSTOMER */

function addCustomer(){

let name =
document.getElementById("name").value;

let phone =
document.getElementById("phone").value;

if(!name || !phone){

alert("Fill all fields");

return;

}

let existing =
customers.find(c => c.phone == phone);

if(existing){

alert("Customer Already Exists");

return;

}

customers.push({

name:name,
phone:phone,
entries:[],
balance:0

});

localStorage.setItem(
"data",
JSON.stringify(customers)
);

show();

}

/* SHOW */

function show(){

let list =
document.getElementById("list");

list.innerHTML = "";

let total = 0;

customers.forEach((c,index)=>{

total += c.balance;

let entriesHTML = "";

c.entries.forEach(e=>{

entriesHTML += `

<div class="entry">

📅 ${e.date}
<br>
🛒 ${e.item}
<br>
💰 ₹${e.price}

</div>

`;

});

list.innerHTML += `

<div class="customer">

<h2>👤 ${c.name}</h2>

<p>📞 ${c.phone}</p>

<h3>💵 Pending ₹${c.balance}</h3>

<button onclick="addEntry(${index})">

➕ Add Daily Entry

</button>

<button onclick="receivePayment(${index})">

💵 Receive Payment

</button>

<a target="_blank"
href="https://wa.me/91${c.phone}?text=${encodeURIComponent(
`📒 Udhar Reminder

Pending Amount ₹${c.balance}`
)}">

<button>

💬 WhatsApp Reminder

</button>

</a>

${entriesHTML}

</div>

`;

});

document.getElementById("pending").innerText =
"₹"+total;

document.getElementById("totalCustomers").innerText =
customers.length;

}

/* DAILY ENTRY */

function addEntry(index){

let item =
prompt("Enter Item");

let price =
prompt("Enter Price");

if(item && price){

customers[index].entries.push({

item:item,
price:Number(price),
date:new Date().toLocaleDateString()

});

customers[index].balance += Number(price);

localStorage.setItem(
"data",
JSON.stringify(customers)
);

show();

}

}

/* RECEIVE PAYMENT */

function receivePayment(index){

let amount =
prompt("Enter Received Amount");

amount = Number(amount);

if(!amount || amount <= 0){

alert("Invalid Amount");

return;

}

if(amount > customers[index].balance){

alert("Amount Greater Than Pending");

return;

}

customers[index].balance -= amount;

localStorage.setItem(
"data",
JSON.stringify(customers)
);

show();

}

/* SEARCH */

function searchCustomer(){

let value =
document.getElementById("search")
.value.toLowerCase();

document.querySelectorAll(".customer")
.forEach(c=>{

c.style.display =
c.innerText.toLowerCase().includes(value)
? "block":"none";

});

}
