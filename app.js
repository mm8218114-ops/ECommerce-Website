let products = [];
let categories = [];
let selectedCategory = null;
let searchTerm = "";
let sortOrder = "asc";

const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const productListContainer = document.getElementById('product-list-container');
const categoryFilterContainer = document.getElementById('category-filter-container');

async function initApp() {
    try {
        // Fetch both products and categories at the same time
        const [productsResponse, categoriesResponse] = await Promise.all([
            fetch('http://localhost:8080/api/products'),
            fetch('http://localhost:8080/api/categories')
        ]);

        products = await productsResponse.json();
        categories = await categoriesResponse.json();

        // Render the UI once data is loaded
        renderCategoryFilter();
        renderProducts();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// 4. Event Listeners (Replaces onChange={...} in JSX)
searchInput.addEventListener('input', (event) => {
    searchTerm = event.target.value;
    renderProducts();
});

sortSelect.addEventListener('change', (event) => {
    sortOrder = event.target.value;
    renderProducts();
});

// We will attach this function to the category buttons later
window.handleCategorySelect = function(categoryId) {
    selectedCategory = categoryId ? Number(categoryId) : null;
    renderProducts();
};

// 5. Filter and Sort Logic
function getFilteredProducts() {
    return products.filter(product => {
        const matchesCategory = selectedCategory ? product.category.id === selectedCategory : true;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    }).sort((a, b) => {
        if (sortOrder === 'asc') return a.price - b.price;
        return b.price - a.price;
    });
}

// 6. UI Rendering Functions
function renderProducts() {
    const filteredProducts = getFilteredProducts();

    if (filteredProducts.length === 0) {
        productListContainer.innerHTML = '<p>No Products Found</p>';
        return;
    }

    // 1. Loop through the products and generate an HTML string for each card
    const productsHTML = filteredProducts.map(product => `
        <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div class="card h-100">
                <img src="${product.imageUrl || 'https://placehold.co/600x400'}"
                     class="card-img-top" 
                     alt="${product.name}">  
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>$${product.price}</strong></p>
                </div>
            </div>
        </div>
    `).join(''); // .join('') combines the array of strings into one massive HTML string

    // 2. Wrap the cards in a Bootstrap row and inject it into the page container
    productListContainer.innerHTML = `
        <div class="row">
            ${productsHTML}
        </div>
    `;
}

function renderCategoryFilter() {
    // 1. Loop through the categories to create the <option> elements
    const optionsHTML = categories.map(category => `
        <option value="${category.id}">${category.name}</option>
    `).join('');

    // 2. Wrap the options in the <select> tag and inject into the container
    // Notice the onchange attribute calling our global function
    categoryFilterContainer.innerHTML = `
        <select id="categorySelect" class="form-control" onchange="window.handleCategorySelect(this.value)">
            <option value="">All Categories</option>
            ${optionsHTML}
        </select>
    `;
}

// 7. Start the app
initApp();