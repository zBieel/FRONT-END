import './cadAgenda.css';
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "../../services/api";
import Header from "../Header";

const Agendamento = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("clientes/agendamento", {
        nome: data.nome,
        telefone: data.telefone,
        email: data.email,
        dataHora: data.dataHora,
      });
      console.log(response.data);
      toast.success("Agendamento realizado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao realizar agendamento. Tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form-group">
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
                  value: /^[0-9]{10,11}$/, 
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
