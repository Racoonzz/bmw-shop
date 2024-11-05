// Navigation and Sidebar Setup
//---------------------------------

let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
    arrowParent.classList.toggle("showMenu");
  });
}
let sidebar = document.querySelector(".sidebar");

let cart = [];
let isCartTabActive = false;
let isExploreTabActive = false;

document.addEventListener('DOMContentLoaded', function() {
  loadCart();
  if (isCartTabActive) {
    renderCart();
  }
});


function clearExploreSection() {
  // Get the explore section if it exists
  const exploreSection = document.querySelector('.products');
  if (exploreSection) {
    exploreSection.innerHTML = ''; // Clear the content
  }
}

$(function () {
  resizeScreen();
  $(window).resize(function () {
    resizeScreen();
  });
});

$('.bx-menu').click(function () {
  if (document.body.clientWidth > 400) {
    $('.sidebar').toggleClass('close');
  } else {
    $('.sidebar').toggleClass('small-screen');
  }
});

function resizeScreen() {
  if (document.body.clientWidth < 400) {
    $('.sidebar').addClass('close');
  } else {
    $('.sidebar').removeClass('close');
  }
}


// Navigation Options
//----------------------

function navigateTo(option, className, text) {
  isExploreTabActive = false;
  isCartTabActive = false;

  // Clear the home section content
  const homeSection = document.getElementById('home');
  homeSection.innerHTML = '';

  // Set the home class and update text
  homeSection.classList = className;
  document.getElementById("text").innerHTML = text;

  // If navigating to cart, show cart content
  if (option === 'cart') {
    isCartTabActive = true;

    // Create cart structure
    const cartHTML = `
      <div id="cart-container">
          <div class="cart-content">
              <h2>Shopping Cart</h2>
              <div id="cart-items"></div>
              <div class="cart-total">
                  <h3>Total: <span id="cart-total-amount">0 Ft</span></h3>
              </div>
              <button id="checkout-btn">Proceed to Checkout</button>
          </div>
      </div>
    `;

    homeSection.innerHTML = cartHTML;

    // Call renderCart immediately after setting the innerHTML
    renderCart();
  }
}

Home.addEventListener('click', function () {
  navigateTo('home', 'home', 'Home');
  const homeSection = document.getElementById('home');
  homeSection.innerHTML = ''; // Clear any existing content
});


// Cart Event Listener
Cart.addEventListener('click', function () {
  navigateTo('cart', 'cart', 'Cart');
});

Contacts.addEventListener('click', function () {
  navigateTo('contacts', 'contacts', 'Contacts');
})

Models.addEventListener('click', function () {
  navigateTo('models', 'models', 'Models');
})

E30.addEventListener('click', function () {
  navigateTo('e30', 'e30', 'Models > E30');
})

E34.addEventListener('click', function () {
  navigateTo('e34', 'e34', 'Models > E34');
})

E36.addEventListener('click', function () {
  navigateTo('e36', 'e36', 'Models > E36');
})

E39.addEventListener('click', function () {
  navigateTo('e39', 'e39', 'Models > E39');
})

E46.addEventListener('click', function () {
  navigateTo('e46', 'e46', 'Models > E46');
})



// Explore (Products) Option
//---------------------------
const exploreContainer = document.getElementById('Explore');
const exploreLink = document.getElementById('exploreLink');


const handleExploreClick = (event) => {
  event.preventDefault(); // Prevent default anchor behavior
  isExploreTabActive = true;
  home.className = 'products';
  document.getElementById("text").innerHTML = "Products";

    // Select the products section in the Explore tab
    const exploreProductsSection = document.querySelector('.products');


    fetch('https://hur.webmania.cc/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (isExploreTabActive) {
                const products = data.products;
                const content = products.map(product => `
                    <div class="listing">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <img src="${product.picture}" alt="${product.name}">
                        <h3>${product.price} Ft</h3>
                        ${product.stock ? 
                            `<a id="${product.id}" class="addToCart">Kosárba</a>` : 
                            '<span>Nem rendelhető</span>'}
                    </div>
                `).join('');

                // Update the products section in the Explore tab
                exploreProductsSection.innerHTML = content;

                // Add event listeners to the buttons in the Explore tab
                addCartEventListeners(exploreProductsSection);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            exploreProductsSection.innerHTML = '<p>Products could not be loaded. Please try again later.</p>';
        });
};


// Add event listeners for both the <div> and <a> tag
exploreContainer.addEventListener('click', handleExploreClick);
exploreLink.addEventListener('click', handleExplor);
function addCartEventListeners(section) {
    const addToCartButtons = section.querySelectorAll('.addToCart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Common Logic
//----------------
function addToCart(event) {
  event.preventDefault();
  const productId = parseInt(event.target.id);
  const button = event.target; // Get the button that was clicked

  fetch('https://hur.webmania.cc/products.json')
      .then(response => response.json())
      .then(data => {
          const product = data.products.find(p => p.id === productId);
          if (product) {
              const existingItem = cart.find(item => item.id === productId);
              if (existingItem) {
                  existingItem.quantity += 1;
              } else {
                  cart.push({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.picture,
                      quantity: 1
                  });
              }
              saveCart();
              
              // Add flashing effect
              button.classList.add('flashing');
              setTimeout(() => {
                  button.classList.remove('flashing'); // Remove effect after 0.5s
              }, 500);

              if (isCartTabActive) {
                  renderCart();
              }
          }
      })
      .catch(error => console.error('Error:', error));
}

function updateQuantity(itemId, change) {
  const item = cart.find(item => item.id === itemId);
  if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
          removeFromCart(itemId);
      } else {
          saveCart();
          renderCart();
      }
  }
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  saveCart();
  renderCart();
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  saveCart();
  renderCart();
}

function calculateTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}


// Add a listener to reset the flag when leaving the Explore tab
document.addEventListener('click', function (event) {
  if (!event.target.matches('#Explore')) {
    isExploreTabActive = false;
  }
});


Cart.addEventListener('click', function () {
  isExploreTabActive = false;
  isCartTabActive = true;

  const homeSection = document.getElementById('home');
  homeSection.innerHTML = ''; // Clear existing content
  homeSection.className = 'cart';
  document.getElementById("text").innerHTML = "Cart";

  // Create cart structure
  const cartHTML = `
      <div id="cart-container">
          <div class="cart-content">
              <h2>Shopping Cart</h2>
              <div id="cart-items"></div>
              <div class="cart-total">
                  <h3>Total: <span id="cart-total-amount">0 Ft</span></h3>
              </div>
              <button id="checkout-btn">Proceed to Checkout</button>
          </div>
      </div>
  `;

  homeSection.innerHTML = cartHTML;

  // Call renderCart immediately after setting the innerHTML
  renderCart();
});

  // Clear the explore section if it exists
  clearExploreSection();
  
  function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total-amount');

    if (!cartItems || !cartTotal) return;

    // Clear existing content
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        cartTotal.textContent = '0 Ft';
        return;
    }

    // Render each cart item
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: ${item.price} Ft</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });

    // Update total
    const total = calculateTotal();
    cartTotal.textContent = `${total} Ft`;

    // Add checkout button functionality
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.onclick = function() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
            } else {
                alert('Proceeding to checkout...');
                // Add your checkout logic here
            }
        };
    }
}


// Cart functions
function clearExploreSection() {
  // Get the explore section if it exists
  const exploreSection = document.querySelector('.products');
  if (exploreSection) {
    exploreSection.innerHTML = ''; // Clear the content
  }
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  saveCart();
  renderCart();
}

function updateQuantity(itemId, change) {
  const item = cart.find(item => item.id === itemId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(itemId);
    } else {
      saveCart();
      renderCart();
    }
  }
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  saveCart();
  renderCart();
}

function calculateTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function renderCart() {
  if (!isCartTabActive) return;
  
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total-amount');
  
  if (!cartItems || !cartTotal) return;
  
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty</p>';
  } else {
    cart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>Price: ${item.price} Ft</p>
        </div>
        <div class="cart-item-actions">
          <div class="quantity-controls">
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `;
      cartItems.appendChild(itemElement);
    });
  }
  
  cartTotal.textContent = `${calculateTotal()} Ft`;
}

// localStorage functions
function saveCart() {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
}

function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
      cart = JSON.parse(savedCart);
  }
}



document.addEventListener('DOMContentLoaded', function() {
  loadCart();
  // If cart is open, render it
  if (isCartTabActive) {
    renderCart();
  }
});
