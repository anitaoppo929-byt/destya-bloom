
/* =========================
   BLOOM GALLERY
   MAIN JAVASCRIPT
========================= */

// 1. DARK MODE DAN LIGHT MODE

function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("bloomTheme", isDark ? "dark" : "light");

    updateThemeButton();
}

function updateThemeButton() {
    const button = document.querySelector(".theme-btn");

    if (button) {
        button.textContent =
            document.body.classList.contains("dark-mode")
            ? "☀️"
            : "🌙";
    }
}

// Memuat tema yang sebelumnya dipilih
document.addEventListener("DOMContentLoaded", function () {

    if (localStorage.getItem("bloomTheme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    updateThemeButton();

    initializeGallery();
    initializeContact();
});


// 2. DATA KOLEKSI BUNGA


const flowers = [
    {
        name: "Red Rose",
        category: "mawar",
        image: "images/Red Rose.jpeg",
        description: "Bunga mawar merah melambangkan cinta dan keindahan."
    },
    {
        name: "Pink Rose",
        category: "mawar",
        image: "images/Pink Rose.jpg",
        description: "Mawar pink memiliki warna lembut dan cantik."
    },
    {
        name: "Tulip",
        category: "tulip",
        image: "images/Tulip.jpg",
        description: "Bunga tulip memiliki bentuk yang elegan."
    },
    {
        name: "Sunflower",
        category: "matahari",
        image: "images/Sunflower.jpg",
        description: "Bunga matahari memiliki warna kuning yang cerah."
    },
    {
        name: "Orchid",
        category: "anggrek",
        image: "images/Orchid.jpg",
        description: "Bunga anggrek memiliki bentuk yang unik."
    },
    {
        name: "Lavender",
        category: "lavender",
        image: "images/Lavender.jpg",
        description: "Lavender memiliki warna ungu yang indah."
    }
];



// 3. MENAMPILKAN KOLEKSI BUNGA

const galleryContainer = document.getElementById("galleryContainer");

function displayFlowers(data) {

    if (!galleryContainer) return;

    galleryContainer.innerHTML = "";

    data.forEach(function(flower) {

        const card = document.createElement("div");

        card.className = "flower-card";

        card.innerHTML = `
            <img src="${flower.image}" alt="${flower.name}">
            <div class="card-info">
                <h3>${flower.name}</h3>
                <p>${flower.description}</p>
                <button class="btn detail-btn" type="button">
                    Lihat Detail
                </button>
            </div>
        `;

        card.querySelector(".detail-btn").addEventListener("click", function() {
            openModal(flower);
        });

        card.querySelector("img").addEventListener("click", function() {
            openModal(flower);
        });

        galleryContainer.appendChild(card);
    });

    const emptyMessage = document.getElementById("emptyMessage");

    if (emptyMessage) {
        emptyMessage.style.display =
            data.length === 0 ? "block" : "none";
    }
}


// 4. FILTER KATEGORI BUNGA

function initializeGallery() {

    if (!galleryContainer) return;

    displayFlowers(flowers);

    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            filterButtons.forEach(function(btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const category = button.dataset.category;

            if (category === "all") {
                displayFlowers(flowers);
            } else {
                const filteredFlowers = flowers.filter(function(flower) {
                    return flower.category === category;
                });

                displayFlowers(filteredFlowers);
            }

        });

    });


    // 5. PENCARIAN BUNGA

    const searchInput = document.getElementById("searchFlower");

    searchInput.addEventListener("input", function() {

        const keyword = searchInput.value.toLowerCase();

        const activeButton = document.querySelector(".filter-btn.active");

        const category = activeButton
            ? activeButton.dataset.category
            : "all";

        const results = flowers.filter(function(flower) {

            const matchName = flower.name.toLowerCase().includes(keyword);

            const matchCategory =
                category === "all" || flower.category === category;

            return matchName && matchCategory;

        });

        displayFlowers(results);

    });

}


// 6. POPUP DETAIL GAMBAR

function openModal(flower) {

    const modal = document.getElementById("flowerModal");

    if (!modal) return;

    document.getElementById("modalImage").src = flower.image;
    document.getElementById("modalTitle").textContent = flower.name;
    document.getElementById("modalDescription").textContent =
        flower.description;

    modal.classList.add("show");

}

function closeModal() {

    const modal = document.getElementById("flowerModal");

    if (modal) {
        modal.classList.remove("show");
    }

}


// Menutup popup ketika area luar diklik

document.addEventListener("click", function(event) {

    const modal = document.getElementById("flowerModal");

    if (modal && event.target === modal) {
        closeModal();
    }

});

// Menutup popup dengan tombol Escape

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeModal();
    }

});


// 7. VALIDASI FORM CONTACT

function initializeContact() {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {

            alert("Semua kolom harus diisi!");

            return;

        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Masukkan alamat email yang valid!");

            return;

        }

        alert(
            "Terima kasih, " + name +
            "! Formulir berhasil divalidasi."
        );

        contactForm.reset();

    });

}
