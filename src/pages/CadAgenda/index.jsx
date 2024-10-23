import './cadAgenda.css';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "../../services/api";
import Header from "../Header";
import React, { useState } from 'react';

const Agendamento = () => {
  const [dataHoraAgendamento, setDataHoraAgendamento] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    navigate('/login'); // Redireciona para a página de login
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Recuperar o token do localStorage
      const token = localStorage.getItem('token')
      const decodedToken = jwtDecode(token)
      const userId = decodedToken.id

      // Configurar os dados para enviar ao backend
      const agendamentoData = {
        userId,
        dataAgendamento,
        dataHoraAgendamento           
      };

      // Fazer a requisição ao backend com o token no cabeçalho
      const response = await api.post('/clientes/agendamento', agendamentoData, {
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
              {...register("nome", { required: "Nome é obrigatório." })}
            />
            {errors.nome && <span className="error">{errors.nome.message}</span>}
          </div>
          <div>
            <label>Telefone</label>
            <input
              type="tel"
              placeholder="Telefone do Cliente"
              {...register("telefone", { 
                required: "Telefone é obrigatório.", 
                pattern: { 
                  message: "Telefone inválido." 
                }
              })}
            />
            {errors.telefone && <span className="error">{errors.telefone.message}</span>}
          </div>
          <div>
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Email do Cliente"
              {...register("email", { 
                required: "E-mail é obrigatório.", 
                pattern: { 
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, 
                  message: "E-mail inválido." 
                } 
              })}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>
          <div>
            <label>Data e Hora</label>
            <input
              type="datetime-local"
              {...register("dataHora", { required: "Data e hora são obrigatórias." })}
            />
            {errors.dataHora && <span className="error">{errors.dataHora.message}</span>}
          </div>
          <div>
            <button type="submit">Agendar</button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Agendamento;
