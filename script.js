let customers =
JSON.parse(localStorage.getItem("customers")) || [];

showCustomers();

function toggleCustomers(){

let section =
document.getElementById("customerSection");

if(section.style.display == "none"){
  section.style.display = "block";
}
else{
  section.style.display = "none";
}

}

function saveCustomer(){

let name =
document.getElementById("name").value;

let item =
document.getElementById("item").value;

let price =
document.getElementById("price").value;

let phone =
document.getElementById("phone").value;

if(name=="" || item=="" || price=="" || phone==""){
  alert("Please Fill All Fields");
  return;
}

let customer = {

  name:name,
  item:item,
  price:Number(price),
  phone:phone,
  balance:Number(price),
  date:new Date().toLocaleDateString()

};

customers.push(customer);

localStorage.setItem(
"customers",
JSON.stringify(customers)
);

clearInputs();

showCustomers();

}

function showCustomers(){

let customerList =
document.getElementById("customerList");

customerList.innerHTML = "";

let total = 0;

let paid = 0;

customers.forEach((c,index)=>{

total += c.balance;

if(c.balance == 0){
  paid++;
}

customerList.innerHTML += `

<div class="customer">

<h2>👤 ${c.name}</h2>

<p><b>📅 Date:</b> ${c.date}</p>

<p><b>🛒 Items:</b> ${c.item}</p>

<p><b>💰 Total:</b> ₹${c.price}</p>

<p><b>📌 Pending:</b> ₹${c.balance}</p>

<p><b>📞 Phone:</b> ${c.phone}</p>

<div class="button-grid">

<a href="tel:${c.phone}">
<button class="small-btn call-btn">
📞 Call
</button>
</a>

<a target="_blank"
href="https://wa.me/91${c.phone}?text=${encodeURIComponent(
`🛒 Shop Udhar Reminder

👤 Customer: ${c.name}
📅 Date: ${c.date}
🛍 Items: ${c.item}
💰 Total: ₹${c.price}
📌 Pending: ₹${c.balance}

🙏 Please Pay Your Pending Amount`
)}">

<button class="small-btn whatsapp-btn">
💬 WhatsApp
</button>

</a>

<button class="small-btn pay-btn"
onclick="clearBalance(${index})">
✅ Paid
</button>

<button class="small-btn edit-btn"
onclick="editAmount(${index})">
✏ Edit
</button>

<button class="small-btn delete-btn"
onclick="deleteCustomer(${index})">
🗑 Delete
</button>

</div>

</div>

`;

});

document.getElementById("totalUdhar").innerHTML =
"💵 Total Shop Udhari: ₹" + total;

document.getElementById("totalCustomers").innerHTML =
customers.length;

document.getElementById("pendingAmount").innerHTML =
"₹" + total;

document.getElementById("paidCustomers").innerHTML =
paid;

}

function clearBalance(index){

customers[index].balance = 0;

localStorage.setItem(
"customers",
JSON.stringify(customers)
);

showCustomers();

}

function deleteCustomer(index){

let confirmDelete =
confirm("Delete Customer?");

if(confirmDelete){

customers.splice(index,1);

localStorage.setItem(
"customers",
JSON.stringify(customers)
);

showCustomers();

}

}

function editAmount(index){

let newAmount =
prompt("Enter New Amount");

if(newAmount != null){

customers[index].price =
Number(newAmount);

customers[index].balance =
Number(newAmount);

localStorage.setItem(
"customers",
JSON.stringify(customers)
);

showCustomers();

}

}

function searchCustomer(){

let input =
document.getElementById("search")
.value.toLowerCase();

let customerDivs =
document.getElementsByClassName("customer");

customers.forEach((c,index)=>{

let name = c.name.toLowerCase();

if(name.includes(input)){
  customerDivs[index].style.display =
  "block";
}
else{
  customerDivs[index].style.display =
  "none";
}

});

}

function clearInputs(){

document.getElementById("name").value = "";

document.getElementById("item").value = "";

document.getElementById("price").value = "";

document.getElementById("phone").value = "";

}
