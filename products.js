// Product catalog with organized categories and local image paths
const products = [
    {
        id: 1,
        name: 'Organic Apples',
        price: 3.99,
        image: 'images/images.jpeg',  // Local image path
        category: 'Fruits',
        description: 'Sweet and crispy organic apples from local farms',
        weight: '1kg pack'
    },
    {
        id: 2,
        name: 'Fresh Whole Milk',
        price: 3.49,
        image: 'images/images (1).jpeg',
        category: 'Dairy',
        description: 'Farm-fresh whole milk, rich in calcium',
        volume: '1 liter'
    },
    {
        id: 3,
        name: 'Sourdough Bread',
        price: 4.99,
        image: 'images/Sourdough-Bread.jpg',
        category: 'Bakery',
        description: 'Artisanal sourdough bread, baked fresh daily',
        weight: '500g loaf'
    },
    {
        id: 4,
        name: 'Organic Carrots',
        price: 2.49,
        image: 'images/images (2).jpeg',
        category: 'Vegetables',
        description: 'Sweet and crunchy organic carrots',
        weight: '500g bundle'
    },
    {
        id: 5,
        name: 'Greek Yogurt',
        price: 5.99,
        image: 'images/images (3).jpeg',
        category: 'Dairy',
        description: 'Creamy Greek yogurt, high in protein',
        weight: '500g tub'
    },
    {
        id: 6,
        name: 'Free-Range Eggs',
        price: 4.49,
        image: 'images/images (4).jpeg',
        category: 'Dairy',
        description: 'Farm-fresh free-range eggs',
        quantity: '12 pack'
    },
    {
        id: 7,
        name: 'Premium Chicken Breast',
        price: 8.99,
        image: 'images/images (5).jpeg',
        category: 'Meat',
        description: 'Premium cut chicken breast, hormone-free',
        weight: '500g pack'
    },
    {
        id: 8,
        name: 'Vine Tomatoes',
        price: 2.99,
        image: 'images/images (6).jpeg',
        category: 'Vegetables',
        description: 'Sweet vine-ripened tomatoes',
        weight: '400g pack'
    },
    {
        id: 9,
        name: 'Aged Cheddar',
        price: 6.99,
        image: 'images/images (10).jpeg',
        category: 'Dairy',
        description: '12-month aged cheddar cheese',
        weight: '250g block'
    },
    {
        id: 10,
        name: 'Fresh Orange Juice',
        price: 4.99,
        image: './images/orange.jpg',
        category: 'Beverages',
        description: 'Freshly squeezed orange juice, no added sugar',
        volume: '1 liter'
    },
    {
        id: 11,
        name: 'Ripe Avocados',
        price: 5.99,
        image: 'images/ripe-avocados.jpg',
        category: 'Fruits',
        description: 'Ready-to-eat Hass avocados',
        quantity: '4 pack'
    },
    {
        id: 12,
        name: 'Atlantic Salmon',
        price: 12.99,
        image: 'images/images (7).jpeg',
        category: 'Seafood',
        description: 'Fresh Atlantic salmon fillet',
        weight: '300g portion'
    },
    {
        id: 13,
        name: 'Organic Spinach',
        price: 3.49,
        image: 'images/images (8).jpeg',
        category: 'Vegetables',
        description: 'Fresh organic baby spinach leaves',
        weight: '200g pack'
    },
    {
        id: 14,
        name: 'Mixed Berries',
        price: 6.99,
        image: 'images/images (9).jpeg',
        category: 'Fruits',
        description: 'Fresh mixed berries selection',
        weight: '300g pack'
    },
    {
        id: 15,
        name: 'Honey Granola',
        price: 5.49,
        image: 'images/honey granola.jpg',
        category: 'Breakfast',
        description: 'Crunchy honey granola with nuts',
        weight: '400g pack'
    }
];
/**
 * Filter products based on the selected category and search term
 * @param {string} category - The selected category to filter by
 */
function filterProducts(category) {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    let filteredProducts = products;

    // Apply category filter if a specific category is selected
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // Apply search filter if a search term is entered
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }

    // Display the filtered products
    displayProducts(filteredProducts);

    // Update the active state of the category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-category') === category);
    });
}

// Listen for input events on the search input
document.getElementById('searchInput').addEventListener('input', () => {
    const activeCategory = document.querySelector('.category-btn.active');
    const category = activeCategory.getAttribute('data-category');
    filterProducts(category);
});