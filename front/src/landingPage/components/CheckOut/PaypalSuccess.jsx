import React, { useEffect } from "react";

export default function PaypalSuccess() {
  useEffect(() => {
    localStorage.removeItem("cartTickets");
    localStorage.removeItem("cartEvent");
    localStorage.removeItem("ticketsDate");
    toast.success("Zahlung erfolgreich");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return <div>PaypalSuccess</div>;
}
