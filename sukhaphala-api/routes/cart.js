const router = require('express').Router();

const Order = require('../models/Order');

//get cart items
// router.get('/:id', async (req, res) => {
//   try {
//     const cart = Order.find({customer: req.params.id, status: 'inCart'})

//   } catch (err) {

//   };
// });

router.post('/', async (req, res) => {
  try {
    const customerId = '6170242430c0c7d0539f8610';
    const product = req.body;


    // const cart = await Order.findOne({ status: 'inCart' });
    // if (cart) {
    //   //there is already created cart
    //   // const updatedCart = await Order.findOneAndUpdate(
    //   //   { status: 'inCart' },
    //   //   { order_line: [ ...order_line, cartItem] }
    //   // )
    //   const updatedCart = cart.order_line.push(cartItem).save();
    //   res.status(200).json(updatedCart);
    // } else {
    //   //there is no cart
    //   const newCart = await new Order({
    //     customer: '6170242430c0c7d0539f8610',
    //     status: 'inCart',
    //     total_money: 10, //hardcode 
    //     order_line: [cartItem],
    //   });
    //   const savedCart = await newCart.save();
    //   res.status(200).json(savedCart);
    // }

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
