import React from 'react'
import styles from "../css/CoinPage.module.css"

const Button = (props) => {
    return (
        <span className={styles.button} onClick={props.onClick}>
            {props.label}
        </span>
    )
}

export default Button