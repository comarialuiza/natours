/*eslint-disable*/

import axios from "axios";
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_GTFeP9YNq4hxbHQj2jlUo5eQ00IY70qsZc');

export const bookTour = async tourId => {
    try {
        /* Get checkout session from the server */ 
        const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
        console.log(session);

        /* Use stripe object to create the form + process and charge credit card */
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        })
    } catch (err) {
        console.log(err);
        showAlert('error', err);
    }
}