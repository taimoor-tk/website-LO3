// Check authentication
if (!localStorage.getItem('currentUser')) {
    window.location.href = 'login.html';
}

// Initialize category buttons
function initializeCategories() {
    const categories = [...new Set(products.map(p => p.category))];
    const buttonContainer = document.getElementById('categoryButtons');
    
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.textContent = category;
        button.onclick = () => filterProducts(category);
        buttonContainer.appendChild(button);
    });
}

// Filter products by category
function filterProducts(category) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === category || 
           (btn.textContent === 'All Items' && category === 'all')) {
            btn.classList.add('active');
        }
    });
    displayProducts(category);
}

// Display products with search and filter
function displayProducts(category = 'all') {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    let filteredProducts = products;
    
    // Apply category filter
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // Apply search filter
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }

    const grid = document.getElementById('productsGrid');
    
    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <h3>No products found</h3>
                <p>Try adjusting your search or filters</p>
            </div>`;
        return;
    }

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img 
                src="${product.image}" 
                alt="${product.name}" 
                class="product-image"
                onerror="this.src='images/placeholder.jpg'"
            >
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-info">${product.weight || product.volume || product.quantity}</p>
                <button 
                    class="add-to-cart"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Cart functionality
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const product = products.find(p => p.id === productId);
    
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Show success feedback
        const button = event.target;
        button.textContent = '✓ Added';
        button.disabled = true;
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.disabled = false;
        }, 1000);
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    document.getElementById('cartCount').textContent = cart.length;
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    window.location.href = 'login.html';
}

// Search functionality with debouncing
let searchTimeout;
document.getElementById('searchInput').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const activeCategory = document.querySelector('.category-btn.active')?.textContent;
        displayProducts(activeCategory === 'All Items' ? 'all' : activeCategory);
    }, 300);
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initializeCategories();
    displayProducts();
    updateCartCount();
});
