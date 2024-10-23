import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './listarAgendamentos.css';
import api from './../services/api';
import Header from "../pages/Header";

const ListarAgendamentos = () => {
  const [agendamento, setAgendamento] = useState([]);
  const [editingAgendamento, setEditingAgendamento] = useState(null);
  const [formData, setFormData] = useState({ nome: "", telefone: "", email: "", dataAgendamento: "", horarioAgendamento: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgendamento = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('funcionarios/agendamentos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAgendamento(response.data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };

    fetchAgendamento();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleDelete = async (id) => {
    toast.warn(
      <div>
        <p>Tem certeza que deseja excluir o agendamento?</p>
        <button onClick={() => confirmDelete(id)} className="confirm-button">Confirmar</button>
        <button onClick={cancelDelete} className="cancel-button">Cancelar</button>
      </div>,
      {
        autoClose: false,
      }
    );
  };

  const confirmDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`funcionarios/agendamento/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAgendamento(agendamento.filter(item => item.id !== id));
      toast.dismiss();
      toast.success("Agendamento excluído com sucesso!");
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
      toast.error("Erro ao excluir agendamento.");
    }
  };

  const cancelDelete = () => {
    toast.dismiss();
  };

  const handleEdit = (agendamento) => {
    setEditingAgendamento(agendamento);
    setFormData({
      nome: agendamento.nome,
      telefone: agendamento.telefone,
      email: agendamento.email,
      dataAgendamento: agendamento.dataAgendamento,
      horarioAgendamento: agendamento.horarioAgendamento
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`funcionarios/agendamento/${editingAgendamento.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAgendamento(agendamento.map(item => item.id === editingAgendamento.id ? { ...item, ...formData } : item));
      setEditingAgendamento(null);
      toast.success("Agendamento atualizado com sucesso!");
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
      toast.error("Erro ao atualizar agendamento.");
    }
  };

  return (
    <>
      <Header />
      <a href="/AgendamentoForm" className="cad-agenda">Novo Agendamento</a>
      <div className="list-container">
        <h2>Agendamentos</h2>
        {editingAgendamento ? (
          <div className="edit-form">
            <h2>Editar Agendamento</h2>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Nome"
            />
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              placeholder="Telefone"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="date"
              name="dataAgendamento"
              value={formData.dataAgendamento}
              onChange={handleInputChange}
              placeholder="Data"
            />
            <input
              type="time"
              name="horarioAgendamento"
              value={formData.horarioAgendamento}
              onChange={handleInputChange}
              placeholder="Horário"
            />
            <button onClick={handleUpdate} className="update-button">Atualizar</button>
            <button onClick={() => setEditingAgendamento(null)} className="cancel-button">Cancelar</button>
          </div>
        ) : (
          <ul>
            {agendamento.length > 0 ? (
              agendamento.map((agendamento) => (
                <li key={agendamento.id}>
                  <strong>Nome:</strong> {agendamento.nome}
                  <br />
                  <strong>Telefone:</strong> {agendamento.telefone}
                  <br />
                  <strong>Email:</strong> {agendamento.email}
                  <br />
                  <strong>Data:</strong> {agendamento.dataAgendamento}
                  <br />
                  <strong>Horário:</strong> {agendamento.horarioAgendamento}
                  <button onClick={() => handleEdit(agendamento)} className="edit-button">Editar</button>
                  <button onClick={() => handleDelete(agendamento.id)} className="delete-button">Excluir</button>
                  <button className="logout-button" onClick={handleLogout}>Sair</button>
                </li>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhum agendamento encontrado</td>
              </tr>
            )}
          </ul>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default ListarAgendamentos;