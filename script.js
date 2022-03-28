const listCart = document.querySelector('.cart__items');

async function filterKeysProducts() {
  const { results } = await fetchProducts('computador');
  return results.map((product) => {
    const { id, title, thumbnail, price } = product;
    return { sku: id, name: title, image: thumbnail, value: price };
  });
}

async function filterKeysItem(sku) {
  const item = await fetchItem(sku);
    const { id, title, thumbnail, price } = item;
    return { sku: id, name: title, image: thumbnail, salePrice: price };
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image, value }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${(value).toFixed(2)}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

async function addProductsItem() {
  const sectionItems = document.querySelector('.items');
  const products = await filterKeysProducts();
  
  products.forEach((product) => {
    const item = createProductItemElement(product);
    sectionItems.appendChild(item);
  });
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function saveCart() {
  const listItems = listCart.innerHTML;
  saveCartItems(listItems);
}

function calculateCartPrice() {
  const cartList = document.querySelectorAll('.cart__item');
  const displaysPrice = document.querySelector('.total-price');
  const itemsPrices = [];
  cartList.forEach((item) => {
    const stringItem = item.innerText;
    const indexPrice = stringItem.indexOf('$') + 1;
    const price = stringItem.substring(indexPrice);
    itemsPrices.push(price);
  });
  const totalPrice = itemsPrices.reduce((acc, price) => parseFloat(acc) + parseFloat(price), 0);
  displaysPrice.innerText = totalPrice;
}

function cartItemClickListener(event) {
  listCart.removeChild(event.target);
  saveCart();
  calculateCartPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemsInCart(event) {
  if (event.target.className === 'item__add') {
    const getItem = event.target.parentNode;
    const sku = getSkuFromProductItem(getItem);
    const filteredItem = await filterKeysItem(sku);
    const liCart = createCartItemElement(filteredItem);
    listCart.appendChild(liCart);
    saveCart();
    calculateCartPrice();
  }
}

function setItemsCart() {
  const itemsList = document.querySelector('.items');
  itemsList.addEventListener('click', addItemsInCart);
}

function clearCart() {
  const buttonEmptyCart = document.querySelector('.empty-cart');
  buttonEmptyCart.addEventListener('click', () => {
    listCart.innerHTML = '';
    calculateCartPrice();
    saveCart();
  });
}

function loadCartList() {
  const list = getSavedCartItems();
  listCart.innerHTML = list;
  const cartItems = listCart.childNodes;
  cartItems.forEach((li) => {
    li.addEventListener('click', cartItemClickListener);
  });
}

window.onload = () => {
  loadCartList();
  addProductsItem();
  setItemsCart();
  calculateCartPrice();
  clearCart();
};
