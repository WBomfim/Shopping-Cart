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

function cartItemClickListener(event) {
  listCart.removeChild(event.target);
  saveCart();
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
  }
}

function setItemsCart() {
  const itemsList = document.querySelector('.items');
  itemsList.addEventListener('click', addItemsInCart);
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
};
