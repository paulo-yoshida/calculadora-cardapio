const url = 'https://raw.githubusercontent.com/paulo-yoshida/calculadora-cardapio/b1daa0e6bbf2d3d947c99a8e947ee43570faa813/alimentos.csv';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Não foi possível carregar o arquivo CSV.');
    }
    return response.text();
  })
  .then(csvData => {
    // Processar os dados do CSV
    console.log(csvData);
  })
  .catch(error => {
    console.error('Erro:', error);
  });
