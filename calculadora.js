const urlAlimentos = 'https://raw.githubusercontent.com/paulo-yoshida/calculadora-cardapio/b1daa0e6bbf2d3d947c99a8e947ee43570faa813/alimentos.csv';
let dadosAlimentos; // Declaração da variável dadosAlimentos

// Função para carregar e processar o arquivo CSV
async function carregarAlimentos() {
  try {
      // Faz a requisição para obter o arquivo CSV
      const resposta = await fetch(urlAlimentos);

      // Verifica se a requisição foi bem-sucedida
      if (!resposta.ok) {
          throw new Error('Não foi possível carregar o arquivo CSV.');
      }

      // Obtém o conteúdo do arquivo CSV como texto
      const textoCSV = await resposta.text();

      // Converte o texto CSV para um array de linhas
      const linhas = textoCSV.trim().split('\n');

      // Processa as linhas para criar um array de objetos
      dadosAlimentos = linhas.map(linha => {
          const colunas = linha.split(',');
          return {
              grupo: colunas[0].trim(),
              alimento: colunas[1].trim(),
              calorias_por_grama: parseFloat(colunas[2].trim())
          };
      });

      // Exibe os dados processados no console (apenas para fins de teste)
      console.log('Dados dos alimentos:', dadosAlimentos);

      // Chama a função para atualizar as calorias
      atualizarCaloriasProteinas();
      atualizarCaloriasCarboidratos();
  } catch (erro) {
      console.error('Erro ao carregar e processar o arquivo CSV:', erro);
  }
}

// Função para calcular as calorias e atualizar o elemento HTML
function atualizarCaloriasProteinas() {
  // Obtém a quantidade inserida pelo usuário
  var quantidade = parseFloat(document.getElementById('proteinas_quantidade').value);

  // Obtém o índice da proteína selecionada
  var indiceProteina = document.getElementById('proteinas').value;
  
  // Obtém as calorias por grama da proteína selecionada usando os dados do arquivo CSV
  var caloriasPorGramas = dadosAlimentos[indiceProteina].calorias_por_grama;
  
  // Calcula as calorias totais
  var caloriasTotais = quantidade * caloriasPorGramas;
  
  // Atualiza o elemento HTML com as calorias calculadas
  document.getElementById('proteinas_calorias').textContent = caloriasTotais.toFixed(2) + ' calorias';
}

// Função para calcular as calorias e atualizar o elemento HTML
function atualizarCaloriasCarboidratos() {
  // Obtém a quantidade inserida pelo usuário
  var quantidade = parseFloat(document.getElementById('carboidratos_quantidade').value);

  // Obtém o índice da proteína selecionada
  var indiceCarboidrato = document.getElementById('carboidratos').value;
  
  // Obtém as calorias por grama da proteína selecionada usando os dados do arquivo CSV
  var caloriasPorGramas = dadosAlimentos[indiceCarboidrato].calorias_por_grama;
  
  // Calcula as calorias totais
  var caloriasTotais = quantidade * caloriasPorGramas;
  
  // Atualiza o elemento HTML com as calorias calculadas
  document.getElementById('carboidratos_calorias').textContent = caloriasTotais.toFixed(2) + ' calorias';
}

// Chamada da função para carregar os alimentos assim que o script iniciar
carregarAlimentos();

// Adiciona um evento de escuta para o input de quantidade e select de proteínas
document.getElementById('proteinas_quantidade').addEventListener('input', atualizarCaloriasProteinas);
document.getElementById('proteinas').addEventListener('change', atualizarCaloriasProteinas);
document.getElementById('carboidratos_quantidade').addEventListener('input', atualizarCaloriasCarboidratos);
document.getElementById('carboidratos').addEventListener('change', atualizarCaloriasCarboidratos);
