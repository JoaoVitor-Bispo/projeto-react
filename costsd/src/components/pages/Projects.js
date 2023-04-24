import Message from "../layout/Message"
import { Link, useLocation } from "react-router-dom"
import styles from './Projects.module.css'
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"

function Project() {
    
    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to={'/newproject'} text={'Novo Projeto'}/>
            </div>
            {message && (
                <Message msg={message} type={'success'}/>
            )}
            <Container customClass={'start'}/>
            <p>Projeto</p>
        </div>
    )

}
export default Project