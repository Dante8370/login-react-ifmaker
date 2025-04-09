import { useState } from 'react';
import './login.css';
import logo from './imgs/logo.png';
import FormLogin from './login_components/FormLogin';
import FormCadastro from './login_components/FormCadastro';

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

  return (
    <div className="main-container">
      
      <form className="body" onSubmit={(e) => e.preventDefault()}>
        <div className="logo">
          <div>
          <h1> Seja bem-vindo ao </h1>
          <img src={logo} alt="Logo IFMAKER" className="logo-img" />
          </div>
        </div>

        {isRegistering ? (
          <FormCadastro
            email={email}
            setEmail={setEmail}
            senha={senha}
            setSenha={setSenha}
            confirmSenha={confirmSenha}
            setConfirmSenha={setConfirmSenha}
            isIfpi={isIfpi}
            setIsIfpi={setIsIfpi}
            curso={curso}
            setCurso={setCurso}
            escolaridade={escolaridade}
            setEscolaridade={setEscolaridade}
            profissao={profissao}
            setProfissao={setProfissao}
            noProfession={noProfession}
            setNoProfession={setNoProfession}
            toggleForm={toggleForm}
          />
        ) : (
          <FormLogin
            email={email}
            setEmail={setEmail}
            senha={senha}
            setSenha={setSenha}
            toggleForm={toggleForm}
          />
        )}
      </form>
    </div>
  );
}

export default Login_screen;
