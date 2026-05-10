let customers =
JSON.parse(localStorage.getItem("data")) || [];

show();

/* ADD CUSTOMER */

function addCustomer(){

let name =
document.getElementById("name").value.trim();

let phone =
document.getElementById("phone").value.trim();

let item =
document.getElementById("item").value.trim();

let price =
Number(document.getElementById("price").value);

if(name === "" || phone === "" || item === "" || !price){

  alert("Please Fill All Fields");

  return;
}

/* EXISTING CUSTOMER */

let existing =
customers.find(c => c.phone === phone);

if(existing){

  existing.items.push({

    item:item,
    price:price,
    date:new Date().toLocaleDateString(),
    paid:false

  });

  existing.balance += price;

}
else{

  customers.push({

    name:name,
    phone:phone,

    items:[
      {
        item:item,
        price:price,
        date:new Date().toLocaleDateString(),
        paid:false
      }
    ],

    balance:price

  });

}

/* SAVE */

localStorage.setItem(
"data",
JSON.stringify(customers)
);

/* CLEAR INPUTS */

clearInputs();

/* REFRESH UI */

show();

}

/* SHOW CUSTOMERS */

function show(){

let list =
document.getElementById("list");

list.innerHTML = "";

let total = 0;

customers.forEach((c,index)=>{

total += c.balance;

let itemsHTML = "";

c.items.forEach((i,itemIndex)=>{

itemsHTML += `

<div class="item-box">

<p>📅 ${i.date}</p>

<p>🛒 ${i.item}</p>

<p>💰 ₹${i.price}</p>

<p class="${i.paid ? 'paid':'pending'}">

${i.paid ? '✅ Paid':'❌ Pending'}

</p>

<button onclick="clearItem(${index},${itemIndex})">

✅ Clear Payment

</button>

</div>

`;

});

list.innerHTML += `

<div class="customer">

<h2>👤 ${c.name}</h2>

<p>📞 ${c.phone}</p>

${itemsHTML}

<h3>💵 Total Pending: ₹${c.balance}</h3>

<a target="_blank"
href="https://wa.me/91${c.phone}?text=${encodeURIComponent(
`📒 Udhar Reminder

👤 ${c.name}

Pending Amount: ₹${c.balance}

Please Pay Your Udhari`
)}">

<button class="whatsapp-btn">

💬 WhatsApp Reminder

</button>

</a>

</div>

`;

});

/* DASHBOARD */

document.getElementById("pending").innerText =
"₹" + total;

document.getElementById("totalCustomers").innerText =
customers.length;

}

/* CLEAR PAYMENT */

function clearItem(customerIndex,itemIndex){

let item =
customers[customerIndex].items[itemIndex];

if(item.paid){

  alert("Already Paid");

  return;
}

item.paid = true;

customers[customerIndex].balance -= item.price;

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
? "block"
: "none";

});

}

/* CLEAR INPUTS */

function clearInputs(){

document.getElementById("name").value = "";

document.getElementById("phone").value = "";

document.getElementById("item").value = "";

document.getElementById("price").value = "";

}
