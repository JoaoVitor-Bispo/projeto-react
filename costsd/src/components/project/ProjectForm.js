import styles from './ProjectForm.module.css'
import Input from '../pages/form/Input'
import Select from '../pages/form/Select'
import SubmitButton from '../pages/form/SubmitButton'
import { useEffect, useState } from 'react'
import NewProject from '../pages/NewProject'

function ProjectForm({addProject}) {
    const [projectData, setprojectData] = useState([])

    const getProject = (e) => {
        e.preventDefault()
        setprojectData([...e.target.children])
        projectData.map((element) => {
            console.log(element.children[1] || [])
        })   
    }
    const [jsonData, setjsonData] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setjsonData(data)
        })
        .catch(error => console.log(error))
    }, [])
    return (
        <form onSubmit={getProject} className={styles.form}>
            <Input type='text' name='nomeProjeto' placeholder={"Insira o nome do projeto"} text={"Nome do Projeto"}/>
            <Input type='number' name='orçamento' placeholder={"Insira o orçamento do projeto"} text={"Orçamento total"}/>
            <Select name="id" text={"Selecione a categoria"} options={jsonData}/>
            <SubmitButton text="Enviar Projeto"/>
        </form>
    )
}
export default ProjectForm