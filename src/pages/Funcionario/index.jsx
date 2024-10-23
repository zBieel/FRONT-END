import React from 'react';
import { Link } from 'react-router-dom';
import PrivateRoute from '../../components/PrivateRoute';
import AgendamentoForm from '../../components/AgendamentoForm';
import ListarAgendamentos from '../../components/ListarAgendamentos ';

function Funcionario(){

    return(
        <PrivateRoute>
        <div>
            <center><h1>Listar Agendamento</h1></center>
            <AgendamentoForm/>
        </div>
        </PrivateRoute>
    )

}

export default Funcionario;