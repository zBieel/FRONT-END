import {BrowserRouter, Routes, Route, Router } from 'react-router-dom'

import Home from './pages/Home';
import ListaCliente from './pages/ListaCliente';
import ListaFuncionario from './pages/ListaFuncionario';
import Login from './pages/Login';
import CadFuncionario from './pages/CadFuncionario'

function RoutesApp(){
 return(
    <BrowserRouter>
            <Routes>
            <Route path="/" element={<Login/>}/>
                {/* <Route path="/home" element={<Home/>}/> */}
                <Route path="/listaCliente" element={<ListaCliente/>}/>
                <Route path="/listaFuncionario" element={<ListaFuncionario/>}/>
                <Route path="/CadFuncionario" element={<CadFuncionario/>}/>
            </Routes>
    </BrowserRouter>
 )
}
export default RoutesApp;
