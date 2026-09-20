const products = [
    { id: 1, name: "Smartphone", price: 19999.99, image: "./images/smartphone.jpg", category: "Electronics" },
    { id: 2, name: "Laptop", price: 89999.99, image: "./images/laptop.jpg", category: "Electronics" },
    { id: 3, name: "Headphones", price: 9999.99, image: "./images/headphones.jpg", category: "Electronics" },
    { id: 4, name: "Novel", price: 1499.99, image: "./images/Novel.jpg", category: "Books" },
    { id: 5, name: "Science Fiction Book", price:  1999.99, image: "./images/science_fiction.jpg", category: "Books" },
    { id: 6, name: "Biography", price: 2499.99, image: "./images/biography.jpg", category: "Books" },
    { id: 7, name: "T-Shirt", price: 2999.99, image: "./images/tshirt.jpg", category: "Clothing" },
    { id: 8, name: "Jeans", price: 4999.99, image: "./images/jeans.jpg", category: "Clothing" },
    { id: 9, name: "Jacket", price: 7999.99, image: "./images/jacket.jpg", category: "Clothing" }
  ];
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-grid')) {
      loadProducts();
    }
    if (document.getElementById('cart-items')) {
      loadCart();
    }
  });
  
  function loadProducts() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
  
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>Rs. ${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productGrid.appendChild(productElement);
    });
  }
  
  function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (!product) {
      console.error('Product not found');
      return;
    }
  
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    loadCart();
    alert(`${product.name} has been added to your cart.`);
  }
  
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    loadCart();
  }
  
  function updateQuantity(productId, quantity) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
      if (cartItem.quantity <= 0) {
        if (confirm('Do you want to remove this item from the cart?')) {
          removeFromCart(productId);
        } else {
          cartItem.quantity = 1;
        }
      }
      saveCart();
      loadCart();
    }
  }
  
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function loadCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalBillContainer = document.getElementById('total-bill');
  
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = '';
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalBillContainer.innerHTML = '<h2>Total: Rs. 0.00</h2>';
        return;
      }
      let total = 0;
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h2>${item.name}</h2>
          <p>Rs. ${item.price.toFixed(2)}</p>
          <div class="quantity">
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
      });
  
      totalBillContainer.innerHTML = `<h2>Total: Rs. ${total.toFixed(2)}</h2>`;
    }
  }
  
  function clearCart() {
    if (confirm('Are you sure you want to clear the cart?')) {
      cart = [];
      saveCart();
      loadCart();
    }
  }
  