import {useState, useEffect} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
const KEY = "pk_test_51NLv5wJNyZAz73epUVkeyq8qpLu9998LCfHWJm1CVtEE4VPZv9WMdGuMaIxTT91L9XrwZOPOLu8D19XkxeFd8pzt00hpxwAah1"

export default function Pay() {

    // const [stripeToken, setStripeToken] = useState(null);

    // const onToken = (token) => {
    //     setStripeToken(token);
    //     console.log(token);
    
    // }

    // useEffect(() => {
    //     const makeRequest = async () => {
    //         try{
    //             const res = await axios.post('http://localhost:5080/api/checkout/payment',
    //             {
    //             tokenId: stripeToken.id, 
    //              amount: 1000}
    //             );
    //             console.log(res.data)
    //         }catch(error){
    //             console.log(error);
    //         }
    //     }
    //     console.log(stripeToken);

    //     stripeToken && makeRequest();
    // },[stripeToken])

    // const handlePayment = (e) => {
    //     e.preventDefault();
    // }

    const paymentHandler = async () => {
        try {
          const userId = "649333cbb41d19f1fe304318"; // Replace with the actual userId
            
          const accessToken = localStorage.getItem('accessToken');

          // Fetch the cart data from the server
          const cartResponse = await axios.get(`http://localhost:5080/api/carts/find/${userId}`,{
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTMzM2NiYjQxZDE5ZjFmZTMwNDMxOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NzQ4OTQwMSwiZXhwIjoxNjg3NzQ4NjAxfQ.L7lJDzB95zmkEB7XFT3aOsx_cD4a9cARZVRhqp1ROZ4`,
            }
          });

          const cart = cartResponse.data;
      
          // Extract the items from the cart
          const items = cart.products.map((cartProduct) => ({
            id: cartProduct.productId,
            quantity: cartProduct.quantity,
          }));
      
          const response = await axios.post('http://localhost:5080/api/checkout/payment', {
            userId,
            items
          });
      
          const { url } = response.data;
          window.location.href = url;
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div>
            <h1>Payment Page</h1>

            <button onClick={paymentHandler}>Pay Now</button>
            
            {/* <StripeCheckout name='Ethiopian Harvest' 
            billingAddress
            shippingAddress
            description='Your total is $10.00'
            amount={1000}
            token={onToken}
            stripeKey={KEY}
            >
            <button onClick={handlePayment}>Pay Now</button>
            </StripeCheckout> */}
        </div>
    )
}