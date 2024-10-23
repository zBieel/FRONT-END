import React, { useState } from 'react';
import api from "./../services/api";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Header from "../pages/Header";
import './agendamentoForm.css'; // Importe o CSS

const AgendamentoForm = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [horarioAgendamento, setHorarioAgendamento] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    navigate('/'); // Redireciona para a página de login
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const agendamentoData = {
        userId,
        nome,
        telefone,
        email,
        dataAgendamento,
        horarioAgendamento,
      };

      const response = await api.post('/funcionarios/agendamento', agendamentoData, {
        headers: {
          Authorization: `Bearer ${token}` // Enviando o token no cabeçalho
        }
      });

      console.log('Agendamento realizado:', response.data);
    } catch (error) {
      console.error('Erro ao agendar:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <form onSubmit={handleSubmit} className="form-group">
          <div>
            <label>Nome</label>
            <input 
              type="text" 
              placeholder="Nome do Cliente"
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label>Telefone</label>
            <input 
              type="tel" 
              placeholder="Telefone do Cliente"
              value={telefone} 
              onChange={(e) => setTelefone(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Email do Cliente"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label>Data:</label>
            <input 
              type="date"
              value={dataAgendamento}
              onChange={(e) => setDataAgendamento(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Hora:</label>
            <input 
              type="time"
              value={horarioAgendamento} 
              onChange={(e) => setHorarioAgendamento(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Agendar</button>
        </form>
        <button className="logout-button" onClick={handleLogout}>Sair</button>
      </div>
    </>
  );
};

export default AgendamentoForm;
