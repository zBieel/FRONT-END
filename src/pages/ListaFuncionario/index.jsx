import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './listausuario.css';
import api from "../../services/api";
import Header from "../Header";

const DataList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ nome: "", email: "" });
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('users/funcionario', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleDelete = (id) => {
    toast.info(
      <div>
        <span>Tem certeza que deseja excluir este item?</span>
        <button onClick={() => confirmDelete(id)} className="confirm-button">Confirmar</button>
      </div>, 
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const confirmDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(data.filter(item => item.id !== id));
      toast.success("Usuário excluído com sucesso!");
    } catch (error) {
      setError(error.message);
      toast.error("Erro ao excluir o usuário.");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      nome: user.nome,
      email: user.email
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`users/${editingUser.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(data.map(item => item.id === editingUser.id ? { ...item, ...formData } : item));
      setEditingUser(null);
      toast.success("Usuário atualizado com sucesso!");
    } catch (error) {
      setError(error.message);
      toast.error("Erro ao atualizar o usuário.");
    }
  };

  if (loading) return <p className="message">Carregando...</p>;
  if (error) return <p className="message error">Erro: {error}</p>;

  return (
    <>
      <Header />
      <div className="container">
        <div className="header-container">
          <h1>Gestão de Funcionários</h1>
          <div className="button-container">
            <a href="/CadFuncionario" className="cad-funcionario">Cadastrar Funcionário</a>
            <button className="logout-button" onClick={handleLogout}>Sair</button>
          </div>
        </div>

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
            <>
              <h2>Lista de Funcionários</h2>
              <ul className="user-list">
                {data.map(item => (
                  <li key={item.id} className="user-item">
                    <div className="user-info">
                      <strong>Nome:</strong> {item.nome}
                      <br />
                      <strong>Email:</strong> {item.email}
                    </div>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(item)} className="edit-button">Editar</button>
                      <button onClick={() => handleDelete(item.id)} className="delete-button">Excluir</button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default DataList;