import styles from './Input.module.css'

function Input({type, text, name, placeholder, handleonchange, value}) {
    return( 
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input type={type} name={name} placeholder={placeholder} id={name} onChange={handleonchange} value={value}/>
        </div>
    )
}
export default Input