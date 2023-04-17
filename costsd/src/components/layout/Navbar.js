import {Link} from 'react-router-dom';
import Container from './Container';
import logo from '../../img/costs_logo.png'
import styles from './Navbar.module.css'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to={"/"}>
                    <img src={logo}/>
                </Link>
                <ul className={styles.list}>
                    <li className={styles.items}><Link to={"/"}>Home</Link></li>
                    <li className={styles.items}><Link to={"/projetos"}>Projetos</Link></li>
                    <li className={styles.items}><Link to={"/empresa"}>Empresa</Link></li>
                    <li className={styles.items}><Link to={"/contato"}>Contato</Link></li>
                </ul>
            </Container>
        </nav>
    )
}
export default Navbar;