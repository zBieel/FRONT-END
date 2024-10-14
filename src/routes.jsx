import {BrowserRouter, Routes, Route, Router } from 'react-router-dom'

import Home from './pages/Home';
import ListaUsuario from './pages/ListaUsuario';
import Login from './pages/Login';
import CadFuncionario from './pages/CadFuncionario'

function RoutesApp(){
 return(
    <BrowserRouter>
            <Routes>
            <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/lista" element={<ListaUsuario/>}/>
                <Route path="/CadFuncionario" element={<CadFuncionario/>}/>
            </Routes>
    </BrowserRouter>
 )
}
export default RoutesApp;
