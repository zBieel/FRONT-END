import './header.css';

function Header(){

    return(
            <header>
                <a className="logo"><img src="./src/assets/LogoBranca.png" className='imgLogo'/></a>
                <a href="/listaCliente" className="lista">Listar Clientes</a>
                <a href="/listaFuncionario" className="lista">Listar Usuario</a>
                <a href="/CadFuncionario" className="usuario">Cadastro Funcionario</a>
            </header>
    )

}

export default Header;