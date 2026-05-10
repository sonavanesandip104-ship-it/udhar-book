let customers = JSON.parse(localStorage.getItem("data")) || [];

show();

function addCustomer(){

let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let item = document.getElementById("item").value;
let price = Number(document.getElementById("price").value);

if(!name || !phone || !item || !price){
  alert("Fill all fields");
  return;
}

customers.push({
  name,
  phone,
  item,
  price,
  balance:price,
  date:new Date().toLocaleDateString()
});

localStorage.setItem("data",JSON.stringify(customers));

clearInputs();
show();

}

function show(){

let list = document.getElementById("list");
list.innerHTML="";

let total=0,paid=0;

customers.forEach(c=>{

total += c.balance;
if(c.balance==0) paid++;

list.innerHTML += `
<div class="customer">

<h3>👤 ${c.name}</h3>
<p>📅 ${c.date}</p>
<p>🛒 ${c.item}</p>
<p>💰 ₹${c.balance}</p>

<a target="_blank"
href="https://wa.me/91${c.phone}?text=${encodeURIComponent(
`Hi ${c.name}
Item: ${c.item}
Pending: ₹${c.balance}
Please pay soon`
)}">

<button>💬 WhatsApp</button>

</a>

</div>
`;

});

document.getElementById("totalCustomers").innerText=customers.length;
document.getElementById("pending").innerText="₹"+total;
document.getElementById("paid").innerText=paid;

}

function searchCustomer(){

let val = document.getElementById("search").value.toLowerCase();

document.querySelectorAll(".customer").forEach(c=>{
  c.style.display = c.innerText.toLowerCase().includes(val)
  ? "block":"none";
});

}

function clearInputs(){
document.getElementById("name").value="";
document.getElementById("phone").value="";
document.getElementById("item").value="";
document.getElementById("price").value="";
}
