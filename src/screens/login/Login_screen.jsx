import { useState } from 'react';
import './login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import logo from './imgs/logo.png';

function Login_screen() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isIfpi, setIsIfpi] = useState(false);
  const [noProfession, setNoProfession] = useState(false);

  const cursosIFPI = ['Informática', 'Eletrotécnica', 'Edificações', 'Agropecuária', 'Administração'];

  const toggleForm = () => {
    setIsRegistering(prev => !prev);
    setIsIfpi(false); 
    setNoProfession(false);
  };

  return (
    <div className="main-container">
      <form className="body">
        <div className="logo">
          <h1> Seja bem-vindo ao </h1>
          <img src={logo} alt="Logo IFMAKER" className="logo-img" />
        </div>

        {isRegistering ? (
          <>
            <p className='subtitle'>Crie sua conta</p>
            <div className="cadastro-container">
              <div className="cadastro-coluna esquerda">
                <div className="input-field">
                  <FaUser className="icon" />
                  <input type="email" placeholder="Digite seu e-mail" required />
                </div>
                <div className="input-field">
                  <FaLock className="icon" />
                  <input type="password" placeholder="Digite sua senha" required />
                </div>
                <div className="input-field">
                  <FaLock className="icon" />
                  <input type="password" placeholder="Confirme sua senha" required />
                </div>
              </div>

              <div className="cadastro-coluna direita">
                <div className="input-curso">
                  <label className='checkbox-group'>
                    <input
                      type="checkbox"
                      checked={isIfpi}
                      onChange={(e) => setIsIfpi(e.target.checked)}
                    />
                    Sou do IFPI
                  </label>
                  <label className='checkbox-group'>
                    <input
                      type="checkbox"
                      checked={!isIfpi}
                      onChange={(e) => setIsIfpi(!e.target.checked)}
                    />
                    Não sou de uma instituição
                  </label>
                </div>

                {isIfpi && (
                  <div className="input-field">
                    <label htmlFor="curso">Qual seu curso?</label>
                    <select id="curso" required>
                      {cursosIFPI.map((curso, i) => (
                        <option key={i} value={curso}>{curso}</option>
                      ))}
                    </select>
                  </div>
                )}

                {!isIfpi && (
                  <>
                    <label className='text-box'>Escolaridade:</label>
                    <div className="checkbox-group">
                      <div className="escolaridade-grid">
                        <label><input type="checkbox" /> Ensino Fundamental</label>
                        <label><input type="checkbox" /> Ensino Médio</label>
                        <label><input type="checkbox" /> Ensino Técnico</label>
                        <label><input type="checkbox" /> Ensino Superior</label>
                      </div>
                    </div>
                  </>
                )}
                <p>Qual sua profissão?</p>
                <div className="input-profissao">
                  <label className='checkbox-pro'>
                    <input
                      type="checkbox"
                      checked={noProfession}
                      onChange={() => setNoProfession(!noProfession)}
                    />
                    Não tenho profissão
                  </label>
                  {!noProfession && (
                    <input className='input-pro' type="text" placeholder="Profissão" />
                  )}
                </div>
              </div>
            </div>
            <button type="submit" className="btn-cadastrar">Cadastrar</button>
            <div className='signup-link'>
              <p>
                Já tem conta? <a onClick={toggleForm}>Entrar</a>
              </p>
            </div>
            
          </>
        ) : (
          <>
            <p className='subtitle'>Preencha as informações para realizar o login!</p>
            <div className="input-field">
              <FaUser className="icon" />
              <input type="text" placeholder="Digite um E-mail!" />
            </div>
            <div className="input-field">
              <FaLock className="icon" />
              <input type="password" placeholder="Digite sua senha!" />
            </div>
            <div className="recall-forget">
              <label>
                <input type="checkbox" />
                lembre de mim
              </label>
              <a href="#">Esqueceu a senha?</a>
            </div>
            <button type="submit">Entrar</button>
            <div className='signup-link'>
              <p>
                Não tem conta? <a onClick={toggleForm}>Cadastrar</a>
              </p>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default Login_screen;
