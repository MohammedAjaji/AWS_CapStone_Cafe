// document.addEventListener("DOMContentLoaded", () => {
//     const apiUrl = "http://localhost:8080/cafe/find-id/3";

//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//             const apiDataElement = document.getElementById("api-data");
//             const coffeeNameElement = document.createElement("h2");
//             coffeeNameElement.textContent = data.coffeeName;
            
//             const ratingElement = document.createElement("p");
//             ratingElement.textContent = `Rating: ${data.rating} (${data.rating_count} ratings)`;
            
//             const linkElement = document.createElement("a");
//             linkElement.textContent = "View on Google Maps";
//             linkElement.href = data.url;
//             linkElement.target = "_blank";

//             apiDataElement.appendChild(coffeeNameElement);
//             apiDataElement.appendChild(ratingElement);
//             apiDataElement.appendChild(linkElement);
//         })
//         .catch(error => console.error("Error fetching API:", error));
// });
document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://test-692387542.eu-west-2.elb.amazonaws.com:8080/cafe/find-name/";

    // Get references to search elements
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const apiDataElement = document.getElementById("api-data");
    const rateForm = document.getElementById("rate-form");
    const rateResult = document.getElementById("rate-result");
    const rateContainer = document.querySelector(".rate-container");
    const arr = [];




    searchInput.addEventListener("keypress", (event) => {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("search-button").click();
        }
      });

    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim();

        if (searchTerm === "") {
            apiDataElement.textContent = "Please enter a search term.";
            return;
        }

        const searchUrl = apiUrl + encodeURIComponent(searchTerm);

        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                // Clear previous search results
                apiDataElement.innerHTML = "";

                if (data.length === 0) {
                    apiDataElement.textContent = "No results found.";
                    return;
                }

                data.forEach(coffeeShop => {
                    const coffeeNameElement = document.createElement("h2");
                    coffeeNameElement.textContent = coffeeShop.coffeeName;

                    const ratingElement = document.createElement("p");
                    ratingElement.textContent = `Rating: ${coffeeShop.rating} (${coffeeShop.rating_count} ratings)`;

                    const rateElement = document.createElement("button");
                    rateElement.textContent = "Rate";
                    rateElement.className = "right-aligned-button";

                    rateElement.addEventListener("click", () => {

                        //////////////////////////////////////////////////////////////////////////

                        const rateContainer = document.createElement("div");
                        rateContainer.className = "rate-container";
                        rateContainer.style.display = "none";

                        const rateHeader = document.createElement("h2");
                        rateHeader.textContent = `Rate: (${coffeeShop.coffeeName})` ;

                        const rateForm = document.createElement("form");
                        rateForm.id = "rate-form";

                        const ratingLabel = document.createElement("label");
                        ratingLabel.setAttribute("for", "rating");
                        ratingLabel.textContent = "Rating:";

                        const ratingInput = document.createElement("input");
                        ratingInput.type = "number";
                        ratingInput.id = "rating";
                        ratingInput.step = "1";
                        ratingInput.min = "1";
                        ratingInput.max = "5";
                        ratingInput.required = true;

                        const rateSubmitButton = document.createElement("button");
                        rateSubmitButton.type = "submit";
                        rateSubmitButton.textContent = "Submit Rating";

                        const rateResult = document.createElement("p");
                        rateResult.id = "rate-result";

                        rateForm.appendChild(ratingLabel);
                        rateForm.appendChild(ratingInput);
                        rateForm.appendChild(rateSubmitButton);
                        rateContainer.appendChild(rateHeader);
                        rateContainer.appendChild(rateForm);
                        rateContainer.appendChild(rateResult);

                        coffeeShopDiv.appendChild(rateElement);
                        coffeeShopDiv.appendChild(rateContainer); // Add the rate container after the rate button


                        //////////////////////////////////////////////////////////////////////////

                        
                        const selectedCoffeeShopId = coffeeShop.id;

                
                        if (selectedCoffeeShopId && !arr.includes(selectedCoffeeShopId)) {
                            arr.push(selectedCoffeeShopId);
                            for (let i = 0; i < arr.length; i++) {
                                console.log(arr[i]);
                            }

                            rateContainer.style.display = "block";
                        } else {
                            rateContainer.style.display = "none";
                        }

                        rateForm.addEventListener("submit", (event) => {
                            event.preventDefault();
                        
                            const selectedCoffeeShopId = coffeeShop.id;
                            const rating = ratingInput.value;
                        
                            if (!selectedCoffeeShopId || !rating) {
                                rateResult.textContent = "Please select a coffee shop and enter a rating.";
                                return;
                            }
                        
                            const apiUrl = `http://test-692387542.eu-west-2.elb.amazonaws.com:8080/cafe/rate-cafe/${selectedCoffeeShopId}/${rating}`;
                        
                            fetch(apiUrl, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })
                            .then(response => {
                                if (response.ok) {
                                    return response.text(); // Return plain text response
                                }
                                throw new Error("Failed to rate cafe");
                            })
                            .then(data => {
                                rateResult.textContent = data; // Display plain text response
                                // Optionally, you can reset the form fields after successful rating
                                rateForm.reset();
                            })
                            .catch(error => {
                                rateResult.textContent = "Error rating cafe.";
                                console.error("Error rating cafe:", error);
                            });
                        });
    
                    });

                    
                    
                    const linkElement = document.createElement("a");
                    linkElement.textContent = "View on Google Maps                                                         ";
                    linkElement.href = coffeeShop.url;
                    linkElement.target = "_blank";

                    const coffeeShopDiv = document.createElement("div");

                    coffeeShopDiv.appendChild(coffeeNameElement);
                    coffeeShopDiv.appendChild(ratingElement);
                    coffeeShopDiv.appendChild(linkElement);
                    coffeeShopDiv.appendChild(rateElement);


                    apiDataElement.appendChild(coffeeShopDiv);
                });
            })
            .catch(error => console.error("Error fetching API:", error));
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const coffeeShopsDropdown = document.getElementById("coffee-shops-dropdown");
    const rateContainer = document.querySelector(".rate-container");
    const rateForm = document.getElementById("rate-form");
    const rateResult = document.getElementById("rate-result");

    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim();
        
        if (!searchTerm) {
            return;
        }

        const apiUrl = `http://test-692387542.eu-west-2.elb.amazonaws.com:8080/cafe/find-name/${encodeURIComponent(searchTerm)}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                coffeeShopsDropdown.innerHTML = '<option value="">Select a coffee shop</option>';
                data.forEach(coffeeShop => {
                    const option = document.createElement("option");
                    option.value = coffeeShop.id;
                    option.textContent = coffeeShop.coffeeName;
                    coffeeShopsDropdown.appendChild(option);
                });

                coffeeShopsDropdown.removeAttribute("disabled");
            })
            .catch(error => console.error("Error fetching API:", error));
    });

    coffeeShopsDropdown.addEventListener("change", () => {
        const selectedCoffeeShopId = coffeeShopsDropdown.value;

        if (selectedCoffeeShopId) {
            rateContainer.style.display = "block";
        } else {
            rateContainer.style.display = "none";
        }
    });

    rateForm.addEventListener("submit", event => {
        event.preventDefault();
    
        const selectedCoffeeShopId = coffeeShopsDropdown.value;
        const rating = document.getElementById("rating").value;
    
        if (!selectedCoffeeShopId || !rating) {
            rateResult.textContent = "Please select a coffee shop and enter a rating.";
            return;
        }
    
        const apiUrl = `http://test-692387542.eu-west-2.elb.amazonaws.com:8080/cafe/rate-cafe/${selectedCoffeeShopId}/${rating}`;
    
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            if (response.ok) {
                return response.text(); // Return plain text response
            }
            throw new Error("Failed to rate cafe");
        })
        .then(data => {
            rateResult.textContent = data; // Display plain text response
            // Optionally, you can reset the form fields after successful rating
            rateForm.reset();
        })
        .catch(error => {
            rateResult.textContent = "Error rating cafe.";
            console.error("Error rating cafe:", error);
        });
    });
    
});


