import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../lib/shopify'

export default function Dash(){
    const [array, setArray] = useState() 
    useEffect(() => {
        let newArray 
        getAllProducts().then(value =>{
            newArray = newArray.concat(value)
        })
        setArray(newArray);
      }, []);
    console.log(array)
    return(
        <>

        </>
    )
}