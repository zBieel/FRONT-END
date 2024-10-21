import './header.css';

function Header(){

    return(
            <header>
                <a className="logo"><img src="./src/assets/LogoBranca.png" className='imgLogo'/></a>
                <a href="/listaCliente" className="lista">Formulários</a>
                <a href="/listaFuncionario" className="lista">Funcionários</a>
                <a href="/Agenda" className="usuario">Agenda</a>
            </header>
    )

}

export default Header;