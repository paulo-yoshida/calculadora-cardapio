// Função genérica para carregar alimentos a partir do CSV
async function carregarAlimentos(url) {
  try {
      const resposta = await fetch(url);
      if (!resposta.ok) {
          throw new Error('Não foi possível carregar o arquivo CSV.');
      }
      const textoCSV = await resposta.text();
      const linhas = textoCSV.trim().split('\n');
      return linhas.map(linha => {
          const colunas = linha.split(',');
          return {
              grupo: colunas[0].trim(),
              alimento: colunas[1].trim(),
              calorias_por_grama: parseFloat(colunas[2].trim())
          };
      });
  } catch (erro) {
      console.error('Erro ao carregar e processar o arquivo CSV:', erro);
  }
}

// Função genérica para calcular as calorias e atualizar o elemento HTML
function calcularCalorias(idQuantidade, idAlimento, idResultado, dadosAlimentos) {
  var quantidade = parseFloat(document.getElementById(idQuantidade).value);
  var indiceAlimento = document.getElementById(idAlimento).value;
  var caloriasPorGramas = dadosAlimentos[indiceAlimento].calorias_por_grama;
  var caloriasPorcao = quantidade * caloriasPorGramas || 0;
  var caloriasTotais = caloriasPorcao.toFixed(0);
  document.getElementById(idResultado).textContent = caloriasTotais + ' calorias';
}

// Carrega os alimentos (proteínas e carboidratos) e chama a função para calcular calorias
async function inicializarCalculadora() {
  const urlProteinas = 'https://raw.githubusercontent.com/paulo-yoshida/calculadora-cardapio/main/proteinas.csv';
  const urlCarboidratos = 'https://raw.githubusercontent.com/paulo-yoshida/calculadora-cardapio/main/carboidratos.csv';

  const dadosProteinas = await carregarAlimentos(urlProteinas);
  const dadosCarboidratos = await carregarAlimentos(urlCarboidratos);

  // Adiciona eventos de escuta para proteínas
  document.getElementById('proteinas_quantidade').addEventListener('input', function () {
      calcularCalorias('proteinas_quantidade', 'proteinas', 'proteinas_calorias', dadosProteinas);
      atualizarCaloriasEBarraProgresso();
  });
  document.getElementById('proteinas').addEventListener('change', function () {
      calcularCalorias('proteinas_quantidade', 'proteinas', 'proteinas_calorias', dadosProteinas);
      atualizarCaloriasEBarraProgresso();
  });

  // Adiciona eventos de escuta para carboidratos
  document.getElementById('carboidratos_quantidade').addEventListener('input', function () {
      calcularCalorias('carboidratos_quantidade', 'carboidratos', 'carboidratos_calorias', dadosCarboidratos);
      atualizarCaloriasEBarraProgresso();
  });
  document.getElementById('carboidratos').addEventListener('change', function () {
      calcularCalorias('carboidratos_quantidade', 'carboidratos', 'carboidratos_calorias', dadosCarboidratos);
      atualizarCaloriasEBarraProgresso();
  });
}

// Função para calcular as calorias totais dos elementos selecionados
function calcularCaloriasTotais() {
  // Inicializa a contagem de calorias
  var caloriasTotais = 0.00;

  // Calcula as calorias das proteínas selecionadas
  var caloriasProteinas = parseFloat(document.getElementById('proteinas_calorias').textContent) || 0;

  // Calcula as calorias dos carboidratos selecionados
  var caloriasCarboidratos = parseFloat(document.getElementById('carboidratos_calorias').textContent) || 0;

  // Soma as calorias das proteínas e dos carboidratos
  caloriasTotais = caloriasProteinas + caloriasCarboidratos;

  // Retorna o total de calorias calculado
  return caloriasTotais;
}

// Função para calcular a largura da barra de progresso
function calcularLarguraBarraProgresso(caloriasTotais, metaCalorias) {
  // Calcula a porcentagem de calorias consumidas em relação à meta
  var porcentagemCalorias = (caloriasTotais / metaCalorias) * 100;

  // Limita a porcentagem para evitar que a largura da barra ultrapasse 100%
  porcentagemCalorias = Math.min(porcentagemCalorias, 100);

  // Retorna a largura da barra de progresso
  return porcentagemCalorias + '%';
}

// Chamada das funções para calcular as calorias totais e a largura da barra de progresso
function atualizarCaloriasEBarraProgresso() {
  var caloriasTotais = calcularCaloriasTotais(); // Chamada da função para calcular as calorias totais
  var metaCalorias = parseFloat(document.getElementById('meta_calorias').value); // Exemplo de meta de calorias (substitua pelo valor desejado)
  var pct = (caloriasTotais/metaCalorias).toFixed(2)*100 || 0;
  var larguraBarraProgresso = calcularLarguraBarraProgresso(caloriasTotais, metaCalorias); // Chamada da função para calcular a largura da barra de progresso
  
  // Aqui você pode atualizar a barra de progresso com a largura calculada
  document.getElementById('progress').style.width = larguraBarraProgresso;
  document.getElementById('comparacao_total').textContent = caloriasTotais + ' calorias';
  document.getElementById('comparacao_pct').textContent = '(' + pct + '%)';
}

// Adiciona um ouvinte de eventos para a mudança na meta de calorias
document.getElementById('meta_calorias').addEventListener('input', function() {
  atualizarCaloriasEBarraProgresso();
});

// Chama a função para inicializar a calculadora assim que o script iniciar
inicializarCalculadora();

// Chama a função para calcular as calorias totais e a barra de progresso quando o script é carregado
atualizarCaloriasEBarraProgresso();
