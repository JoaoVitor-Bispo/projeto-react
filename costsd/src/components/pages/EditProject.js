import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Container from "../layout/Container"
import ProjectForm from '../project/ProjectForm'
import Message from "../layout/Message"
import styles from './EditProject.module.css'
import Loading from '../../img/loading.svg'

function EditProject() {

    const id = useParams()
    
    const [showProject, setShowProject] = useState(false)

    function toggleShowProject() {
        showProject ? setShowProject(false) :  setShowProject(true)
    }

    const [project, setProject] = useState('')
    
    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                setProject(data)
            })
            .catch(error => console.log(error))
        }, 3000);
    }, [id])
    
    const [message, setMessage] = useState()
    const [typeMessage, setTypeMessage] = useState([])

    function editPost(project) {
        setMessage('')
        if(project.orçamento < project.costs) {
            setMessage('O valor do orçamento não pode ser menor que o valor total de gastos.')
            setTypeMessage('error')
            stop()
            return false
        }
        fetch(`http://localhost:5000/projects/${id.id}`, {
            method: 'PUT',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(response => response.json())
        .then(data => {
            setProject(project)
            setShowProject(false)
            setMessage('Projeto atualizado com sucesso')
            setTypeMessage('success')
        })
        .catch(() => {
            setMessage('Falha ao atualizar o projeto.')
            setTypeMessage('error')
        })
    }

    return (
        <>
            {project.nomeProjeto ? (
                <div className={styles.project_details}>
                    <Container customClass='column'>
                        {message && (<Message type={typeMessage} msg={message}/>)}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.nomeProjeto}</h1>
                            <button className={styles.btn} onClick={toggleShowProject}>
                                {showProject ? 'Fechar' : 'Editar Projeto'}
                            </button>
                            {!showProject ? (
                                <div className={styles.form}>
                                    <p><span>Categoria: </span>{project.category.name}</p>
                                    <p><span>Orçamento: </span>R${project.orçamento}</p>
                                    <p><span>Total Gasto: </span>R${project.costs}</p>
                                </div>
                            ) : (
                                <div className={styles.form}>
                                    <ProjectForm addProject={editPost}/>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    )
}
export default EditProject