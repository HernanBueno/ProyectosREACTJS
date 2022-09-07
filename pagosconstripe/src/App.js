import {loadStripe} from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import 'bootswatch/dist/lux/bootstrap.min.css'
import axios from 'axios'
import { useState } from 'react';
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLEKEY}`)




const CheckoutForm = () => {

  const [loading, setLoading ] = useState(false)

  const stripe = useStripe()
  const elements = useElements()


  const handleSubmit = async (e)=>{
    e.preventDefault()

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type:'card',
      card:elements.getElement(CardElement)
    })
    setLoading(true)

    if(!error){
     const {id} = paymentMethod
     try {
      const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/checkout`, {
  id,
  amount: 1000
})
console.log(data)

elements.getElement(CardElement).clear()
     } catch (error) {
      console.log(error)
     }
     setLoading(false)

    }

  }

  return <form onSubmit={handleSubmit} className='card card-body'>
  <img src='https://jumboargentina.vtexassets.com/arquivos/ids/441468/Coca-Cola-25-L-3-17483.jpg?v=636528846231600000' alt='Coca cola' className='img-fluid'/>
<h3 className='text-center my-2'>Price: 10$</h3>
<div className='form-group'>
<CardElement className='form-control'/>
</div>

<button className='btn btn-success' disabled={!stripe}>{loading ? (<div className="spinner-grow text-light" role="status">
  <span className="sr-only">Loading...</span>
</div>): 'Comprar'}</button>
  </form>
}
function App() {
  return (
    <>
<Elements stripe={stripePromise}>
<div className='container p-4'>
  <div className='row'>
    <div className='col-md-4 offset-md-4'>
    <CheckoutForm/>
    </div>
  </div>
</div>
  
</Elements>
    </>
  );
}

export default App;
