import styles from './ProjectForm.module.css'
import Input from '../pages/form/Input'
import Select from '../pages/form/Select'
import SubmitButton from '../pages/form/SubmitButton'

function ProjectForm() {
    return (
        <form className={styles.form}>
            <Input type='text' name='nomeProjeto' placeholder={"Insira o nome do projeto"} text={"Nome do Projeto"}/>
            <Input type='number' name='orçamento' placeholder={"Insira o orçamento do projeto"} text={"Orçamento total"}/>
            <Select name="id" text={"Selecione a categoria"} />
            <SubmitButton text="Enviar Projeto"/>
        </form>
    )
}
export default ProjectForm