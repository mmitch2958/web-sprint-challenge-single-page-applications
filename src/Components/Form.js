  
import React, { useEffect, useState} from 'react'
import styled from "styled-components"
import * as yup from 'yup'
import axios from 'axios'

const container = styled.div`

display-flex; 
width: 60%;
border: 2px solid black;
color: grey;

`


const Form = () => {

    const [orderState, setOrderState] = useState({

        customerName: '',
        size: '', 
        sauce: '',
        pepperoni: false, 
        sausage: false,
        extraCheese: false,
        anchovies: false,
        hawian: false,
        seaFood: false,
    }) 

    const [err, setErr] = useState({
        customerName: '',
        size: '', 
        sauce: '',
        pepperoni: '', 
        sausage: '',
        extraCheese: '',
        anchovies: '',
        hawian: '',
        seaFood: '',
    })

//  Form Schema 
    
    const pizzaSchema = yup.object().shape({
        customerName: yup.string().required('Please Enter your name'.).min(2, 'Enter atleast 2 charecters for Initials')
        size: yup.string().oneOf(['small', 'med', 'large', 'x-large'], 'Please select a Pizza Size'),
        sauce: yup.string().oneOf(['original', 'garlic', 'BBQ', 'SpinAlfredo'], 'Please choose your Sause'),
        pepperoni: yup.string().notRequired(),
        sausage: yup.string().notRequired(),
        extraCheese: yup.string().notRequired(),
        anchovies: yup.string().notRequired(),
        hawian: yup.string().notRequired(),
        seaFood: yup.string().notRequired(),

    })

    
    // This is the New Orderd State 
    const [ordered, setOrdered] = useState([]) 


       //Submit Buton 
    const [disabledButton, setDisabledButton] = useState(true);
    
    useEffect(() => {
        pizzaSchema.isValid(orderState)
            .then((valid) => {
                console.log('is valid', valid)
                setDisabledButton(!valid)
            })
    
    }, [orderState, pizzaSchema]);


    //Order Validation

    const validateOrder = (e) => {
        yup.reach(pizzaSchema, e.target.name)
        .validate(e.target.value)
        .then((valid) => {
            setErrors({
                ...errors,
                [e.target.name]: ''
            })
        })
        .catch((err) => {
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            })
        })
    }



    //change and submit functions 

    const inChange = (e) => {
        e.persist()
        e.target.type === 'checkbox' ? console.log(e.target.name) : console.log(e.target.value)
        const newOrder = {
            ...orderState,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }
        validateOrder(e)
        setOrderState(newOrder)
    }
    }

    
    const orderSubmit = (e) => {
        e.preventDefault()
        axios.post('https://reqres.in/api/users', orderState)
        .then((res) => {
            console.log(res.data)
            setOrdered(res.data)
            setOrderState({
                customerName: '',
                size: '',
                sauce: '',
                pepperoni: false,
                sausage: false,
                extraCheese: false,
                anchovies: false,
                hawian: false,
                seaFood: false,
            })
        })
        .catch(err => console.log(err))
    }

    return (