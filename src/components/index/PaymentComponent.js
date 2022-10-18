import React, { useCallback, useEffect } from 'react'
import { fectSinToken } from '../../helpers/fetch'

const FORM_ID = 'payment-form';

export const PaymentComponent = ({ items }) => {

    const getPreferenceID = useCallback(
      async() => {
        const resp = await fectSinToken('pagos/pay', { products: items }, "POST");
        if ( resp.global ) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js";
            script.setAttribute('data-preference-id', resp.global);
            const form = document.getElementById(FORM_ID);
            form.appendChild(script)
        }
      },
      [ items ],
    )

    useEffect(() => {
     getPreferenceID()
    },[])

  return (
    <form id={ FORM_ID } method="GET"/>
  )
}
