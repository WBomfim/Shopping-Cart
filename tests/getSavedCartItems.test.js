const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Testa se ao executar a função getSavedCartItems o método "localStorage.getItem" é chamado', () => {
    expect.assertions(1);
    getSavedCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.getItem).toHaveBeenCalled();
  })

  it('Testa se ao executar a função getSavedCartItems o método "localStorage.getItem" é chamado com os parâmetros "cartItems" e o valor passado como parametro', () => {
    expect.assertions(1);
    getSavedCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  })
});
