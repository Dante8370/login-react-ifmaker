import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

const FormCadastro = ({
  nome, setNome,
  email, setEmail,
  senha, setSenha,
  confirmSenha, setConfirmSenha,
  handleRegister,
  toggleForm
}) => {
  return (
    <>
      <p className='subtitle'>Crie sua conta</p>
      <div className="cadastro-container">
        <div className="cadastro-coluna esquerda">
          <div className="input-field">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Digite seu nome"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="input-field">
            <FaUser className="icon" />
            <input
              type="email"
              placeholder="Digite seu e-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Digite sua senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="input-field">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Confirme sua senha"
              required
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn-cadastrar" onClick={handleRegister}>
          Cadastrar
        </button>

        <div className='signup-link'>
          <p>
            Já tem conta? <a onClick={toggleForm} style={{ cursor: 'pointer' }}>Entrar</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default FormCadastro;

