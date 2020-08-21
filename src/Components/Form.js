  
import React, { useEffect, useState} from 'react'
import styled from "styled-components"
import * as yup from 'yup'
import axios from 'axios'

const FormContainer = styled.div


//Styled 
`
display: flex; 
width: 60%;
border: 2px solid black;
color: grey;
background: pink;

`

//Create Form and Form Objects 

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

    const [errors, setErrors] = useState({
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
        customerName: yup.string().required("Please provide your name"),
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


   
//Form Validator 
    
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
        
    <FormContainer>

       <form onSubmit={orderSubmit}>
                <label htmlFor='customerName'>
                    Your Name:
                    <input type="text" name="customerName" 
                    data-cy="customerName"
                    id="customerName" value={orderState.customerName} onChange={inChange}/>
                </label>
              
                <br />
                <label htmlFor='size'>
                Choice of Size:  <br /> 
                <select name="size" id="size" onChange={inChange} value={orderState.size}>
                    <option>Please select a size:</option>
                    <option value="small">small</option>
                    <option value="med">Medium</option>
                    <option value="large">Large</option>
                    <option value="x-large">X-Large</option>
                </select>
                </label>
 
                <br /> 
                Choice of Sauce: 
                <br /> 
                <label htmlFor='sauce'>
                <select name="sauce" id="sauce" cy-data="sauce" onChange={inChange} value={orderState.sauce}>
                    <option>Please select a sauce:</option>
                    <option value="original">Original Red</option>
                    <option value="garlic">Garlic Ranch</option>
                    <option value="BBQ">BBQ Sauce</option>
                    <option value="alfredo">Spinach Alfredo</option>
                </select>
            </label>
            <br/>
                Add Toppings:<br />
                Choose up to 3<br />
                <label htmlFor="pepperoni">
                    <input type="checkbox" name="pepperoni" id="pepperoni" onChange={inChange} checked={orderState.pepperoni} />
                    Pepperoni
                </label>
                <br /> 
                <label htmlFor="sausage">
                    <input type="checkbox" name="sausage" id="sausage" onChange={inChange} checked={orderState.sausage} />
                    Sausage
                </label>
                <br /> 
                <label htmlFor="extra-cheese">
                    <input type="checkbox" name="extra-cheese" id="extra-cheese" onChange={inChange} checked={orderState.extraCheese} />
                    Extra-Cheese
                </label>
        <br />
        
                    <label htmlFor="anchovies">
                    <input type="checkbox" name="anchovies" id="anchovies" onChange={inChange} checked={orderState.anchovies} />
                    Anchovies
                </label>
                <br />  <label htmlFor="hawian">
                    <input type="checkbox" name="hawian" id="hawian" onChange={inChange} checked={orderState.hawian} />
                    Hawian
                </label>
                <br />  <label htmlFor="seaFood">
                    <input type="checkbox" name="seaFood" id="seaFood" onChange={inChange} checked={orderState.seaFood} />
                    seaFood
                </label>
        <br /> 
        

                <label htmlFor='quantity'>
                    <select id="quantity" name="quantity" onChange={inChange} value={orderState.quantity}>
                        <option>Select Quantity</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                    </select>
                </label>
              
                <br /> 
                <button data-cy="submit" disabled={disabledButton}>Add to Order</button>

                <pre>{JSON.stringify(ordered, null, 2)}</pre>

            </form>
            
            
    </FormContainer >
        
    )
}

export default Form