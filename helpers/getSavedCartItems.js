const getSavedCartItems = () => {
  const cartLoad = localStorage.getItem('cartItems');
  return cartLoad;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
