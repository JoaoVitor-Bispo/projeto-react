import styles from './NewProject.module.css'
import ProjectForm from '../project/ProjectForm'

function NewProject(project) {
    function submitProject() {
        fetch('http://localhost:5000/projects', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
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