import { useState } from 'react';
import './App.css'
import './grid.css'
import {verificaTamanhoParede, calculaPortaEJanela} from './services/services';

function App() {
  const [formData, setFormData] = useState({
    altura: '',
    largura: '',
    janelas: '',
    portas: ''
  });

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
    const portas = parseInt(formData.portas)

    verificaTamanhoParede({altura, largura})
    calculaPortaEJanela({altura, largura, janelas, portas})
    //console.log('Dados do formulário:', formData);
  };


  return (
    <>
      <div className='container'>
        <div className='grid'>

          <div className='grid_esquerda'>
            <h1>Descubra a quantidade de tinta!</h1>
            <h2> CODE CHALLENGE</h2>
          </div>

          <div className='grid_direita'>
            <form className='formulario' onSubmit={handleSubmit}>
              <h1>Preencha com os dados do comodo!</h1>

              <label htmlFor="altura" >Altura parede 1:</label>
              <input type='text' id='altura' name='altura'  value={formData.altura} onChange={handleChange} />

              <label htmlFor="largura" >largura parede 1:</label>
              <input type='text' id='largura' name='largura'  value={formData.largura} onChange={handleChange} />

              <label htmlFor="janelas">Quantidade de janelas:</label>
              <input type='text' id='janelas' name='janelas' value={formData.janelas} onChange={handleChange}/>

              <label htmlFor="portas">Quantidade de portas:</label>
              <input type='text' id='portas' name='portas' value={formData.portas} onChange={handleChange}/>

              <button type="submit">Enviar</button>
            </form>
          </div>


        </div>


      </div>

    </>
  )
}

export default App
