import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './listarAgendamentos.css';
import api from './../services/api';
import Header from "../pages/Header";

const ListarAgendamentos = () => {
  const [agendamento, setAgendamento] = useState([]);
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
    localStorage.removeItem('token'); // Remove o token do localStorage
    navigate('/'); // Redireciona para a página de login
  };




  const handleDelete = async (id) => {
    toast.warn(
      <div>
        <p>Tem certeza que deseja excluir o agendamento?</p>
        <button onClick={() => confirmDelete(id)} className="confirm-button">Confirmar</button>
        <button onClick={cancelDelete} className="cancel-button">Cancelar</button>
      </div>,
      {
        autoClose: false, // Impede que o toast feche automaticamente
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
      toast.dismiss(); // Fecha o toast sem executar a exclusão
      toast.success("Agendamento excluído com sucesso!");
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
      toast.error("Erro ao excluir agendamento.");
    }
  };
  
  const cancelDelete = () => {
    toast.dismiss(); // Fecha o toast sem executar a exclusão
  };
  

  return (
    <>
      <Header />
      <a href="/AgendamentoForm" className="cad-agenda">Novo Agendamento</a>
      <div className="list-container">
        <h2>Agendamentos</h2>
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
        <ToastContainer />
      </div>
    </>
  );
};

export default ListarAgendamentos;