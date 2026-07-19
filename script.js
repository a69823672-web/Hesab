let products = JSON.parse(localStorage.getItem("products")) || [];

const modal = document.getElementById("modal");
const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");

addBtn.onclick = () => {
    modal.style.display = "block";
};

closeBtn.onclick = () => {
    modal.style.display = "none";
};

saveBtn.onclick = () => {

    const product = {
        id: Date.now(),
        name: document.getElementById("name").value,
        count: document.getElementById("count").value,
        price: document.getElementById("price").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value
    };

    products.push(product);

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    renderProducts();

    modal.style.display = "none";
};

function renderProducts(){

    let html = "";
    let total = 0;

    products.forEach(item => {

        let sum = item.count * item.price;

        total += sum;

        html += `
        <tr>
            <td>${item.name}</td>
            <td>${item.count}</td>
            <td>${item.price}</td>
            <td>${sum}</td>
            <td>${item.date}</td>
            <td>${item.time}</td>
            <td>
                <button onclick="deleteItem(${item.id})">
                    حذف
                </button>
            </td>
        </tr>
        `;
    });

    document.getElementById("productList").innerHTML = html;
    document.getElementById("totalPrice").innerText = total;
}

function deleteItem(id){

    products = products.filter(
        item => item.id !== id
    );

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    renderProducts();
}

renderProducts();
