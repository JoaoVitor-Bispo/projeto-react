import styles from './Message.module.css'
import { useState } from "react"

function Message({type, msg}) {
    
    const [visible, setVisible] = useState(true)
    setTimeout(() => {
        if(visible) {
            setVisible(false)
        }
    }, 3000)
    return (
        <>
            {visible && (
                <div className={`${styles[type]} ${styles.message}`}>
                    {msg}                
                </div>
            )}
        </>
    )

}
export default Message