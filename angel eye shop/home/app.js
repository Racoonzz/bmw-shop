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

  // Clear the Explore section if it exists
  clearExploreSection();

  // Set the home class and update text
  home.classList = className;
  document.getElementById("text").innerHTML = text;
}

Home.addEventListener('click', function () {
  navigateTo('home', 'home', 'Home');
})

Cart.addEventListener('click', function () {
  navigateTo('cart', 'cart', 'Cart');
})

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

Explore.addEventListener('click', function () {
  isExploreTabActive = true;
  home.classList = 'products';
  document.getElementById("text").innerHTML = "Products";

  // Select the products section in the Explore tab
  let exploreProductsSection = document.querySelector('.products');

  // Fetch and display products only when in the Explore tab
  fetch('https://hur.webmania.cc/products.json')
    .then(response => response.json())
    .then(data => {
      // Check if the Explore tab is still active before updating content
      if (isExploreTabActive) {
        let products = data.products;
        let content = '';

        products.forEach(product => {
          content += `<div class="listing">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <img src="${product.picture}">
            <h3>${product.price} Ft</h3>`;

          if (product.stock) {
            content += `<a id="${product.id}" class="addToCart">Kosárba</a>`;
          } else {
            content += 'Nem rendelhető';
          }

          content += '</div>';
        });

        // Update the products section in the Explore tab only if it is still active
        exploreProductsSection.innerHTML = content;

        // Add event listeners only to the buttons in the Explore tab
        const addToCartButtons = exploreProductsSection.querySelectorAll('.addToCart');
        const buttonCount = addToCartButtons.length;

        for (let i = 0; i < buttonCount; i++) {
          addToCartButtons[i].addEventListener('click', addToCart);
        }
      }
    })
    .catch(error => console.error(error));
});

// Common Logic
//----------------

// Add a listener to reset the flag when leaving the Explore tab
document.addEventListener('click', function (event) {
  if (!event.target.matches('#Explore')) {
    isExploreTabActive = false;
  }
});

function addToCart() {
  console.log('Add to cart clicked. Product ID:', this.id);
  // Implement your addToCart logic here
}

// Function to clear the content of the Explore section
function clearExploreSection() {
  let exploreProductsSection = document.querySelector('.products');
  if (exploreProductsSection) {
    exploreProductsSection.innerHTML = '';
  }
}