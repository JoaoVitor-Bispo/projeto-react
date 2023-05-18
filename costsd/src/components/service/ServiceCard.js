import { BsFillTrashFill } from 'react-icons/bs'
import styles from '../project/ProjectCard.module.css'

function ServiceCard({id, nome, custo, descriçao, key, handleRemove}) {

    const remove = (e) => {
        console.log(e.target)
    }

    return (
        <div className={styles.project_card}>
            <h4>{nome}</h4>
            <p><span>Custo total: </span>R${custo}</p>
            <p>{descriçao}</p>
            <div className={styles.projectCard_Actions}>
                <button onClick={remove}>
                    <BsFillTrashFill/>
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard