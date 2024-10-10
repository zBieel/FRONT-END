import './header.css';
import { Link } from 'react-router-dom'

function Header(){

    return(
            <header>
                <a href="/home" className="logo"><img src="./src/assets/LogoBranca.png" alt="" className='imgLogo'/></a>
                <a href="/lista" className="lista">Listar Usuario</a>
                <a href="/CadFuncionario" className="usuario">Cadastro Funcionario</a>
            </header>
    )

}

export default Header;