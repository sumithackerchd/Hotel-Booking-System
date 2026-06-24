
document.getElementById("priceRange").addEventListener("input", function() {
    document.getElementById("priceValue").innerText = this.value;
});

document.getElementById("applyFilters").addEventListener("click", function() {
    console.log("Apply Filters button clicked!");

    let selectedStars = [...document.querySelectorAll(".star-filter:checked")].map(el => el.value);
    let selectedReviews = [...document.querySelectorAll(".review-filter:checked")].map(el => el.value);
    let selectedRooms = [...document.querySelectorAll(".room-filter:checked")].map(el => el.value);
    let maxPrice = document.getElementById("priceRange").value;
    let sortBy = document.getElementById("sortBy").value;

    let filters = {
        stars: selectedStars,
        reviews: selectedReviews,
        rooms: selectedRooms,
        maxPrice: maxPrice, 
        sortBy: sortBy
    };

    fetch("/filter-hotels", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filters)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Filtered Hotels Data:", data);

        let hotelContainer = document.querySelector(".row");
        hotelContainer.innerHTML = ""; 

        data.hotels.forEach(hotel => {
            let hotelHTML = `
                <div class="col-lg-4 col-md-6 col-12 mb-4">
                    <div class="card hotel-card shadow-sm">
                        <img src="/static/images/${hotel.image}" class="card-img-top" alt="${hotel.name}">
                        <div class="card-body">
                            <h5 class="card-title">
                                <a href="#" class="hotel-name">${hotel.name}</a>
                            </h5>
                            <p class="hotel-location">📍 <strong>Location:</strong> ${hotel.location}</p>
                            <p>💰 <strong>Price:</strong> ₹${hotel.price} per night</p>
                            <p>⭐ <strong>Rating:</strong> ${hotel.rating} (${hotel.reviews} reviews)</p>
                            <button class="btn btn-primary w-100">Check Availability</button>
                        </div>
                    </div>
                </div>
            `;
            hotelContainer.innerHTML += hotelHTML;
        });
    })
    .catch(error => console.error("Error fetching hotels:", error));
});

