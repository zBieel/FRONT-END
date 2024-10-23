import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './formulario.css';
import api from "../../services/api";
import Header from "../Header";

const DataList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    api.get("users/cliente")
      .then(response => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    toast.info(
      <div>
        <span>Tem certeza que deseja excluir este item?</span>
        <button 
          onClick={() => confirmDelete(id)} 
          className="confirm-button"
        >
          Confirmar
        </button>
      </div>, 
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const confirmDelete = (id) => {
    api.delete(`users/${id}`)
      .then(() => {
        setData(data.filter(item => item.id !== id));
        toast.success("Usuário excluído com sucesso!");
      })
      .catch(error => {
        setError(error.message);
        toast.error("Erro ao excluir o usuário.");
      });
  };

  if (loading) return <p className="message">Carregando...</p>;
  if (error) return <p className="message error">Erro: {error}</p>;

  return (
    <>
      <Header />
      <div className="container">
        <div className="header-container">
          <h1>Formulários de Clientes</h1>
          <div className="button-container">
          <button className="logout-button" onClick={handleLogout}>Sair</button>
          </div>
          </div>

          <div className="list-container">
            <h2>Lista de Formulários</h2>
            <ul className="user-list">
              {data.map(item => (
                <li key={item.id}>
                  <div className="user-info">
                    <strong>Nome:</strong> {item.nome}
                    <br />
                    <strong>Email:</strong> {item.email}
                    <br />
                    <strong>Telefone:</strong> {item.telefone}
                    <br />
                    <strong>Mensagem:</strong> {item.mensagem}
                  </div>
                  <div className="action-buttons">
                    <button onClick={() => handleDelete(item.id)} className="delete-button">Excluir</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default DataList;
