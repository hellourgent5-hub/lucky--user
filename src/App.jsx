// ======================================================================
// !!! CRITICAL STEP: REPLACE THE PLACEHOLDER BELOW WITH YOUR ACTUAL RENDER BACKEND URL !!!
// ======================================================================
const API_BASE_URL = 'https://lucky-backend-xh9.onrender.com'; // <--- CHANGE THIS
// ======================================================================

const PRODUCTS_ENDPOINT = `${API_BASE_URL}/api/products`; 
const productGrid = document.querySelector('.product-grid');

/**
 * Creates the HTML string for a single product card.
 * @param {object} product - The product data object.
 */
function createProductCardHTML(product) {
    // We use dummy/placeholder values if the actual data is missing for safety
    const price = product.price || 0.00;
    const oldPrice = product.oldPrice || price * 1.25; // Example: 25% higher if oldPrice is missing
    const rating = product.rating || 4.5;
    
    return `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${product.imageUrl || 'https://via.placeholder.com/150'}" alt="${product.name || 'Product'}" class="product-image">
            </div>
            <div class="product-details">
                <div class="product-rating">
                    <span class="star-icon">★</span> 
                    <span class="rating-value">${rating.toFixed(1)}</span>
                </div>
                <div class="product-name">${product.name || 'Product Name'}</div>
                <div class="product-price">
                    <span class="current-price">$${price.toFixed(2)}</span>
                    <span class="old-price">$${oldPrice.toFixed(2)}</span>
                </div>
            </div>
            <button class="add-to-cart-button" data-product-id="${product.id}">+</button>
        </div>
    `;
}

/**
 * Attaches simple click handlers to the "Add to Cart" buttons.
 */
function attachCartListeners() {
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.currentTarget.dataset.productId;
            alert(`Product ${productId} added to cart! (This needs real logic)`);
            // You will replace this 'alert' with code that sends data to your backend
        });
    });
}

/**
 * Fetches products from the backend and renders them in the grid.
 */
async function fetchAndRenderProducts() {
    productGrid.innerHTML = '<p style="text-align: center; padding: 20px;">Loading products...</p>';
    
    try {
        const response = await fetch(PRODUCTS_ENDPOINT);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const products = await response.json(); 

        if (products && products.length > 0) {
            let allCardsHTML = '';
            products.forEach(product => {
                allCardsHTML += createProductCardHTML(product);
            });

            productGrid.innerHTML = allCardsHTML;
            attachCartListeners(); // Attach event listeners after content is loaded
        } else {
            productGrid.innerHTML = '<p style="text-align: center; padding: 20px;">No products found.</p>';
        }

    } catch (error) {
        console.error("Could not fetch products:", error);
        productGrid.innerHTML = `<p style="text-align: center; padding: 20px; color: red;">Failed to load products. Check your API URL and backend status.</p>`;
    }
}

// --- Start the process when the page is fully loaded ---
document.addEventListener('DOMContentLoaded', fetchAndRenderProducts);
