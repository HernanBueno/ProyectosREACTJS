const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')


const app = express()
const key = process.env.STRIPE_KEY
const front = process.env.URL_FRONT 

const stripe = new Stripe(key)
app.use(cors({origin: front}))
app.use(express.json())

app.post('/api/checkout', async (req,res)=>{
    try {
        const payment = await stripe.paymentIntents.create({
            amount:req.body.amount,
            currency: 'USD',
            description: 'CocaCola',
            payment_method: req.body.id,
            confirm: true
        })
    console.log(payment)
    res.send({message: 'Pago realizado correctamente'})
    } catch (error) {
        res.json({message: error.raw.message})
    }
    
    
})

app.listen(8080, ()=>{
    console.log('server corriendo en puerto ', 8080)
})