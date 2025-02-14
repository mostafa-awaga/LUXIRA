document.addEventListener("DOMContentLoaded", async function () {
  const apiURL = "https://orientonline.info/api/products";

  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error("Failed to fetch products");

    const products = await response.json();

    displayProducts(products, "offers-container");
    displayProducts(products, "recommended-container");
    displayProducts(products, "products-container");
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

function displayProducts(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("card");

    productCard.innerHTML = `
            <div class="image-container">
                <img src="${product.img}" alt="${product.name}" />
                <div class="favorite-icon">
                    <i class="fas fa-heart"></i>
                </div>
            </div>
            <h2>${product.name}</h2>
            <div class="info">
                <del>$${(product.old_price || product.price * 1.2).toFixed(2)}</del>
                <span>$${product.price.toFixed(2)}</span>
                <img src="image/rate.webp" alt="rate" />
            </div>
            <button type="button" class="search-btn btn" onclick="addToCart(${product.id})">Add To Cart</button>
        `;

    container.appendChild(productCard);
  });
}

function addToCart(productId) {
  alert(`Product ${productId} added to cart!`);
}


