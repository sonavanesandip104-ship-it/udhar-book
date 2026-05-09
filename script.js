function saveCustomer(){

let name=document.getElementById("name").value;
let amount=document.getElementById("amount").value;
let phone=document.getElementById("phone").value;

let customerList=document.getElementById("customerList");

customerList.innerHTML += `

<div class="customer">

<h3>${name}</h3>

<p>Pending Amount: ₹${amount}</p>

<a href="tel:${phone}">
<button>📞 Call Customer</button>
</a>

</div>

`;

}