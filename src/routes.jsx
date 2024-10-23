import {BrowserRouter, Routes, Route, Router } from 'react-router-dom'

import Formulario from './pages/Formulario';
import ListaFuncionario from './pages/ListaFuncionario';
import Login from './pages/Login';
import CadFuncionario from './pages/CadFuncionario'
// import CadAgenda from './pages/CadAgenda'
// import Agenda from './pages/Agenda'
import AgendamentoForm from './components/AgendamentoForm';
import ListarAgendamentos from './components/ListarAgendamentos ';

function RoutesApp(){
 return(
    <BrowserRouter>
            <Routes>
            <Route path="/" element={<Login/>}/>
                <Route path="/formulario" element={<Formulario/>}/>
                <Route path="/listaFuncionario" element={<ListaFuncionario/>}/>
                <Route path="/CadFuncionario" element={<CadFuncionario/>}/>
                {/* <Route path="/CadAgenda" element={<CadAgenda/>}/> */}
                {/* <Route path="/Agenda" element={<Agenda/>}/> */}
                <Route path="/AgendamentoForm" element={<AgendamentoForm/>}/>
                <Route path="/ListarAgendamentos" element={<ListarAgendamentos/>}/>

            </Routes>
    </BrowserRouter>
 )
}
export default RoutesApp;
