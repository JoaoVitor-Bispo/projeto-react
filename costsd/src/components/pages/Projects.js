import Message from "../layout/Message"
import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import styles from './Projects.module.css'
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../project/ProjectCard"

function Project() {
    
    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setProjects(projects.filter(elements => elements.id !== id))
        })
        .catch(error => console.log(error))
    }
    
    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setProjects(data)
        })
        .catch(error => console.log(error))
    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to={'/newproject'} text={'Novo Projeto'}/>
            </div>
            {message && (
                <Message msg={message} type={'success'}/>
            )}
            <Container customClass={'start'}>
                {projects.length > 0 && 
                    projects.map((element) => 
                        <ProjectCard id={element.id} nome={element.nomeProjeto} key={element.id} category={element?.category?.name} orçamento={element.orçamento} handleRemove={removeProject}/>
                    )
                }
            </Container>
        </div>
    )

}
export default Project