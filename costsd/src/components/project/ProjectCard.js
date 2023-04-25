import styles from './ProjectCard.module.css';
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import { Link } from 'react-router-dom';


function ProjectCard({id, nome, orçamento, key, category, handleRemove}) {
    return (
        <div className={styles.project_card}>
            <h4>{nome}</h4>
            <p>
                <span>Orçamento: </span>{orçamento}
            </p>
            <p className={`${styles.category_text}`}>
                <span className={`${styles[category?.toLowerCase()]}`}></span>{category}
            </p>
            <div className={styles.projectCard_Actions}>
                <Link to={'/'}><BsPencil/> Editar</Link>
                <button onClick={handleRemove(id)}><BsFillTrashFill/> Remover</button>
            </div>
        </div>
    )
}
export default ProjectCard