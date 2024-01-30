<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cardápio</title>
  <link rel="stylesheet" href="format_calc.css">
  <style>
    /* Adicione estilos adicionais aqui se necessário */
  </style>
</head>
<body>
  <div class="titulo">
    Calculadora de Cardápio
  </div>
  <div class="wrapper">
    <div class="label">
      1. Escolha uma opção de proteínas:
    </div>
    <div class="container_escolhas">
      <select id="proteinas">
        <option selected value="0">Selecione uma opção</option>
        <option value="1">Carne</option>
        <option value="2">Frango</option>
        <option value="3">Peixe</option>
      </select>
      <div class="porcao">
        <div class="quantLabel">
          Insira a quantidade em gramas (g):
        </div>
        <div class="quantValue">
          <input id="proteinas_quantidade" placeholder="ex: 80">
        </div>
        <div class="calorias" id="proteinas_calorias">
          Y calorias / Z calorias
        </div>
      </div>
    </div>

    <!-- Adicione mais blocos semelhantes para carboidratos, leguminosas e legumes -->

    <div class="label">
      2. Escolha uma opção de carboidratos:
    </div>
    <div class="container_escolhas">
      <select id="carboidratos">
        <option selected value="0">Selecione uma opção</option>
        <option value="1">Macarrão</option>
        <option value="2">Arroz</option>
        <option value="3">Batata</option>
      </select>
      <div class="porcao">
        <div class="quantLabel">
          Insira a quantidade em gramas (g):
        </div>
        <div class="quantValue">
          <input id="carboidratos_quantidade" placeholder="ex: 80">
        </div>
        <div class="calorias" id="carboidratos_calorias">
          Y calorias / Z calorias
        </div>
      </div>
    </div>

    <!-- Adicione blocos semelhantes para leguminosas e legumes -->

    <button>Calcular</button>

  </div>

  <script src="calculadora.js"></script>
</body>
</html>
