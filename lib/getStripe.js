import { loadStripe } from '@stripe/stripe-js';

let stripePromise

const getStripe = ()=>{
    if(!stripePromise){
        const key = "pk_test_51MVc1gSCfZBU0RaCvsLeTLqsJiQqhWStV9tMsyDGWOsH3Ap6gRPvJK4zgVzdYt0yez6Xj8QdxERaUv3fdG9jcEOT00ftwNkLYr";
        stripePromise = loadStripe(key)

    }
    return stripePromise
}

export default getStripe