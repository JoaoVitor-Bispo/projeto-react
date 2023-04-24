import styles from './ProjectForm.module.css'
import Input from '../pages/form/Input'
import Select from '../pages/form/Select'
import SubmitButton from '../pages/form/SubmitButton'
import { useEffect, useState } from 'react'
import NewProject from '../pages/NewProject'

function ProjectForm({addProject}) {
    const [projectData, setprojectData] = useState([])

    const submitProject = (e) => {                                                                    
        e.preventDefault()
        addProject(projectData)
    }
    function handleChange(e) {
        setprojectData({...projectData, [e.target.name]: e.target.value})
    }
    function handleCategory(e) {
        setprojectData({...projectData,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
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
        <form onSubmit={submitProject} className={styles.form}>
            <Input type='text' name='nomeProjeto' placeholder={"Insira o nome do projeto"} text={"Nome do Projeto"} handleonchange={handleChange} value={projectData.nomeProjeto ? projectData.nomeProjeto : ''}/>

            <Input type='number' name='orçamento' placeholder={"Insira o orçamento do projeto"} text={"Orçamento total"} handleonchange={handleChange} value={projectData.orçamento ? projectData.orçamento : ''}/>

            <Select name="id" text={"Selecione a categoria"} options={jsonData} handleCategory={handleCategory} value={projectData.category ? projectData.category.id: ''}/>
            <SubmitButton text="Enviar Projeto"/>
        </form>
    )
}
export default ProjectForm;