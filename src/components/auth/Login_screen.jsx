import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import logo from './imgs/logo.png';
import FormLogin from './login_components/FormLogin';
import FormCadastro from './login_components/FormCadastro';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase-config';

function Login_screen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();
  const toggleForm = () => setIsLogin(!isLogin);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate('/user');
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Cria doc no Firestore se ainda não existir
      await setDoc(doc(db, 'usuarios', user.uid), {
        nome: user.displayName || '',
        email: user.email
      }, { merge: true });

      navigate('/user');
    } catch (error) {
      alert("Erro com login Google: " + error.message);
    }
  };

  const handleRegister = async () => {
    if (senha !== confirmSenha) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        nome,
        email
      });

      alert("Cadastro realizado com sucesso!");
      setIsLogin(true);
    } catch (error) {
      alert("Erro ao cadastrar: " + error.message);
    }
  };

  return (
    <div className="main-container">
      <form className="body" onSubmit={(e) => e.preventDefault()}>
        <div className="logo">
          <div>
            <h1> Seja bem-vindo ao </h1>
            <img src={logo} alt="Logo IFMAKER" className="logo-img" />
          </div>
        </div>

        {!isLogin ? (
          <FormCadastro
            nome={nome}
            setNome={setNome}
            email={email}
            setEmail={setEmail}
            senha={senha}
            setSenha={setSenha}
            confirmSenha={confirmSenha}
            setConfirmSenha={setConfirmSenha}
            handleRegister={handleRegister}
            toggleForm={toggleForm}
          />
        ) : (
          <FormLogin
            email={email}
            setEmail={setEmail}
            senha={senha}
            setSenha={setSenha}
            handleLogin={handleLogin}
            handleGoogleLogin={handleGoogleLogin}
            toggleForm={toggleForm}
          />
        )}
      </form>
    </div>
  );
}

export default Login_screen;
