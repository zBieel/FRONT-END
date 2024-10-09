import {BrowserRouter, Routes, Route, Router } from 'react-router-dom'

import Header from './pages/Header';
import Home from './pages/Home';
import Usuario from './pages/Usuario';
import ListaUsuario from './pages/ListaUsuario';
import Login from './pages/Login';
import CadFuncionario from './pages/CadFuncionario'
import Funcionario from './pages/Funcionario'



function RoutesApp(){
 return(
    <BrowserRouter>
        <Login />
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/usuario" element={<Usuario/>}/>
                <Route path="/funcionario" element={<Funcionario/>}/>
                <Route path="/lista" element={<ListaUsuario/>}/>
                <Route path="/CadFuncionario" element={<CadFuncionario/>}/>
            </Routes>
    </BrowserRouter>
 )
}
export default RoutesApp;
