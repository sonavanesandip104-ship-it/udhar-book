import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
getFirestore,
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Firebase Config (replace your keys)
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let customers = [];

window.addCustomer = async function(){

let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let item = document.getElementById("item").value;
let price = Number(document.getElementById("price").value);

if(!name || !phone || !item || !price){
  alert("Fill all fields");
  return;
}

await addDoc(collection(db,"customers"),{
  name,
  phone,
  items:[{item,price}],
  total:price,
  balance:price,
  date:new Date().toLocaleDateString(),
  paid:false
});

load();
}

async function load(){

let snap = await getDocs(collection(db,"customers"));

customers = [];

snap.forEach(doc=>{
  customers.push(doc.data());
});

render();
}

function render(){

let list = document.getElementById("list");
list.innerHTML="";

let total=0,paid=0;

customers.forEach(c=>{

total += c.balance;
if(c.paid) paid++;

list.innerHTML += `
<div class="customer">

<h3>👤 ${c.name}</h3>
<p>📅 ${c.date}</p>
<p>💰 ₹${c.balance}</p>

<a target="_blank"
href="https://wa.me/91${c.phone}?text=${encodeURIComponent(
`Hi ${c.name}
Pending: ₹${c.balance}
Please pay soon`
)}">

<button>💬 WhatsApp</button>

</a>

</div>
`;

});

document.getElementById("pending").innerText="₹"+total;
document.getElementById("totalCustomers").innerText=customers.length;
document.getElementById("paid").innerText=paid;

}

window.search = function(){

let val = document.getElementById("search").value.toLowerCase();

document.querySelectorAll(".customer").forEach(el=>{
  el.style.display = el.innerText.toLowerCase().includes(val)
  ? "block":"none";
});

}

load();
