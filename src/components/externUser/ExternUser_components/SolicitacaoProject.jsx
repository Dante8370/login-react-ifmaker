import React, { useState } from 'react';
import { db, storage } from '../../../firebase/firebase-config';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import './Solicitacao.css'


const SolicitacaoProjeto = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [area, setArea] = useState('');
  const [justificativa, setJustificativa] = useState('');
  const [anexo, setAnexo] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    try {
      let urlAnexo = null;

      if (anexo) {
        const anexoRef = ref(storage, `anexos/${uuidv4()}-${anexo.name}`);
        const snapshot = await uploadBytes(anexoRef, anexo);
        urlAnexo = await getDownloadURL(snapshot.ref);
      }

      const projeto = {
        titulo,
        descricao,
        area,
        justificativa,
        anexoUrl: urlAnexo || '',
        status: 'Aguardando avaliação',
        dataEnvio: new Date()
      };

      await addDoc(collection(db, 'projetos'), projeto);

      alert('Projeto enviado com sucesso!');
      setTitulo('');
      setDescricao('');
      setArea('');
      setJustificativa('');
      setAnexo(null);
    } catch (error) {
      console.error('Erro ao enviar projeto:', error);
      alert('Erro ao enviar projeto.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
    <div className="box-container">
    <div className="title">
        <h2>Solicitação de Projeto</h2>
      </div>
    <div className="container-formulario">
      
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>Título do Projeto</label>
          <input
            type="text"
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Descrição</label>
          <textarea
            required
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Área de Interesse</label>
          <input
            type="text"
            required
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Justificativa</label>
          <textarea
            required
            value={justificativa}
            onChange={(e) => setJustificativa(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Anexo (opcional)</label>
          <input
            type="file"
            onChange={(e) => setAnexo(e.target.files[0])}
          />
        </div>

        <button type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar Projeto'}
        </button>
      </form>
    </div>
    </div>
    </>
  );
};

export default SolicitacaoProjeto;
