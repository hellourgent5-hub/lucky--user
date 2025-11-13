// ======================================================================
// !!! CRITICAL STEP: REPLACE THE PLACEHOLDER BELOW WITH YOUR ACTUAL RENDER BACKEND URL !!!
// ======================================================================
const API_BASE_URL = 'https://lucky-backend-xh9.onrender.com'; // <--- CHANGE THIS
// ======================================================================

const ENDPOINTS = {
    // Assuming your backend has an endpoint for food items now
    FOOD: `${API_BASE_URL}/api/food`, 
    // You could add GROCERY, PHARMACY etc. here
};

const productGrid = document.querySelector('.product-grid');
const homeView = document.getElementById('home-view');
const foodView = document.getElementById('food-view');
const searchInput = document.querySelector('.search-input');

// --- View Switching Logic ---

/**
 * Switches the active view (Home or Food/Listing).
 * @param {string} targetViewId - 'home-view' or 'food-view'.
 */
function switchView(targetViewId) {
    const allViews = document.querySelectorAll('.app-view');
    allViews.forEach(view => {
        view.classList.add('hidden');
        view.classList.remove('active');
    });

    const targetView = document.getElementById(targetViewId);
    if (targetView) {
        targetView.classList.remove('hidden');
        targetView.classList.add('active');
    }
    
    // Update the search bar placeholder based on the view
    if (targetViewId === 'home-view') {
        searchInput.placeholder = 'Search item or store here...';
    } else {
        searchInput.placeholder = 'Search local or restaurant here...';
        // Only fetch food data if we switch to the food view
        fetchAndRenderProducts(ENDPOINTS.FOOD); 
    }
}

// --- Product/Food Card Rendering Logic ---

function createProductCardHTML(product) {
    // Reusing the robust card structure
    const price = product.price || 0.00;
    const oldPrice = product.oldPrice || price * 1.25; 
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

function attachCartListeners() {
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.currentTarget.dataset.productId;
            console.log(`Product ${productId} added to cart! (Placeholder)`);
            // Real API call to your backend will go here
        });
    });
}

/**
 * Fetches data from a given endpoint and renders it.
 * @param {string} endpoint - The API endpoint URL to fetch from.
 */
async function fetchAndRenderProducts(endpoint) {
    if (!productGrid) return;

    productGrid.innerHTML = '<p style="text-align: center; padding: 20px;">Loading items...</p>';
    
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const items = await response.json(); 

        if (items && items.length > 0) {
            let allCardsHTML = '';
            items.forEach(item => {
                allCardsHTML += createProductCardHTML(item);
            });

            productGrid.innerHTML = allCardsHTML;
            attachCartListeners();
        } else {
            productGrid.innerHTML = '<p style="text-align: center; padding: 20px;">No items found in this category.</p>';
        }

    } catch (error) {
        console.error("Could not fetch items:", error);
        productGrid.innerHTML = `<p style="text-align: center; padding: 20px; color: red;">Failed to load items. Check the backend URL and endpoint.</p>`;
    }
}

// --- Event Listeners and Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial view setup: Show the Home Page first
    switchView('home-view'); 

    // 2. Attach listeners to the Service Grid icons
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget.dataset.target;
            switchView(target);
        });
    });
    
    // 3. Attach listeners to the Footer Navigation buttons
    document.querySelectorAll('.footer-nav .nav-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const target = e.currentTarget.dataset.target;
            switchView(target);

            // Update footer active state
            document.querySelectorAll('.footer-nav .nav-button').forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
});
