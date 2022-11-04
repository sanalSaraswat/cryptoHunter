import React, { Children, createContext, useEffect, useState } from 'react'

export const Crypto = createContext()

const Context = (props) => {

    const [currency, setCurrency] = useState("INR")
    const [symbol, setsymbol] = useState("₹")
    
    useEffect(() => {
        currency === "INR" ? setsymbol("₹") : setsymbol("$")

    }, [currency])
    
    
    return (
        <Crypto.Provider value={{currency, symbol, setCurrency}}>
            {props.children}
        </Crypto.Provider>
    )
}

export default Context