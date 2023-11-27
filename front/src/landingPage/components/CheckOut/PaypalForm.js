import axios from "axios";
import { toast } from "react-toastify";
const PaypalForm = async ({ order, userLogged, disableBtn }) => {
  if (!order) {
    return;
  }

  const orderData = {
    eventId: order.eventId,
    items: order.items,
    participantDetails: order.participantDetails,
  };

  const token = localStorage.getItem("token") || "";

  const headers = {
    "Content-Type": "application/json",
    ...(token !== "" && { Authorization: `Bearer ${token}` }),
  };

  try {
    disableBtn((prev) => !prev);
    const response = await axios.post(
      token && userLogged
        ? `${process.env.REACT_APP_API_URL}orders/paypal/create`
        : `${process.env.REACT_APP_API_URL}orders/paypal/guest/create`,
      orderData,
      { headers }
    );

    const approvalUrl = response.data.approval_url;
    localStorage.removeItem("cart");
    toast.success("Umleiten zu PayPal");
    setTimeout(() => {
      window.location.href = approvalUrl;
    }, 2000);
  } catch (error) {
    disableBtn((prev) => !prev);
    console.error(
      "Error creating PayPal order:",
      error.response ? error.response.data : error
    );
    toast.error(
      "Zahlungsverarbeitung fehlgeschlagen. Bitte versuchen Sie es erneut."
    );
  }
};

export default PaypalForm;
