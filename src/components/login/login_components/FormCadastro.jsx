import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

const FormCadastro = ({
  email, senha, confirmSenha, setEmail, setSenha, setConfirmSenha,
  isIfpi, setIsIfpi,
  noProfession, setNoProfession,
  curso, setCurso, cursosIFPI = ["Administração", "Agropecuária", "Agronomia", "Bach. Administração", "Biologia" ],
  escolaridade, setEscolaridade,
  profissao, setProfissao,
  handleRegister, toggleForm
}) => {
  // Função local para lidar com mudança de escolaridade (corrigido)
  const handleEscolaridadeChange = (e, nivel) => {
    if (e.target.checked) {
      setEscolaridade([...escolaridade, nivel]);
    } else {
      setEscolaridade(escolaridade.filter(item => item !== nivel));
    }
  };

  return (
    <>
      <p className='subtitle'>Crie sua conta</p>
      <div className="cadastro-container">
        <div className="cadastro-coluna esquerda">
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

        <div className="cadastro-coluna direita">
          <div className="input-curso">
            <label className='checkbox-group'>
              <input
                type="radio"
                name="instituicao"
                checked={isIfpi}
                onChange={() => setIsIfpi(true)}
              />
              Sou do IFPI
            </label>
            <label className='checkbox-group'>
              <input
                type="radio"
                name="instituicao"
                checked={!isIfpi}
                onChange={() => setIsIfpi(false)}
              />
              Não sou de uma instituição
            </label>
          </div>

          {isIfpi && (
            <div className="input-field">
              <label htmlFor="curso">Qual seu curso?</label>
              <select id="curso" required value={curso} onChange={(e) => setCurso(e.target.value)}>
                <option value="">Selecione...</option>
                {cursosIFPI.map((curso, i) => (
                  <option key={i} value={curso}>{curso}</option>
                ))}
              </select>
            </div>
          )}

          {!isIfpi && (
            <>
              <label className='text-box'>Escolaridade:</label>
              <div className="container-check">
                <div className="checkbox-group escolaridade-grid">
                  {['Ensino Fundamental', 'Ensino Médio', 'Ensino Técnico', 'Ensino Superior'].map((nivel, i) => (
                    <label key={i}>
                      <input
                        type="checkbox"
                        checked={escolaridade.includes(nivel)}
                        onChange={(e) => handleEscolaridadeChange(e, nivel)}
                      />
                      {nivel}
                    </label>
                  ))}
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
              <input
                className='input-pro'
                type="text"
                placeholder="Profissão"
                value={profissao}
                onChange={(e) => setProfissao(e.target.value)}
              />
            )}
          </div>
        </div>
      </div>

      <button type="submit" className="btn-cadastrar" onClick={handleRegister}>Cadastrar</button>
      <div className='signup-link'>
        <p>
          Já tem conta? <a onClick={toggleForm}>Entrar</a>
        </p>
      </div>
    </>
  );
};

export default FormCadastro;
