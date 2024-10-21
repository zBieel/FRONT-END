import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './listausuario.css';
import api from "../../services/api";
import Header from "../Header";

const DataList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ nome: "", email: "" });

  useEffect(() => {
    api.get("users/funcionario")
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

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ nome: user.nome, email: user.email });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    api.put(`users/funcionario${editingUser.id}`, formData)
      .then(() => {
        setData(data.map(item => item.id === editingUser.id ? { ...item, ...formData } : item));
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
      <a href="/CadFuncionario" className="usuario">Cadastrar Funcionario</a>

      <div className="list-container">
        {editingUser ? (
          <div className="edit-form">
            <h2>Editar Usuário</h2>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Nome"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <button onClick={handleUpdate} className="update-button">Atualizar</button>
            <button onClick={() => setEditingUser(null)} className="cancel-button">Cancelar</button>
          </div>
        ) : (
          <ul>
            {data.map(item => (
              <li key={item.id}>
                <strong>Nome:</strong> {item.nome}
                <br />
                <br />
                <strong>Email:</strong> {item.email}
                <br />
                <br />
                <button onClick={() => handleEdit(item)} className="edit-button">Editar</button>
                <button onClick={() => handleDelete(item.id)} className="delete-button">Excluir</button>
              </li>
            ))}
          </ul>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default DataList;