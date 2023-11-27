
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./PaymentForm.css";

const PaymentForm = ({
  order,
  userLogged,
  setPayModalShow,
  setUpdateCartData,
}) => {
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [btnDisabled, setBtnDisabled] = useState(false);
  // eslint-disable-next-line
  const [btnClicked, setBtnClicked] = useState(false);

  const createOrderWithStripeClient = async (oD) => {
    const token = localStorage.getItem("token");
    if (!token && userLogged) {
      toast.error(
        "Authentifizierungsfehler, bitte melden Sie sich ab und wieder an."
      );
      return;
    }
    try {
      // eslint-disable-next-line
      const response = await axios.post(
        userLogged
          ? `${process.env.REACT_APP_API_URL}orders/stripe/create`
          : `${process.env.REACT_APP_API_URL}orders/stripe/guest/create`,
        oD
      );

      localStorage.removeItem("cart");
      toast.success("Zahlung erfolgreich");
      setUpdateCartData((prev) => prev + 1);
      setTimeout(() => {
        navigate("/successful");
      }, 2000);
    } catch (error) {
      if (error.response) {
        console.error(
          `Error response: ${error.response.status} - ${error.response.data}`
        );
        toast.error(
          "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
        );
        setBtnDisabled(false);
      } else if (error.request) {
        console.error("Keine Antwort vom Server erhalten.");
        toast.error(
          "Server antwortet nicht. Bitte versuchen Sie es später erneut."
        );
        setBtnDisabled(false);
      } else {
        console.error("Error setting up the request:", error.message);
        toast.error(
          "Beim Senden der Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
        );
        setBtnDisabled(false);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBtnDisabled(true);
    setBtnClicked(true);

    const cardNumberElement = elements.getElement(CardNumberElement);
    // eslint-disable-next-line
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    // eslint-disable-next-line
    const cardCvcElement = elements.getElement(CardCvcElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    if (error) {
      console.error(error);
      toast.error(
        "Ein Fehler ist aufgetreten. Bitte überprüfen Sie Ihre Kartendetails und versuchen Sie es erneut."
      );
      setBtnDisabled(false);
    } else {
      const orderDetails = {
        eventId: order.eventId,
        items: order.items,
        participantDetails: order.participantDetails,
        paymentMethod: paymentMethod.id,
      };
      createOrderWithStripeClient(orderDetails);
    }
  };

  const cardStyle = {
    base: {
      color: "#000",
      fontFamily: '"TT Commons", sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#bdcaf7",
      },
    },
    invalid: {
      color: "#000",
      iconColor: "#bdcaf7",
    },
  };
  return (
    <form
      className="mt-3 _card_details"
      onSubmit={handleSubmit}
      id="payment-card-details-form"
    >
      <div className="row">
        <div className="card-detail-input ">
          <CardNumberElement
            className="mb-4 card_input"
            options={{ style: cardStyle }}
          />
        </div>
        <div className="card-detail-input col-xl-6">
          <CardExpiryElement
            className="mb-4 card_input"
            options={{ style: cardStyle }}
          />
        </div>
        <div className="card-detail-input col-xl-6">
          <CardCvcElement
            className="mb-4 card_input"
            options={{ style: cardStyle }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn stripe_cancel_btn"
          onClick={() => {
            setPayModalShow((prev) => !prev);
          }}
          type="button"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          className="btn stripe_pay_btn"
          disabled={!stripe || btnDisabled}
        >
          {btnDisabled ? "..." : "Bezahlen"}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
