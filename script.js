document.addEventListener("DOMContentLoaded", () => {

    /* ================= HERO SLIDER ================= */
    const slides = document.querySelectorAll(".hero-slide");
    const indicators = document.querySelectorAll(".indicator");
    const heroPrev = document.querySelector(".hero-prev");
    const heroNext = document.querySelector(".hero-next");
    const titleEl = document.getElementById("hero-title");
    const textEl = document.getElementById("hero-text");

    if (slides.length > 0) {
        let currentIndex = 0;
        let interval;

        const goToSlide = (index) => {
            slides.forEach(s => s.classList.remove("active"));
            indicators.forEach(d => d.classList.remove("active"));
            titleEl.classList.remove("text-fade");
            textEl.classList.remove("text-fade");

            currentIndex = (index + slides.length) % slides.length;

            slides[currentIndex].classList.add("active");
            indicators[currentIndex].classList.add("active");
            titleEl.textContent = slides[currentIndex].dataset.title;
            textEl.textContent = slides[currentIndex].dataset.text;

            void titleEl.offsetWidth; // Trigger reflow
            titleEl.classList.add("text-fade");
            textEl.classList.add("text-fade");
        };

        const startAuto = () => {
            interval = setInterval(() => goToSlide(currentIndex + 1), 5000);
        };

        const resetAuto = () => {
            clearInterval(interval);
            startAuto();
        };

        indicators.forEach((dot, i) => {
            dot.addEventListener("click", () => { goToSlide(i); resetAuto(); });
        });

        if (heroPrev) heroPrev.addEventListener("click", () => { goToSlide(currentIndex - 1); resetAuto(); });
        if (heroNext) heroNext.addEventListener("click", () => { goToSlide(currentIndex + 1); resetAuto(); });

        goToSlide(0);
        startAuto();
    }
    /* ================= ACCOMMODATION DATA ================= */
    const accData = {
        puri: {
            title: "Puri",
            desc: "Luxury beachside hotel offering premium rooms and modern facilities.",
            images: ["images/puri1.jpg", "images/puri2.jpg", "images/puri3.jpg", "images/puri4.jpg"]
        },
        bhubaneswar: {
            title: "Bhubaneswar",
            desc: "Premium business hotel located in the heart of the city.",
            images: ["images/bbsr1.jpg", "images/bbsr2.jpg", "images/bbsr3.jpg", "images/bbsr4.jpg"]
        },
        paradeep: {
            title: "Paradeep",
            desc: "Comfortable stay near port and industrial zone.",
            images: ["images/paradeep1.jpg", "images/paradeep2.jpg", "images/paradeep3.jpg", "images/paradeep4.jpg"]
        },
        joda: {
            title: "Joda",
            desc: "Peaceful stay surrounded by nature and hills.",
            images: ["images/joda1.jpg", "images/joda2.jpg", "images/puri3.jpg", "images/bbsr4.jpg"]
        }
    };

    const cityCards = document.querySelectorAll(".city-card");
    cityCards.forEach(card => {
        card.addEventListener("click", () => {
            cityCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            const city = accData[card.dataset.city];
            document.getElementById("city-title").innerText = city.title;
            document.getElementById("city-desc").innerText = city.desc;
            city.images.forEach((imgSrc, index) => {
                const imgEl = document.getElementById(`img${index + 1}`);
                if (imgEl) imgEl.src = imgSrc;
            });
        });
    });

    /* ================= MICE SLIDER ================= */
    /* ================= MICE SLIDER ================= */
const miceData = {
    bhubaneswar: [
        { title: "Deewan E Aam", img: "images/Dewan.jpg" },
        { title: "Deewan E Khas", img: "images/dewan.jpg" },
        { title: "Ruby", img: "images/Ruby-Hall.jpg" },
        { title: "East Side Hall", img: "images/east.jpg" },
        { title: "Emerald", img: "images/rajdarbar.jpg" },
        { title: "Crystal", img: "images/crystal.jpg" }
    ],
    puri: [
        { title: "Sea View Hall", img: "images/puri1.jpg" },
        { title: "Royal Hall", img: "images/puri2.jpg" }
    ],
    paradeep: [{ title: "Ocean Hall", img: "images/paradeep1.jpg" }],
    joda: [{ title: "Hill View Hall", img: "images/joda1.jpg" }]
};

const miceSlider = document.getElementById("miceSlider");
const micePrev = document.querySelector(".mice-arrow.prev");
const miceNext = document.querySelector(".mice-arrow.next");

if (miceSlider && micePrev && miceNext) {
    let sliderIndex = 0;
    let currentCity = "bhubaneswar";

    const updateSlider = () => {
        const card = document.querySelector(".mice-card");
        if (!card) return;
        const gap = 25;
        const cardWidth = card.offsetWidth + gap;
        miceSlider.style.transform = `translateX(-${sliderIndex * cardWidth}px)`;
    };

    const renderSlider = (city) => {
        sliderIndex = 0; // Reset position on city change
        miceSlider.innerHTML = miceData[city].map(item => `
            <div class="mice-card">
                <img src="${item.img}" alt="${item.title}">
                <div class="mice-info">
                    <h4>${item.title}</h4>
                    <a href="#">Know More →</a>
                </div>
            </div>
        `).join('');
        updateSlider();
    };

    miceNext.addEventListener("click", () => {
        const visibleCards = window.innerWidth < 768 ? 1 : 3; // Responsive check
        const maxIndex = miceData[currentCity].length - visibleCards;
        if (sliderIndex < maxIndex) {
            sliderIndex++;
            updateSlider();
        }
    });

    micePrev.addEventListener("click", () => {
        if (sliderIndex > 0) {
            sliderIndex--;
            updateSlider();
        }
    });

    document.querySelectorAll(".mice-city").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".mice-city.active")?.classList.remove("active");
            btn.classList.add("active");
            currentCity = btn.dataset.city;
            renderSlider(currentCity);
        });
    });

    window.addEventListener("resize", updateSlider);
    renderSlider(currentCity); // Initial Load
}
/* ================= RESTAURANT SLIDER ================= */
const resNext = document.querySelector('.dine-section .next-btn');
const resPrev = document.querySelector('.dine-section .prev-btn');
const resSlider = document.querySelector('.restaurant-slider');

if (resSlider && resNext && resPrev) {
    resNext.addEventListener('click', () => {
        // Find the width of one card
        const card = resSlider.querySelector('.col-md-6');
        const scrollAmount = card.offsetWidth + 24; // Width + Bootstrap gap
        
        resSlider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    resPrev.addEventListener('click', () => {
        const card = resSlider.querySelector('.col-md-6');
        const scrollAmount = card.offsetWidth + 24;
        
        resSlider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
}
const hotelData = [
        { 
            title: "SWIMMING POOL", 
            desc: "Open Air swimming pool exclusively for hotel guests offering maximum privacy and lots of sunshine. Take a refreshing dip in the heated swimming pool, In addition, our health club offers a variety of services along with Steam, Sauna, and Jacuzzi.", 
            image: "images/swimming-pool.jpg" 
        },
        { 
            title: "FITNESS CENTER", 
            desc: "Keep up with your fitness routine in our state-of-the-art gym featuring the latest cardio and strength training equipment.", 
            image: "images/gym.jpg" 
        },
        { 
            title: "FINE DINING", 
            desc: "Savor exquisite local and international flavors at our signature restaurant, designed for both casual meals and formal celebrations.", 
            image: "images/restaurant.jpg" 
        },
        { 
            title: "GAMES ROOM", 
            desc: "Unwind with a game of billiards or table tennis in our modern recreation area, perfect for family bonding or casual relaxation.", 
            image: "images/club.jpg" 
        },
        { 
            title: "EVENT PLAZA", 
            desc: "Our open-air courtyard is ideal for cocktail parties, social gatherings, and relaxing evenings under the stars.", 
            image: "images/emp-puri.jpg" 
        },
        { 
            title: "LUXURY SUITES", 
            desc: "Experience unparalleled comfort in our elegantly appointed rooms, featuring premium bedding and modern amenities.", 
            image: "images/lawn-puri.jpg" 
        },
        { 
            title: "BUSINESS HUB", 
            desc: "A professional environment equipped with high-speed internet and quiet workspaces for the modern business traveler.", 
            image: "images/bus.jpg" 
        },
        { 
            title: "SPA & WELLNESS", 
            desc: "Indulge in a range of therapeutic treatments designed to rejuvenate your body and soul in a tranquil atmosphere.", 
            image: "images/spa.jpg" 
        }
    ];

    const displayImage = document.getElementById("mainImage");
    const displayTitle = document.getElementById("mainTitle");
    const displayDesc  = document.getElementById("mainDesc");
    const tabsWrapper  = document.getElementById("tabsList");

    // Build the Navigation Tabs
    hotelData.forEach((item, index) => {
        const tabDiv = document.createElement("div");
        tabDiv.className = "experience-tab";
        tabDiv.innerHTML = `<img src="${item.image}" alt="${item.title}">`;
        tabDiv.onclick = () => updateDisplay(index);
        tabsWrapper.appendChild(tabDiv);
    });

    const allTabs = document.querySelectorAll(".experience-tab");

    function updateDisplay(index) {
        // Fade effect
        displayImage.style.opacity = 0.4;
        
        setTimeout(() => {
            displayImage.src = hotelData[index].image;
            displayTitle.textContent = hotelData[index].title;
            displayDesc.textContent = hotelData[index].desc;
            displayImage.style.opacity = 1;
        }, 200);

        // Update active class
        allTabs.forEach(t => t.classList.remove("active"));
        allTabs[index].classList.add("active");
    }

    // Scroll Logic: 108px = 90px (tab) + 18px (gap)
    const stepSize = 108;

    document.getElementById("btnNext").onclick = () => {
        tabsWrapper.scrollLeft += stepSize;
    };

    document.getElementById("btnPrev").onclick = () => {
        tabsWrapper.scrollLeft -= stepSize;
    };

    // Initial load
    updateDisplay(0);
});
  const modal = document.getElementById("reserveModal");
  const closeBtn = document.querySelector(".close-btn");
  const reserveBtns = document.querySelectorAll(".reserve-btn");
  const citySelect = document.getElementById("citySelect");
  const restaurantSelect = document.getElementById("restaurantSelect");

  // 🔹 Restaurants per city
  const restaurantData = {
    Bhubaneswar: [
      "Bandhej",
      "Salt N Pepper",
      "Deli Cafe"
    ],
    Puri: [
      "Coffee Shop",
      "Pearl Restaurant"
    ],
    Paradeep: [
      "Sura Bar",
      "Deli Cafe",
      "Big Shot Bar",
      "Mosaic Restaurant"
    ],
    Joda: [
      "Joda Signature"
    ]
  };

  // Load restaurants when city changes
  function loadRestaurants(city, selected = "") {
    restaurantSelect.innerHTML =
      '<option value="">Select Restaurant</option>';

    if (!restaurantData[city]) return;

    restaurantData[city].forEach(rest => {
      const option = document.createElement("option");
      option.value = rest;
      option.textContent = rest;
      restaurantSelect.appendChild(option);
    });

    if (selected) restaurantSelect.value = selected;
  }

  // Open modal from card
  reserveBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const city = btn.dataset.city;
      const restaurant = btn.dataset.restaurant;

      modal.style.display = "block";
      document.body.style.overflow = "hidden";

      citySelect.value = city;
      loadRestaurants(city, restaurant);
    });
  });

  // Manual city change
  citySelect.addEventListener("change", () => {
    loadRestaurants(citySelect.value);
  });

  // Close modal
  closeBtn.onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };
