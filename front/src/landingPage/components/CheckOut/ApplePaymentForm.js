import React, { useEffect, useState } from "react";
import {
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const ApplePaymentForm = ({ order, userLogged }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [showTraditionalForm, setShowTraditionalForm] = useState(false);

  useEffect(() => {
    const initializePaymentRequest = async () => {
      try {
        if (!stripe || !elements) {
          throw new Error("Stripe.js has not loaded yet.");
        }

        const pr = stripe.paymentRequest({
          country: "DE",
          currency: "eur",
          total: {
            label: "Total Amount",
            amount: order.totalAmount * 100, // Assuming totalAmount is in euros
          },
          requestPayerName: true,
          requestPayerEmail: true,
          paymentMethod: {
            supportedMethods: "https://apple.com/apple-pay",
          },
        });

        const canMakePayment = await pr.canMakePayment();
        if (!canMakePayment) {
          throw new Error("Apple Pay is not supported on this device.");
        }

        setPaymentRequest(pr);
      } catch (error) {
        console.error("Error initializing Apple Pay:", error.message);
        setShowTraditionalForm(true); // Fallback to traditional form
      }
    };

    initializePaymentRequest();
  }, [stripe, elements, order.totalAmount]);

  const handlePaymentMethod = async (paymentMethod) => {
    try {
      // Call your backend to create a payment intent
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}orders/stripe/createPaymentIntent`,
        {
          amount: 1,
          paymentMethodType: "apple_pay",
        }
      );

      const { clientSecret } = data;

      // Confirm the payment on the client side
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (error) {
        console.error("Error confirming payment:", error.message);
        // Handle the error as needed
        return;
      }

      // Call your backend to create the order
      const orderResponse = await axios.post(
        userLogged
          ? `${process.env.REACT_APP_API_URL}orders/stripe/create`
          : `${process.env.REACT_APP_API_URL}orders/stripe/guest/create`,
        {
          eventId: order.eventId,
          items: order.items,
          participantDetails: order.participantDetails,
          paymentMethod: paymentMethod.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the order creation response as needed
      console.log("Order created:", orderResponse.data);
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error as needed
    }
  };

  console.log(paymentRequest);

  return (
    <>
      {paymentRequest && !showTraditionalForm && (
        <PaymentRequestButtonElement
          options={{ paymentRequest }}
          onPaymentMethod={({ paymentMethod }) =>
            handlePaymentMethod(paymentMethod)
          }
        />
      )}

      {showTraditionalForm && (
        <div>Not an Apple device or Apple Pay is not supported.</div>
      )}
    </>
  );
};

export default ApplePaymentForm;
