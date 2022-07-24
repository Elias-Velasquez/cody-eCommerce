import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; 
import {useStateValue} from '../StateProvider';
import {getTotal} from '../Reducer';

export default function PayPal() {
    const [{cart},dispatch] = useStateValue(); 
    const [success, setSuccess] = useState(false);
    const [orderID, setOrderID] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");

    console.log(1, orderID);
    console.log(2, success);
    console.log(3, ErrorMessage);  
    
    useEffect(() => {

        PayPalCheckOut()//LLamo al cdn de PayPal cada vez que cambia el carrito

    }, [cart]);

    const initialOptions = { // Genero las opciones para enviarle al CDN
        "client-id": "AUbeWD4APG6vN0ioj5IWEyZnwNm-rP3FPDzU_eiajy62W1nIutrJTuF4ICuxqWyG2OcZ72wieAPM54FH",
        currency: "ARS", //Establesco la moneda
        intent: "capture", //Estableco el metodos este autoriza la operacion y captura los fondos
        
    };
    let productsId=cart.map(items=>items.id)
    console.log(productsId)
  const createOrder = (data, actions) => {
       //Creo la orden de con los datos, esta puede ser general o con detalle de items
      console.log(data)
    return actions.order.create({
            purchase_units: [
       {
          description:"items",
          amount: {
            value: getTotal(cart),
          },
    
        },      
      ],
  });
  };
  const onApprove = (data, actions) => { //recibo el resultado de mi operacion
      console.log(data)
    return actions.order.capture()
    .then(function (details) {
        const { payer } = details;
        setSuccess(true);
        console.log('Capture result', details, JSON.stringify(details, null, 2)); //veo los datos en consola
                var transaction = details.purchase_units[0].payments.captures[0];
                alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
        console.log(details)
        setOrderID(transaction.id)
    });  
  };
  const onCancel = (data) => {
    console.log('El pago fue cancelado!', data);
}	        

  const onError = (data, actions) => { //Capturo error en caso de que exista
    setErrorMessage("Ocurrio un error en el pago ");
  };

  const PayPalCheckOut = ()=>{
    return (
        <PayPalScriptProvider options={initialOptions}> {/*Inicializo el CDN*/}

                {/*Inicializo los botones*/}
                <PayPalButtons 
                    createOrder={createOrder}
                    onApprove={ onApprove}
                    onError={onError}
                    onCancel={onCancel}
                />
        </PayPalScriptProvider>
    )
}
  return (
<PayPalCheckOut/> 
  );
}