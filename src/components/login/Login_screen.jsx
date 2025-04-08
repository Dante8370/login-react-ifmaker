import { useState } from 'react';
import './login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import logo from './imgs/logo.png';

import { auth, googleProvider, db } from '../../firebase/firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Login_screen() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isIfpi, setIsIfpi] = useState(false);
  const [noProfession, setNoProfession] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [curso, setCurso] = useState('');
  const [escolaridade, setEscolaridade] = useState([]);
  const [profissao, setProfissao] = useState('');

  const cursosIFPI = ['Informática', 'Eletrotécnica', 'Edificações', 'Agropecuária', 'Administração'];

  const toggleForm = () => {
    setIsRegistering(prev => !prev);
    setIsIfpi(false);
    setNoProfession(false);
    setEmail('');
    setSenha('');
    setConfirmSenha('');
    setCurso('');
    setEscolaridade([]);
    setProfissao('');
  };

  const handleEscolaridadeChange = (e, nivel) => {
    if (e.target.checked) {
      setEscolaridade(prev => [...prev, nivel]);
    } else {
      setEscolaridade(prev => prev.filter(item => item !== nivel));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("Tentando cadastrar usuário...");
    console.log("Email:", email);
    console.log("Senha:", senha);
    console.log("Confirmação de senha:", confirmSenha);
    console.log("isIfpi:", isIfpi);
    console.log("Curso:", curso);
    console.log("Escolaridade:", escolaridade);
    console.log("Profissão:", profissao);
    console.log("Sem profissão:", noProfession);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Digite um e-mail válido.");
      return;
    }

    if (senha.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (senha !== confirmSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    if (isIfpi && curso === "") {
      alert("Selecione seu curso.");
      return;
    }

    if (!isIfpi && escolaridade.length === 0) {
      alert("Selecione pelo menos uma escolaridade.");
      return;
    }

    if (!noProfession && profissao.trim() === "") {
      alert("Digite sua profissão ou marque 'Sem profissão'.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      const dadosUsuario = {
        email,
        isIfpi,
        ...(isIfpi ? { curso } : {}),
        ...(!isIfpi ? { escolaridade } : {}),
        ...(!noProfession ? { profissao: profissao.trim() } : { profissao: "Sem profissão" }),
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, "usuarios", user.uid), dadosUsuario);

      alert("Cadastro realizado com sucesso!");
      console.log("Usuário cadastrado:", user.uid);
    } catch (error) {
      console.error("Erro Firebase:", error);
      if (error.code === 'auth/email-already-in-use') {
        alert("Este e-mail já está em uso.");
      } else {
        alert("Erro ao cadastrar: " + error.message);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      alert("Login realizado com sucesso!");
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Login com Google realizado!");
    } catch (error) {
      alert("Erro ao fazer login com Google: " + error.message);
    }
  };

  return (
    <div className="main-container">
      <form className="body" onSubmit={isRegistering ? handleRegister : handleLogin}>
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
                    <div className="checkbox-group escolaridade-grid">
                      <label><input type="checkbox" onChange={(e) => handleEscolaridadeChange(e, 'Ensino Fundamental')} /> Ensino Fundamental</label>
                      <label><input type="checkbox" onChange={(e) => handleEscolaridadeChange(e, 'Ensino Médio')} /> Ensino Médio</label>
                      <label><input type="checkbox" onChange={(e) => handleEscolaridadeChange(e, 'Ensino Técnico')} /> Ensino Técnico</label>
                      <label><input type="checkbox" onChange={(e) => handleEscolaridadeChange(e, 'Ensino Superior')} /> Ensino Superior</label>
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
            <button type="submit">Entrar</button>
            <button type="button" onClick={handleGoogleLogin} className="btn-google">Entrar com Google</button>
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

