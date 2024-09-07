const products = require('../products/products');

require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_KEY)

exports.stripePayment = async (req, res) => {
    try {
        const {items} = req.body;
        
        const listItems = items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: products.get(item.id).name,
                },
                unit_amount: products.get(item.id).price*100,
            },
            quantity: item.quantity
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: listItems,
            mode: 'payment',
            success_url: "http://localhost/4000",
            //cancel_url : ""
        })

        res.json({
            url : session.url,
            session,
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}