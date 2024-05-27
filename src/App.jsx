import { useState } from 'react';
import './App.css'
import './grid.css'
import { verificaTamanhoParede, calculaPortaEJanela, totalDeLatas, sugerirCompras } from './services/services';

function App() {
  const [formData, setFormData] = useState({
    altura: '',
    largura: '',
    janelas: '',
    portas: ''
  });
  const [sugertaoLatas, setSugertaoLatas] = useState({
    l18: '',
    l36: '',
    l25: '',
    l05: ''
  })
  const [parede, setParede] = useState(1)
  const [sugestao, setSugestao] = useState(false)

  var areaTotalParedes = 0



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const altura = parseInt(formData.altura);
    const largura = parseInt(formData.largura);
    const janelas = parseInt(formData.janelas);
    const portas = parseInt(formData.portas);


    verificaTamanhoParede({ altura, largura });
    const { areaParede, areaTotalPortasJanelas } = calculaPortaEJanela({ altura, largura, janelas, portas });

    setParede(parede + 1)
    alert(`Dados parede ${parede} cadastrados!`);
    setFormData({
      altura: '',
      largura: '',
      janelas: '',
      portas: ''
    })
    areaTotalParedes = areaTotalParedes + areaParede;
    if (parede == 4) {
      totalDeLatas({ areaTotalParedes, areaTotalPortasJanelas });
      var latas = sugerirCompras(areaTotalParedes);
      var { '18 L': lata18L, '3,6 L': lata3_6L, '2,5 L': lata2_5L, '0,5 L': lata0_5L } = latas;
      setSugertaoLatas(
        {
          l18: lata18L,
          l36: lata3_6L,
          l25: lata2_5L,
          l05: lata0_5L
        }
      )
      setParede(1)
      setSugestao(true)
    }

  };


  return (

    <>
      <div className='container'>
        <div className='desenho'></div>
        <div className='borda_form'></div>
        <div className='borda_form_last'></div>
        <div className='grid'>

          <div className='grid_esquerda'>
            <h1>Descubra a quantidade de tinta!</h1>
            <h2> CODE CHALLENGE</h2>
          </div>
            <div className='grid_direita'>
              <form className='formulario' onSubmit={handleSubmit}>
                <h1>Preencha com os dados do comodo!</h1>
                <h1>Parede {parede}</h1>

                <label htmlFor="altura" >Altura parede :</label>
                <input type='text' id='altura' name='altura' value={formData.altura} onChange={handleChange} />

                <label htmlFor="largura" >largura parede :</label>
                <input type='text' id='largura' name='largura' value={formData.largura} onChange={handleChange} />

                <label htmlFor="janelas">Quantidade de janelas:</label>
                <input type='text' id='janelas' name='janelas' value={formData.janelas} onChange={handleChange} />

                <label htmlFor="portas">Quantidade de portas:</label>
                <input type='text' id='portas' name='portas' value={formData.portas} onChange={handleChange} />

                <button type="submit">Enviar</button>
              </form>

              <div className={sugestao ? 'sugestao_visivel' : 'sugestao'}>
                <h1>Sugestão:</h1>
                <ul className='lista_sug'>
                  Para pintar o comodo, sugerimos:
                  <l1>
                    18L:{sugertaoLatas.l18}
                  </l1>
                  <l1>
                    3,6L:{sugertaoLatas.l36}
                  </l1>
                  <l1>
                    2,5L: {sugertaoLatas.l25}
                  </l1>
                  <l1>
                    0,5: {sugertaoLatas.l05}
                  </l1>
                </ul>

              </div>

            </div>

          </div>
         

        </div>
        

    </>
  )
}

export default App
