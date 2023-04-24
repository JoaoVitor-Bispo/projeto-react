import styles from './NewProject.module.css'
import ProjectForm from '../project/ProjectForm'
import {useNavigate} from 'react-router-dom'
import Project from './Projects'

function NewProject() {
    const navigate = useNavigate()
    function submitProject(project) {
        project.costs = 0
        project.services = []
        fetch('http://localhost:5000/projects', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            navigate('/projetos', {state: {
                message: 'Projeto criado com sucesso'
                }
            })
        })
    }
    
    return (
        <div className={styles.newProject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie projetos para depois gerenciar os serviços</p>
            <ProjectForm addProject={submitProject}/>
        </div>
    )
}
export default NewProject