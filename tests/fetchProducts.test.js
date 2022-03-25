require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se fetchProducts é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  })

  it('Testa se ao executar a função fetchProducts com o argumanto "computador" fetch é chamado', () => {
    expect.assertions(1);
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it('Testa o endpoint da função fetch ao chamar a função fetchProducts com o argumanto "computador"', () => {
    expect.assertions(1);
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  })

  it('Testa o retorno ao chamar a função fetchProducts com o argumanto "computador"', async () => {
    expect.assertions(1);
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  })

  it('Testa se ao chamar a função fetchProducts sem argumento retorna um erro', async () => {
    expect.assertions(1);
    const response = await fetchProducts();
    expect(response).toEqual(new Error('You must provide an url'));
  })
});
