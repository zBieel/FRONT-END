import './header.css';

function Header(){

    return(
            <header>
                <a className="logo"><img src="./src/assets/LogoBranca.png" className='imgLogo'/></a>
                <a href="/formulario" className="formulario">Formulários</a>
                <a href="/listaFuncionario" className="lista-funcionario">Funcionários</a>
                <a href="/ListarAgendamentos" className="agenda">Agenda</a>
            </header>
    )

}

export default Header;