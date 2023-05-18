import styles from './ServiceForm.module.css'
import Input from '../pages/form/Input';
import SubmitButton from '../pages/form/SubmitButton';
import { useState } from 'react';

function ServiceForm({handleSubmit, btnText, projectData}) {

    const [service, setService] = useState()

    function handleChange(e) {
        setService({...service, [e.target.name]: e.target.value})
    }

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }    
    
    return (
        <form className={styles.form} onSubmit={submit}>
            <Input type={'text'} name={'nome'} text={'Nome do Serviço'} placeholder={'Insira o nome do serviço'} handleonchange={handleChange}/>

            <Input type={'number'} name={'custo'} text={'Custo do Serviço'} placeholder={'Insira o orçamento do serviço'} handleonchange={handleChange}/>

            <Input type={'text'} name={'descriçao'} text={'Descrição do Serviço'} placeholder={'Descreva seu serviço'} handleonchange={handleChange}/>

            <SubmitButton text={'textBtn'}/>
        </form>

    )
}
export default ServiceForm;