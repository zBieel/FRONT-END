import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './agenda.css';
import api from "../../services/api";
import Header from "../Header";

const ListaAgendamento = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("users/")
      .then(response => {
        console.log(response.data);
        setAgendamentos(response.data);
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
        <span>Tem certeza que deseja excluir este agendamento?</span>
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const confirmDelete = (id) => {
    api.delete(`users/${id}`)
      .then(() => {
        setAgendamentos(agendamentos.filter(item => item.id !== id));
        toast.success("Agendamento excluído com sucesso!");
      })
      .catch(error => {
        setError(error.message);
        toast.error("Erro ao excluir o agendamento.");
      });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ nome: user.nome, email: user.email });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    api.put(`users/${editingUser.id}`, formData)
      .then(() => {
        setData(data.map(agendamento => agendamento.id === editingUser.id ? { ...agendamento, ...formData } : agendamento));
        setEditingUser(null);
        toast.success("Usuário atualizado com sucesso!");
      })
      .catch(error => {
        setError(error.message);
        toast.error("Erro ao atualizar o usuário.");
      });
  };

  if (loading) return <p className="message">Carregando...</p>;
  if (error) return <p className="message error">Erro: {error}</p>;

  return (
    <>
      <Header />
      <a href="/AgendamentoForm" className="cad-agenda">Novo Agendamento</a>
      <div className="list-container">
        <ul>
          {agendamentos.map(agendamento => (
            <li key={agendamento.id}>
              <strong>Nome:</strong> {agendamento.nome}
              <br />
              <strong>Telefone:</strong> {agendamento.telefone}
              <br />
              <strong>Email:</strong> {agendamento.email}
              <br />
              <strong>Data e Hora:</strong> {new Date(agendamento.dataHora).toLocaleString()}
              <br />
              <button onClick={() => handleEdit(item)} className="edit-button">Editar</button>
              <button onClick={() => handleDelete(agendamento.id)} className="delete-button">Excluir</button>
              <button className="logout-button" onClick={handleLogout}>Sair</button>
            </li>
          ))}
        </ul>
        <ToastContainer />
      </div>
    </>
  );
};

export default ListaAgendamento;
