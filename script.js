
const products = [
    {
        id: 1,
        name: "Headphone Bluetooth",
        price: 150000,
        category: "Elektronik",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 2,
        name: "Jam Tangan",
        price: 200000,
        category: "Aksesoris",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 3,
        name: "Sepatu Sneakers",
        price: 250000,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 4,
        name: "Kamera Digital",
        price: 850000,
        category: "Elektronik",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
    },
    {
        id: 5,
        name: "Tas Ransel",
        price: 175000,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },
    {
        id: 6,
        name: "Kacamata",
        price: 100000,
        category: "Aksesoris",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    }
];

let cart = [];
let selectedCategory = "Semua";

function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}

function renderProducts() {
    const container = document.getElementById("product-list");
    const keyword = document.getElementById("search").value.toLowerCase();

    const filtered = products.filter(product => {
        const matchName = product.name.toLowerCase().includes(keyword);
        const matchCategory = selectedCategory === "Semua" ||
            product.category === selectedCategory;

        return matchName && matchCategory;
    });

    container.innerHTML = "";

    if (filtered.length === 0) {
        container.innerHTML = "<p>Produk tidak ditemukan.</p>";
        return;
    }

    filtered.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}"
                     onerror="this.src='https://placehold.co/400x300?text=Produk'">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.category}</p>
                    <p class="price">${formatRupiah(product.price)}</p>
                    <button class="add-button"
                        onclick="addToCart(${product.id})">
                        + Tambah ke Keranjang
                    </button>
                </div>
            </div>
        `;
    });
}

function filterCategory(category) {
    selectedCategory = category;
    renderProducts();
}

function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
}

function changeQuantity(id, amount) {
    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    updateCart();
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    const container = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");
    const countElement = document.getElementById("cart-count");

    container.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>${formatRupiah(item.price)}</p>
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
                <button onclick="removeItem(${item.id})">Hapus</button>
            </div>
        `;
    });

    if (cart.length === 0) {
        container.innerHTML = "<p>Keranjang masih kosong.</p>";
    }

    totalElement.textContent = formatRupiah(total);
    countElement.textContent = count;
}

function toggleCart() {
    document.getElementById("cart-panel")
        .classList.toggle("active");
}

function checkout() {
    if (cart.length === 0) {
        alert("Keranjang belanja masih kosong!");
        return;
    }

    let total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const confirmation = confirm(
        "Apakah kamu yakin ingin membeli produk ini?\n\n" +
        "Total pembayaran: " + formatRupiah(total)
    );

    if (confirmation) {
        alert(
            "Terima kasih sudah berbelanja di SMART SHOP!\n" +
            "Pesanan berhasil dibuat (simulasi)."
        );

        cart = [];
        updateCart();
        toggleCart();
    }
}

renderProducts();
updateCart();

function checkout() {
    if (cart.length === 0) {
        alert("Keranjang belanja masih kosong!");
        return;
    }

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    document.getElementById("payment-total").textContent =
        formatRupiah(total);

    document.getElementById("payment-modal")
        .classList.add("active");

    document.getElementById("cart-panel")
        .classList.remove("active");
}

function closePayment() {
    document.getElementById("payment-modal")
        .classList.remove("active");
}

function showPaymentInfo() {
    const method = document.getElementById("payment-method").value;
    const info = document.getElementById("payment-info");

    const descriptions = {
        "Transfer BCA": "Pembayaran melalui transfer Bank BCA (simulasi).",
        "Transfer BRI": "Pembayaran melalui transfer Bank BRI (simulasi).",
        "Transfer BNI": "Pembayaran melalui transfer Bank BNI (simulasi).",
        "Transfer Mandiri": "Pembayaran melalui Bank Mandiri (simulasi).",
        "DANA": "Pembayaran menggunakan DANA (simulasi).",
        "OVO": "Pembayaran menggunakan OVO (simulasi).",
        "GoPay": "Pembayaran menggunakan GoPay (simulasi).",
        "QRIS": "Pembayaran menggunakan QRIS. Gunakan QR simulasi, bukan untuk transaksi sungguhan.",
        "COD": "Bayar pesanan ketika barang sampai di alamat tujuan."
    };

    info.textContent = descriptions[method] || "Silakan pilih metode pembayaran.";
}

function processPayment() {
    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();
    const method = document.getElementById("payment-method").value;

    if (!name || !phone || !address || !method) {
        alert("Mohon lengkapi semua data pembayaran!");
        return;
    }

    if (!/^08[0-9]{8,13}$/.test(phone)) {
        alert("Masukkan nomor HP Indonesia yang valid, diawali 08.");
        return;
    }

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const orderNumber = "SS" + Date.now().toString().slice(-8);

    alert(
        "PESANAN BERHASIL DIBUAT!\n\n" +
        "Nomor Pesanan: " + orderNumber + "\n" +
        "Nama: " + name + "\n" +
        "Metode: " + method + "\n" +
        "Total: " + formatRupiah(total) + "\n\n" +
        "Ini adalah simulasi pembayaran untuk tugas sekolah."
    );

    cart = [];
    updateCart();
    closePayment();

    document.getElementById("customer-name").value = "";
    document.getElementById("customer-phone").value = "";
    document.getElementById("customer-address").value = "";
    document.getElementById("payment-method").value = "";
    document.getElementById("payment-info").textContent = "";
}
