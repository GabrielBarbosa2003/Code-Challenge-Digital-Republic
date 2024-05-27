 function verificaTamanhoParede({ altura, largura }) {

     // regra de negocios 1: Nenhuma parede pode ter menos de 1 metro quadrado nem mais de 50 metros quadrados, mas podem possuir alturas e larguras diferentes
     if (altura < 1 || largura < 1) {
          throw new Error("O valor deve ser maior do que 1");
     } else if (altura > 50 || largura > 50) {
          throw new Error("Altura ou largura devem ser menores do que 50m");
     } else return true;
}

 function calculaPortaEJanela({ altura, largura, janelas, portas }) {
     altura = parseFloat(altura);
     largura = parseFloat(largura);

     const areaParede = altura * largura;
     const areaPortas = portas * 0.8 * 1.9;
     const areaJanelas = janelas * 2.0 * 1.2;
     const areaTotalPortasJanelas = areaPortas + areaJanelas;

     // regra de negocios 2: O total de área das portas e janelas deve ser no máximo 50% da área de parede
     if (areaTotalPortasJanelas > areaParede / 2) {
          throw new Error('A área total de portas e janelas deve ser no máximo 50% da área da parede.');
     }

     // Regra 3: A altura de paredes com porta deve ser, no mínimo, 30 centímetros maior que a altura da porta
     if (portas > 0 && altura < 1.9 + 0.3) {
          throw new Error('A altura da parede deve ser no mínimo 30 cm maior que a altura da porta (2.2 metros).');
     }

     return {areaParede, areaTotalPortasJanelas};




}

function totalDeLatas({areaTotalParedes,areaTotalPortasJanelas}){
     const areaPintavel = areaTotalParedes - areaTotalPortasJanelas;
     const litrosDeTinta = areaPintavel / 5; // 1 litro de tinta para cada 5 metros quadrados
     return litrosDeTinta
}

function sugerirCompras(litrosNecessarios) {
     const tamanhosLatas = [
       { tamanho: 18, descricao: '18 L' },
       { tamanho: 3.6, descricao: '3,6 L' },
       { tamanho: 2.5, descricao: '2,5 L' },
       { tamanho: 0.5, descricao: '0,5 L' }
     ];
   
     // Inicializa as quantidades de latas necessárias
     const quantidadesLatas = {};
     for (const lata of tamanhosLatas) {
       quantidadesLatas[lata.descricao] = 0;
     }
   
     // Calcula as quantidades de latas necessárias, priorizando as maiores
     for (const lata of tamanhosLatas) {
       while (litrosNecessarios >= lata.tamanho) {
         quantidadesLatas[lata.descricao]++;
         litrosNecessarios -= lata.tamanho;
       }
     }
   
      return quantidadesLatas;
   }

export { verificaTamanhoParede, calculaPortaEJanela, totalDeLatas, sugerirCompras}