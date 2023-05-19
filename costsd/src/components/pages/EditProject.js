import { createPath, useParams } from "react-router-dom"
import {parse, v4 as uuidv4} from 'uuid'
import { useState, useEffect } from "react"
import Container from "../layout/Container"
import ProjectForm from '../project/ProjectForm'
import Message from "../layout/Message"
import styles from './EditProject.module.css'
import Loading from '../../img/loading.svg'
import ServiceForm from "../service/ServiceForm"
import ServiceCard from "../service/ServiceCard"

function EditProject() {

    const { id } = useParams()
    const [showProject, setShowProject] = useState(false)
    const [showServices, setShowServices] = useState(false)
    const [services, setServices] = useState([])
    
    function toggleShowProject() {
        showProject ? setShowProject(false) :  setShowProject(true)
    }

    function toggleShowServices() {
        showServices ? setShowServices(false) :  setShowServices(true)
    }

    const [project, setProject] = useState([])

    function createService(project) {
        setMessage('')

        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        
        const lastServiceCost = lastService.custo

        const newCost = parseFloat(project.costs) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.orçamento)) {
            setMessage('Valor ultrapassado do total do orçamento')
            setTypeMessage('error')
            project.services.pop()
            return false
        }
        project.costs = newCost
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setMessage('Serviço adicionado com sucesso')
            setTypeMessage('success')
        })
        .catch(error => console.log(error))
    }
    
    let costs = project.costs
    let serviços = project.services
    
    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                setProject(data)
                setServices(data.services)
            })
            .catch(error => console.log(error))
        }, 3000);
    }, [id])
    
    const [typeMessage, setTypeMessage] = useState('')
    const [message, setMessage] = useState('')

    function editPost(project) {
        project.costs = costs
        project.services = serviços

        setMessage('')
        if(project.orçamento < project.costs) {
            setMessage('O valor do orçamento não pode ser menor que o valor total de gastos.')
            setTypeMessage('error')
            return false
        }
        fetch(`http://localhost:5000/projects/${id.id}`, {
            method: 'PATCH',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(response => response.json())
        .then(data => {
            setProject(data)
            setShowProject(false)
            setMessage('Projeto atualizado com sucesso')
            setTypeMessage('success')
        })
        .catch(() => {
            setMessage('Falha ao atualizar o projeto.')
            setTypeMessage('error')
        })
    }

    function removeService(id, custo) {
        const servicesUpdate = project.services.filter(element => element.id !== id)

        const projectUpdate = project
        projectUpdate.services = servicesUpdate
        
        projectUpdate.costs = parseFloat(projectUpdate.costs) - parseFloat(custo)

        fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
            method: 'PATCH',
            body: JSON.stringify(projectUpdate),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setProject(data)
            setServices(data.services)
        })
        .catch(error => console.log(error))
    }

    return (
        <>
            {project.nomeProjeto ? (
                <div className={styles.project_details}>
                    <Container customClass='column'>
                        {message ?? (<Message type={typeMessage} msg={message}/>)}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.nomeProjeto}</h1>
                            <button className={styles.btn} onClick={toggleShowProject}>
                                {showProject ? 'Fechar' : 'Editar Projeto'}
                            </button>
                            {!showProject ? (
                                <div className={styles.form}>
                                    <p><span>Categoria: </span>{project?.category?.name}</p>
                                    <p><span>Orçamento: </span>R${project.orçamento}</p>
                                    <p><span>Total Gasto: </span>R${project.costs}</p>
                                </div>
                            ) : (
                                <div className={styles.form}>
                                    <ProjectForm addProject={editPost}/>
                                </div>
                            )}
                        </div>
                        <div className={styles.details_container}>
                            <h2>Adicione serviços</h2>
                            <button className={styles.btn} onClick={toggleShowServices}>
                                {showServices ? 'Fechar' : 'Adicionar serviços'}
                            </button>
                            <div className={styles.form}>
                                {
                                    showServices && <ServiceForm btnText={'Cadastrar senrviço'} handleSubmit={createService} projectData={project}/>
                                }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass='start'>
                            {services.length > 0 && (
                                services.map(service => (
                                    <ServiceCard id={service.id} nome={service.nome} custo={service.custo} descriçao={service.descriçao} key={service.id} handleRemove={removeService}/>
                                ))
                            )}
                            {services.length === 0 && (<p>Não há serviços registrados.</p>)}
                        </Container>
                    </Container>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    )
}
export default EditProject