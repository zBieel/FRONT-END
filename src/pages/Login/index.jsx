import './login.css';
import React, { useState, useEffect} from 'react';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const token = await login(email, senha);
      localStorage.setItem('token', token)
      const decodedToken = jwtDecode(token);
      console.log('Token Decodificado:', decodedToken)
      const { roles } = decodedToken;
      console.log('roles:', roles)
      if (roles == 'ROLE_FUNCIONARIO') {
        navigate('/listaFuncionario');
      } else {
        toast.error('Tipo de usuário desconhecido')
      }
    } catch (error) {
      toast.error('Falha no login. Verifique suas credenciais.');
    }
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="app-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <img src="./src/assets/logo.png" alt="Logo" className="logo" />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div className="form-group buttons-group">
          <button type="submit">Entrar</button>
          <span onClick={toggleTheme} className="theme-toggle-button">
            {theme === 'light' ? '🌙' : '☀️'}
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;