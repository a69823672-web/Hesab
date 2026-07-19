let products = JSON.parse(localStorage.getItem("amirali_products")) || [];

let editId = null;


const modal = document.getElementById("modal");
const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");
const search = document.getElementById("search");


// باز کردن فرم

addBtn.onclick = () => {

    editId = null;

    clearForm();

    modal.style.display = "block";

};


// بستن فرم

closeBtn.onclick = () => {

    modal.style.display = "none";

};



// ذخیره

saveBtn.onclick = () => {


    let product = {

        id: editId || Date.now(),

        name:
        document.getElementById("name").value,

        count:
        Number(document.getElementById("count").value),

        price:
        Number(document.getElementById("price").value),

        date:
        document.getElementById("date").value,

        time:
        document.getElementById("time").value,

        note:
        document.getElementById("note").value

    };



    if(editId){

        products = products.map(item =>
            item.id === editId ? product : item
        );


    }else{


        products.push(product);


    }



    saveData();

    render();


    modal.style.display="none";


};





// نمایش محصولات


function render(){


let box = document.getElementById("products");

box.innerHTML="";


let total=0;



products.forEach(item=>{


let sum = item.count * item.price;


total += sum;



box.innerHTML += `


<div class="product">


<h2>
🛒 ${item.name}
</h2>


<div class="product-info">


<div>
🔢 تعداد:
${item.count}
</div>


<div>
💰 قیمت:
${format(item.price)}
</div>


<div>
💵 مبلغ:
${format(sum)}
</div>


<div>
📅 ${item.date}
</div>


<div>
🕒 ${item.time}
</div>


<div>
📝 ${item.note || "بدون توضیح"}
</div>


</div>



<div class="actions">


<button class="edit"
onclick="editProduct(${item.id})">

✏️ ویرایش

</button>


<button class="delete"
onclick="deleteProduct(${item.id})">

🗑 حذف

</button>


</div>


</div>


`;



});



document.getElementById("totalPrice").innerText =
format(total);



document.getElementById("totalItems").innerText =
products.length;


}




// حذف


function deleteProduct(id){


if(confirm("این خرید حذف شود؟")){


products =
products.filter(item=>item.id !== id);


saveData();

render();


}


}




// ویرایش


function editProduct(id){


let item =
products.find(p=>p.id===id);


editId=id;


document.getElementById("name").value=item.name;

document.getElementById("count").value=item.count;

document.getElementById("price").value=item.price;

document.getElementById("date").value=item.date;

document.getElementById("time").value=item.time;

document.getElementById("note").value=item.note;


modal.style.display="block";


}





// جستجو


search.oninput = ()=>{


let text =
search.value.toLowerCase();



document.querySelectorAll(".product")
.forEach(card=>{


if(card.innerText.toLowerCase().includes(text)){

card.style.display="block";

}else{

card.style.display="none";

}


});


};





// ذخیره


function saveData(){

localStorage.setItem(
"amirali_products",
JSON.stringify(products)
);

}





// پاک کردن فرم


function clearForm(){

document.querySelectorAll(".modal-box input, textarea")
.forEach(input=>input.value="");


}





// فرمت پول


function format(number){

return number.toLocaleString("fa-IR");

}





// تاریخ امروز


document.getElementById("todayDate").innerText =
new Date().toLocaleDateString("fa-IR");




// شروع برنامه

render();
