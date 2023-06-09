import styles from './Select.module.css'
import { useState, useEffect } from 'react';

function Select({text, name, options, handleCategory, value}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleCategory} value={value || ''}>
                <option disabled selected>Selecione uma opção</option>
                {options.map((element) => (
                    <option value={element.id} key={element.id}>{element.name}</option>
                ))}
            </select>
        </div>

    )
}
export default Select;