import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

const FormLogin = ({ email, senha, setEmail, setSenha, handleLogin, handleGoogleLogin, toggleForm }) => {
  return (
    <>
      <p className='subtitle'>Preencha as informações para realizar o login!</p>
      <div className="input-field">
        <FaUser className="icon" />
        <input
          type="text"
          placeholder="Digite um E-mail!"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-field">
        <FaLock className="icon" />
        <input
          type="password"
          placeholder="Digite sua senha!"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      <div className="recall-forget">
        <label>
          <input type="checkbox" />
          lembre de mim
        </label>
        <a href="#">Esqueceu a senha?</a>
      </div>
      <button onClick={handleLogin}>Entrar</button>
      <button type="button" onClick={handleGoogleLogin} className="btn-google">Entrar com Google</button>
      <div className='signup-link'>
        <p>
          Não tem conta? <a onClick={toggleForm}>Cadastrar</a>
        </p>
      </div>
    </>
  );
};

export default FormLogin;
