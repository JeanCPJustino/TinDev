import React, { useState } from 'react';
import './Login.css';
import api from '../services/api';
import logo from '../assets/logo.svg';

//QUANDO UTILIZAMOS "export default function" ANTES DO NOME DA FUNÇÃO,
//NÃO PRECISAMOS UTILIZAR A LINHA "export default Login" NO FINAL DO ARQUIVO
export default function Login({ history }){
  const [username, setUserName] = useState('');
  
  async function handleSubmit(e){
      e.preventDefault(); //PREVINE O COMPORTAMENTO DEFAULT DE REDIRECIONAMENTO DE PÁGINA

      const response = await api.post('/devs', {
          username,
      });

      const { _id } = response.data;

      history.push(`/dev/${_id}`);
  }

  return(
      <div className="login-container">
          <form onSubmit={handleSubmit}>
              <img src={logo} alt="Tindev" />                
              <input 
                  placeholder="Digite seu usuário no Github"
                  value={username}
                  onChange={e => setUserName(e.target.value)}
              />
              <button type="submit">Enviar</button>
          </form>
      </div>
  );
}