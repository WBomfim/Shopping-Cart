require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Testa se fetchItem é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  })

  it('Testa se ao executar a função fetchItem com o argumanto "MLB1615760527" fetch é chamado', () => {
    expect.assertions(1);
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  it('Testa o endpoint da função fetch ao chamar a função fetchItem com o argumanto "MLB1615760527"', () => {
    expect.assertions(1);
    const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endPoint);
  })

  it('Testa o retorno ao chamar a função fetchItem com o argumanto "MLB1615760527"', async () => {
    expect.assertions(1);
    const data = await fetchItem('MLB1615760527');
    expect(data).toEqual(item);
  })

  it('Testa se ao chamar a função fetchItem sem argumento retorna um erro', async () => {
    expect.assertions(1);
    const data = await fetchItem();
    expect(data).toEqual(new Error('You must provide an url'));
  })
});
