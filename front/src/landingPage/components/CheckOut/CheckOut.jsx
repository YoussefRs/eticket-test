import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./CheckOut.css";
import PaymentForm from "./PaymentForm";

import { Elements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import PaypalForm from "./PaypalForm";
import MetaData from "../MetaData/MetaData";
import ApplePaymentForm from "./ApplePaymentForm";

import { calculateTotalPrice } from "../../../utils/utils";
import { handlePaste } from "../../../utils/utils";
import { stripePromise } from "../../../App";

export default function CheckOut({ updateCartData }) {
  const navigate = useNavigate();

  const [isAppleProduct, setIsAppleProduct] = useState(false);

  const [disablePaypalButton, setDisabledPaypalButton] = useState(false);

  useEffect(() => {
    const detectAppleProduct = () => {
      const userAgent = window.navigator.userAgent;
      const isApple = /Mac|iPhone|iPod|iPad/.test(userAgent);
      setIsAppleProduct(isApple);
    };

    detectAppleProduct();
  }, []);

  const [btnClicked, setBtnClicked] = useState(false);
  // eslint-disable-next-line
  const [btnDisabled, setBtnDisabled] = useState(false);

  const [payModalShow, setPayModalShow] = useState(false);

  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setPrivacyPolicyChecked(event.target.checked);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validConfirmEmail, setValidConfirmEmail] = useState(false);

  const onFirstNameChange = (e) => {
    const fname = e.target.value;
    const formattedFname = capitalizeEachWord(fname);
    setFirstName(formattedFname);

    if (formattedFname.length > 2) {
      setValidFirstName(true);
    } else {
      setValidFirstName(false);
    }
  };

  function capitalizeEachWord(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const onLastNameChange = (e) => {
    const lname = e.target.value;
    const formattedLname = capitalizeEachWord(lname);
    setLastName(formattedLname);
    if (formattedLname.length > 2) {
      setValidLastName(true);
    } else {
      setValidLastName(false);
    }
  };

  const onEmailChange = (e) => {
    const eml = e.target.value.toLowerCase();
    setEmail(eml);
    // eslint-disable-next-line
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailRegex.test(eml) && eml.length > 0) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const onConfirmEmailChange = (e) => {
    const eml = e.target.value.toLowerCase();
    setConfirmEmail(eml);

    if (eml === email) {
      setValidConfirmEmail(true);
    } else {
      setValidConfirmEmail(false);
    }
  };

  const [userLogged, setUserLogged] = useState(false);

  const [selectedMeth, setSelectedMeth] = useState("");
  const [selectedPayMeth, setSelectedPayMeth] = useState("");

  const appearance = {
    theme: "stripe",
  };
  const options = {
    appearance,
  };
  const [checkoutCart, setCheckoutCart] = useState([]);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    setCheckoutCart(cart);
    if (!cart) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUserLogged(true);
      setFirstName(user.firstname);
      setLastName(user.lastname);
      setEmail(user.email);
    } else {
      setUserLogged(false);
    }
  }, []);

  const handleRadioChange = (event) => {
    setSelectedMeth(event.target.value);
    setSelectedPayMeth("");
  };

  const checkUserInfoFilled = () => {
    setBtnClicked(true);

    if (
      !userLogged &&
      (firstName === "" ||
        lastName === "" ||
        email === "" ||
        confirmEmail === "")
    ) {
      toast.error(
        `Bitte ausfüllen ${firstName === "" ? "Vorname " : ""} ${
          lastName === "" ? "Nachname " : ""
        } ${email === "" ? "E-Mail-Adresse " : ""} ${
          confirmEmail === "" ? "E-Mail-Adresse bestätigen " : ""
        }`
      );
    } else if (
      (!userLogged &&
        ((!validFirstName && firstName.length > 0) ||
          (!validLastName && lastName.length > 0) ||
          (!validEmail && email.length > 0))) ||
      (!validConfirmEmail && confirmEmail.length > 0)
    ) {
      toast.error(
        `Invalid ${!validFirstName ? "Vorname " : ""} ${
          !validLastName ? "Nachname " : ""
        } ${!validEmail ? "E-Mail-Adresse " : ""} ${
          !validConfirmEmail ? "E-Mail-Adresse bestätigen " : ""
        }`
      );
    } else {
      return;
    }
  };

  const [cliSecret, setCliSecret] = useState();

  const createPaymentIntent = async () => {
    const amount = calculateTotalPrice(checkoutCart);
    if (!amount || amount === 0) {
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}orders/stripe/createIntent`,
        { amount }
      );
      setCliSecret(response.data.client_secret);
    } catch (error) {
      console.error("Error creating PaymentIntent:", error.message);
      toast.error(
        "Ein Fehler ist aufgetreten, während Ihre Zahlung verarbeitet wurde. Bitte versuchen Sie es erneut."
      );
      return null;
    }
  };

  const optionsApple = {
    appearance,
    clientSecret: cliSecret,
  };

  if (!stripePromise) {
    return;
  }

  console.log(cliSecret)

  return (
    <main className="checkout_container">
      <MetaData title="Zur Kasse" />
      <div className="_return_link text-start">
        <Link to={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clipPath="url(#clip0_473_10273)">
              <path
                d="M14.5458 0.219649C14.6865 0.0789974 14.8773 -1.82304e-05 15.0762 -1.52915e-05C15.2751 -1.23525e-05 15.4659 0.079009 15.6065 0.219665C15.7472 0.360321 15.8262 0.55109 15.8262 0.750004C15.8262 0.948919 15.7471 1.13968 15.6065 1.28034L8.88684 7.99999L15.6065 14.7196C15.7471 14.8603 15.8262 15.0511 15.8262 15.25C15.8262 15.4489 15.7472 15.6397 15.6065 15.7803C15.4659 15.921 15.2751 16 15.0762 16C14.8773 16 14.6865 15.921 14.5458 15.7803L7.29584 8.53034C7.22619 8.46069 7.17094 8.37801 7.13325 8.28701C7.09555 8.19602 7.07615 8.09849 7.07615 7.99999C7.07615 7.9015 7.09555 7.80397 7.13325 7.71297C7.17094 7.62197 7.22619 7.53929 7.29584 7.46965L14.5458 0.219649ZM8.70465 14.7196L1.98499 7.99999L8.70465 1.28034C8.8453 1.13968 8.92433 0.948918 8.92433 0.750004C8.92433 0.551089 8.84532 0.360321 8.70467 0.219665C8.56401 0.0790087 8.37325 -1.2638e-05 8.17433 -1.55795e-05C7.97542 -1.8521e-05 7.78465 0.0789971 7.64399 0.219649L0.393994 7.46965C0.324346 7.53929 0.269097 7.62197 0.231404 7.71297C0.19371 7.80397 0.17431 7.9015 0.17431 7.99999C0.17431 8.09849 0.19371 8.19602 0.231404 8.28701C0.269097 8.37801 0.324346 8.46069 0.393994 8.53034L7.64399 15.7803C7.78465 15.921 7.97542 16 8.17433 16C8.37325 16 8.56401 15.921 8.70466 15.7803C8.84532 15.6397 8.92433 15.4489 8.92433 15.25C8.92433 15.0511 8.8453 14.8603 8.70465 14.7196Z"
                fill="#1F2349"
              />
            </g>
            <defs>
              <clipPath id="clip0_473_10273">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(16) rotate(90)"
                />
              </clipPath>
            </defs>
          </svg>
          <span>Zurück zum Event</span>
        </Link>
      </div>
      <div className="row mt-5 d-flex justify-content-between">
        <section className="col-lg-6 col-xxl-7 mb-lg-0 mb-5 _profile_details">
          <div className="_header">
            <h2 className="_title">Mein Profil</h2>
            <div className="_divider"></div>
          </div>
          <Form className="_form px-3">
            <div className="row">
              <div className="col-md-6">
                <InputGroup className="mb-4 _input">
                  <InputGroup.Text id="basic-addon1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <g opacity="0.4">
                        <path
                          d="M3.66602 20.1667C3.66602 16.1333 6.96602 12.8333 10.9993 12.8333C15.0327 12.8333 18.3327 16.1333 18.3327 20.1667H3.66602ZM10.9993 11.9167C7.97435 11.9167 5.49935 9.44167 5.49935 6.41667C5.49935 3.39167 7.97435 0.916666 10.9993 0.916666C14.0244 0.916666 16.4993 3.39167 16.4993 6.41667C16.4993 9.44167 14.0244 11.9167 10.9993 11.9167Z"
                          fill="#6977FF"
                        />
                      </g>
                    </svg>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="*Vorname"
                    aria-label="first name"
                    aria-describedby="basic-addon1"
                    value={firstName}
                    readOnly={userLogged}
                    maxLength={12}
                    onChange={(e) => {
                      onFirstNameChange(e);
                    }}
                  />
                </InputGroup>
                {btnClicked && !userLogged && firstName === "" ? (
                  <p className="reg_input_feedback text-start">
                    Der Vorname darf nicht leer sein.
                  </p>
                ) : btnClicked && !userLogged && !validFirstName ? (
                  <p className="reg_input_feedback text-start">
                    Der Nachname muss mindestens 3 Zeichen lang sein
                  </p>
                ) : btnClicked && !userLogged && firstName.length === 12 ? (
                  <p className="reg_input_feedback text-start">
                    Maximale Länge erreicht.
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="col-md-6">
                <InputGroup className="mb-4 _input">
                  <InputGroup.Text id="basic-addon1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <g opacity="0.4">
                        <path
                          d="M3.66602 20.1667C3.66602 16.1333 6.96602 12.8333 10.9993 12.8333C15.0327 12.8333 18.3327 16.1333 18.3327 20.1667H3.66602ZM10.9993 11.9167C7.97435 11.9167 5.49935 9.44167 5.49935 6.41667C5.49935 3.39167 7.97435 0.916666 10.9993 0.916666C14.0244 0.916666 16.4993 3.39167 16.4993 6.41667C16.4993 9.44167 14.0244 11.9167 10.9993 11.9167Z"
                          fill="#6977FF"
                        />
                      </g>
                    </svg>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="*Nachname"
                    aria-label="last name"
                    aria-describedby="basic-addon1"
                    value={lastName}
                    readOnly={userLogged}
                    maxLength={12}
                    onChange={(e) => {
                      onLastNameChange(e);
                    }}
                  />
                </InputGroup>
                {btnClicked && !userLogged && lastName === "" ? (
                  <p className="reg_input_feedback text-start">
                    Der Nachname darf nicht leer sein.
                  </p>
                ) : btnClicked && !userLogged && !validLastName ? (
                  <p className="reg_input_feedback text-start">
                    Der Nachname muss mindestens 3 Zeichen lang sein.
                  </p>
                ) : btnClicked && !userLogged && lastName.length === 12 ? (
                  <p className="reg_input_feedback text-start">
                    Maximale Länge erreicht.
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="col-12">
                <InputGroup className="mb-4 _input">
                  <InputGroup.Text id="basic-addon1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                    >
                      <path
                        d="M0.561453 3.79259C0.630676 3.32981 0.863422 2.90714 1.2175 2.6012C1.57158 2.29527 2.02355 2.12633 2.49148 2.125H14.5094C14.9774 2.12633 15.4293 2.29527 15.7834 2.6012C16.1375 2.90714 16.3702 3.32981 16.4395 3.79259L8.50045 8.92978L0.561453 3.79259Z"
                        fill="#C3C9FF"
                      />
                      <path
                        d="M8.21153 10.0088C8.29748 10.0643 8.39765 10.0939 8.5 10.0939C8.60235 10.0939 8.70252 10.0643 8.78847 10.0088L16.4688 5.03944V12.9152C16.4682 13.4348 16.2615 13.933 15.8941 14.3004C15.5267 14.6678 15.0286 14.8744 14.509 14.875H2.49103C1.97144 14.8744 1.47329 14.6678 1.10588 14.3004C0.738469 13.933 0.531813 13.4348 0.53125 12.9152V5.03891L8.21153 10.0088Z"
                        fill="#C3C9FF"
                      />
                    </svg>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="*E-Mail-Adresse"
                    aria-label="email"
                    aria-describedby="basic-addon1"
                    type="email"
                    value={email}
                    readOnly={userLogged}
                    maxLength={30}
                    onChange={(e) => {
                      onEmailChange(e);
                    }}
                    onPaste={(e) => {
                      handlePaste(e);
                    }}
                  />
                </InputGroup>
                {btnClicked && !userLogged && email === "" ? (
                  <p className="reg_input_feedback text-start">
                    Die E-Mail darf nicht leer sein.
                  </p>
                ) : btnClicked && !userLogged && !validEmail ? (
                  <p className="reg_input_feedback text-start">
                    Ungültige E-Mail-Adresse.
                  </p>
                ) : btnClicked && !userLogged && email.length === 30 ? (
                  <p className="reg_input_feedback text-start">
                    Maximale Länge erreicht.
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
              {userLogged ? null : (
                <div className="col-12">
                  <InputGroup className="mb-4 _input">
                    <InputGroup.Text id="basic-addon1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                      >
                        <path
                          d="M0.561453 3.79259C0.630676 3.32981 0.863422 2.90714 1.2175 2.6012C1.57158 2.29527 2.02355 2.12633 2.49148 2.125H14.5094C14.9774 2.12633 15.4293 2.29527 15.7834 2.6012C16.1375 2.90714 16.3702 3.32981 16.4395 3.79259L8.50045 8.92978L0.561453 3.79259Z"
                          fill="#C3C9FF"
                        />
                        <path
                          d="M8.21153 10.0088C8.29748 10.0643 8.39765 10.0939 8.5 10.0939C8.60235 10.0939 8.70252 10.0643 8.78847 10.0088L16.4688 5.03944V12.9152C16.4682 13.4348 16.2615 13.933 15.8941 14.3004C15.5267 14.6678 15.0286 14.8744 14.509 14.875H2.49103C1.97144 14.8744 1.47329 14.6678 1.10588 14.3004C0.738469 13.933 0.531813 13.4348 0.53125 12.9152V5.03891L8.21153 10.0088Z"
                          fill="#C3C9FF"
                        />
                      </svg>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="*E-Mail-Adresse bestätigen"
                      aria-label="confirm-email"
                      aria-describedby="basic-addon1"
                      type="email"
                      value={confirmEmail}
                      maxLength={30}
                      onChange={(e) => {
                        onConfirmEmailChange(e);
                      }}
                      onPaste={(e) => {
                        handlePaste(e);
                      }}
                    />
                  </InputGroup>
                  {btnClicked && !userLogged && confirmEmail === "" ? (
                    <p className="reg_input_feedback text-start">
                      Die Bestätigungs-E-Mail darf nicht leer sein.
                    </p>
                  ) : btnClicked && !userLogged && !validConfirmEmail ? (
                    <p className="reg_input_feedback text-start">
                      Die E-Mail-Adressen stimmen nicht überein.
                    </p>
                  ) : btnClicked &&
                    !userLogged &&
                    confirmEmail.length === 30 ? (
                    <p className="reg_input_feedback text-start">
                      Maximale Länge erreicht.
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
              )}
            </div>
            {!userLogged ? (
              <p className="reg_input_feedback text-end">
                <em>*erforderlich</em>
              </p>
            ) : null}
          </Form>
          <div className="_header mt-5">
            <h2 className="_title">Bezahlen mit</h2>
            <div className="_divider"></div>
          </div>
          <div
            className={
              selectedMeth === "stripe"
                ? "_paymeth_box_selected _stripe mb-3"
                : "_paymeth_box _stripe mb-3"
            }
          >
            <div className=" d-flex justify-content-between align-items-center">
              <div className="_radio_btn form-check text-start">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="stripeRadio"
                  value={"stripe"}
                  onChange={handleRadioChange}
                  checked={selectedMeth === "stripe"}
                  onClick={() => {
                    checkUserInfoFilled();
                  }}
                />
                <label
                  className={
                    selectedMeth === "stripe"
                      ? "form-check-label _selected_meth"
                      : "form-check-label"
                  }
                  htmlFor="stripeRadio"
                >
                  Visa / Mastercard
                </label>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="33"
                viewBox="0 0 25 26"
                fill="none"
              >
                <g clip-path="url(#clip0_209_3393)">
                  <path
                    d="M22.92 4.95215H2.07966C1.25882 4.95215 0.591064 5.6199 0.591064 6.44074V18.8637C0.591064 19.6845 1.25882 20.3523 2.07966 20.3523H22.92C23.7408 20.3523 24.4086 19.6845 24.4086 18.8637V6.44074C24.4086 5.61985 23.7409 4.95215 22.92 4.95215ZM2.07966 5.44833H22.92C23.4673 5.44833 23.9124 5.8934 23.9124 6.44074V8.10207H1.08725V6.44074C1.08725 5.8934 1.53232 5.44833 2.07966 5.44833ZM22.92 19.856H2.07966C1.53232 19.856 1.08725 19.411 1.08725 18.8636V11.4779H23.9124V18.8637C23.9124 19.411 23.4673 19.856 22.92 19.856Z"
                    fill="#C3C9FF"
                  />
                  <path
                    d="M13.5051 14.6948H3.06861C2.93147 14.6948 2.8205 14.8058 2.8205 14.9429C2.8205 15.0801 2.93147 15.1911 3.06861 15.1911H13.505C13.6422 15.1911 13.7531 15.0801 13.7531 14.9429C13.7531 14.8058 13.6422 14.6948 13.5051 14.6948Z"
                    fill="#C3C9FF"
                  />
                  <path
                    d="M8.47837 16.6108H3.06861C2.93147 16.6108 2.8205 16.7218 2.8205 16.859C2.8205 16.9961 2.93147 17.1071 3.06861 17.1071H8.47832C8.61546 17.1071 8.72644 16.9961 8.72644 16.859C8.72644 16.7218 8.61551 16.6108 8.47837 16.6108Z"
                    fill="#C3C9FF"
                  />
                  <path
                    d="M21.931 16.6108H21.3565C21.2194 16.6108 21.1084 16.7218 21.1084 16.859C21.1084 16.9961 21.2194 17.1071 21.3565 17.1071H21.931C22.0681 17.1071 22.1791 16.9961 22.1791 16.859C22.1791 16.7218 22.0681 16.6108 21.931 16.6108Z"
                    fill="#C3C9FF"
                  />
                  <path
                    d="M19.6387 16.6108H19.0643C18.9271 16.6108 18.8162 16.7218 18.8162 16.859C18.8162 16.9961 18.9271 17.1071 19.0643 17.1071H19.6387C19.7759 17.1071 19.8869 16.9961 19.8869 16.859C19.8869 16.7218 19.7759 16.6108 19.6387 16.6108Z"
                    fill="#C3C9FF"
                  />
                  <path
                    d="M17.3465 16.6108H16.772C16.6349 16.6108 16.5239 16.7218 16.5239 16.859C16.5239 16.9961 16.6349 17.1071 16.772 17.1071H17.3465C17.4837 17.1071 17.5946 16.9961 17.5946 16.859C17.5946 16.7218 17.4836 16.6108 17.3465 16.6108Z"
                    fill="#C3C9FF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_209_3393">
                    <rect
                      width="24.8991"
                      height="24.8991"
                      fill="white"
                      transform="translate(0.0502319 0.202637)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div
            className={
              selectedMeth === "paypal"
                ? "_paymeth_box_selected _paypal mb-3"
                : "_paymeth_box _paypal mb-3"
            }
          >
            <div className=" d-flex justify-content-between align-items-center">
              <div className="_radio_btn form-check text-start">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="paypalRadio"
                  value={"paypal"}
                  onChange={handleRadioChange}
                  checked={selectedMeth === "paypal"}
                  onClick={() => {
                    checkUserInfoFilled();
                  }}
                />
                <label
                  className={
                    selectedMeth === "paypal"
                      ? "form-check-label _selected_meth"
                      : "form-check-label"
                  }
                  htmlFor="paypalRadio"
                >
                  Paypal
                </label>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
              >
                <path
                  d="M11.2293 19.569C11.3428 18.8574 11.9595 18.3315 12.6875 18.3315H15.7194C21.678 18.3315 26.3413 15.9307 27.7046 8.98631C27.7458 8.78006 27.8098 8.38406 27.8098 8.38406C28.1975 5.81419 27.8077 4.07137 26.4073 2.48944C24.8687 0.746625 22.0844 0 18.5224 0H8.1851C7.45703 0 6.83828 0.525938 6.72278 1.2375L2.41841 28.3202C2.33385 28.8544 2.75047 29.337 3.29497 29.337H9.67635L11.2789 19.2514L11.2293 19.569Z"
                  fill="#0D47A1"
                />
                <path
                  d="M15.7194 20.1545H13.001L10.9715 32.9998H15.3812C16.0185 32.9998 16.5609 32.5398 16.6599 31.9149L16.7115 31.6426L17.7262 25.2675L17.7922 24.9168C17.8912 24.2919 18.4337 23.832 19.0689 23.832H19.8753C25.0873 23.832 29.1669 21.7323 30.359 15.6583C30.8375 13.2204 30.6065 11.1765 29.4247 9.69971C27.9439 16.5369 23.2187 20.1545 15.7194 20.1545Z"
                  fill="#0D47A1"
                />
              </svg>
            </div>
          </div>
          <div
            className={
              selectedMeth === "applepay"
                ? "_paymeth_box_selected _applepay mb-3"
                : "_paymeth_box _applepay mb-3"
            }
          >
            <div className=" d-flex justify-content-between align-items-center">
              <div className="_radio_btn form-check text-start">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="applepayRadio"
                  value={"applepay"}
                  onChange={handleRadioChange}
                  checked={selectedMeth === "applepay"}
                  onClick={() => {
                    if (!isAppleProduct) {
                      toast.error(
                        "Du benötigst ein Apple-Gerät, um dies zu verwenden."
                      );
                      return;
                    } else {
                      checkUserInfoFilled();
                    }

                    if (
                      (isAppleProduct && userLogged) ||
                      (isAppleProduct &&
                        validFirstName &&
                        validLastName &&
                        validEmail &&
                        validConfirmEmail &&
                        privacyPolicyChecked)
                    ) {
                      createPaymentIntent();
                    } else {
                      return;
                    }
                  }}
                />
                <label
                  className={
                    selectedMeth === "applepay"
                      ? "form-check-label _selected_meth"
                      : "form-check-label"
                  }
                  htmlFor="applepayRadio"
                >
                  Apple PAY
                </label>
              </div>
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="33"
                viewBox="0 0 488.000000 600.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <metadata>
                  Created by potrace 1.16, written by Peter Selinger 2001-2019
                </metadata>
                <g
                  transform="translate(0.000000,600.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M3470 5984 c-155 -33 -346 -120 -494 -225 -289 -205 -500 -543 -552
-881 -15 -98 -14 -241 1 -256 13 -14 201 -5 265 12 355 93 657 350 824 700 95
198 132 375 127 609 l-1 57 -52 -1 c-29 0 -82 -7 -118 -15z"
                  />
                  <path
                    d="M3315 4534 c-133 -24 -260 -65 -520 -167 -306 -120 -338 -118 -750
43 -88 35 -212 76 -275 93 -105 28 -129 30 -275 30 -127 0 -181 -4 -262 -21
-291 -63 -520 -188 -733 -402 -214 -214 -353 -464 -434 -783 -49 -189 -66
-343 -66 -580 0 -381 60 -730 191 -1114 126 -369 264 -641 481 -945 258 -360
425 -530 609 -623 108 -55 175 -68 319 -62 144 6 185 17 421 112 289 118 471
146 709 111 104 -16 195 -46 401 -130 166 -69 250 -88 394 -89 215 -1 384 75
570 259 161 159 386 467 534 730 97 174 234 493 248 579 5 29 2 32 -64 63
-235 116 -464 338 -585 570 -103 195 -142 362 -142 602 0 133 5 185 23 270 69
321 259 610 535 810 47 34 86 65 86 68 0 18 -145 180 -230 255 -163 146 -361
245 -610 304 -136 32 -446 42 -575 17z"
                  />
                </g>
              </svg>
            </div>
          </div>
          <div className="mt-5 _policy_agreement text-start">
            <div className="_policy_agreement_check">
              <input
                type="checkbox"
                name="policy-checkbox"
                className="me-2"
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="_label">
              Ich erkläre mich mit den{" "}
              <Link
                to={"/agb"}
                rel="noreferrer"
                target={"_blank"}
                className="_link"
                style={{ textDecoration: "none" }}
              >
                AGB
              </Link>{" "}
              einverstanden und habe das{" "}
              <Link
                to="/agb#Stornierung"
                className="_link"
                rel="noreferrer"
                target={"_blank"}
                style={{ textDecoration: "none" }}
              >
                Widerrufsrecht
              </Link>{" "}
              und die{" "}
              <Link
                to={"/privacy"}
                rel="noreferrer"
                target={"_blank"}
                className="_link"
                style={{ textDecoration: "none" }}
              >
                Datenschutzinformation
              </Link>{" "}
              gelesen und erkenne Letztere an.
            </div>
          </div>
          <div className="mt-5">
            {selectedPayMeth === "" ||
            selectedPayMeth === "stripe" ||
            selectedPayMeth === "paypal" ||
            (!isAppleProduct && selectedMeth === "applepay") ||
            !privacyPolicyChecked ? (
              <button
                className={`btn _checkout_button ${
                  !privacyPolicyChecked ||
                  (!userLogged &&
                    (!validFirstName ||
                      !validLastName ||
                      !validEmail ||
                      !validConfirmEmail)) ||
                  selectedMeth === "" ||
                  (selectedMeth === "applepay" && !isAppleProduct)
                    ? "checkout_disabled"
                    : ""
                }`}
                title="This is a button!"
                onClick={() => {
                  setSelectedPayMeth(selectedMeth);
                  if (selectedMeth === "stripe") {
                    setPayModalShow(true);
                  }

                  if (selectedMeth === "paypal") {
                    PaypalForm({
                      order: {
                        eventId: checkoutCart[0].eventDetails._id,
                        items: checkoutCart.flatMap((itm, index) =>
                          itm.items.map((el, i) => ({
                            ticketId: el._id,
                            quantity: el.orderQty,
                            validityStartDate: itm.date.id.replace(/\//g, "-"),
                            validityEndDate: itm.date.id.replace(/\//g, "-"),
                            validityStartTime: "11:00:00",
                            validityEndTime: "20:00:00",
                          }))
                        ),
                        participantDetails: {
                          firstname: firstName,
                          lastname: lastName,
                          email: email,
                        },
                      },
                      userLogged: userLogged,
                      disableBtn: setDisabledPaypalButton,
                    });
                  }
                }}
                disabled={
                  !privacyPolicyChecked ||
                  (!userLogged &&
                    (!validFirstName ||
                      !validLastName ||
                      !validEmail ||
                      !validConfirmEmail)) ||
                  selectedMeth === "" ||
                  (selectedMeth === "applepay" && !isAppleProduct) ||
                  disablePaypalButton
                }
                id="updtBtn"
              >
                {btnDisabled || disablePaypalButton ? "..." : "Kaufen"}
                {!privacyPolicyChecked ||
                (!userLogged &&
                  (!validFirstName ||
                    !validLastName ||
                    !validEmail ||
                    !validConfirmEmail)) ||
                selectedMeth === "" ||
                (selectedMeth === "applepay" && !isAppleProduct) ? (
                  <p className="_feedback">
                    Bitte akzeptieren Sie die Datenschutzrichtlinie, stellen Sie
                    sicher, dass das Formular ausgefüllt ist, und wählen Sie
                    eine Zahlungsmethode aus, bevor Sie fortfahren.
                  </p>
                ) : null}
              </button>
            ) : selectedPayMeth === "applepay" &&
              selectedMeth === "applepay" &&
              isAppleProduct &&
              ((userLogged && privacyPolicyChecked) ||
                (validFirstName &&
                  validLastName &&
                  validEmail &&
                  validConfirmEmail)) ? (
              stripePromise &&
              cliSecret && (
                <Elements stripe={stripePromise} options={optionsApple}>
                  <ApplePaymentForm
                    order={{
                      eventId: checkoutCart[0].eventDetails._id,
                      items: checkoutCart.flatMap((itm, index) =>
                        itm.items.map((el, i) => ({
                          ticketId: el._id,
                          quantity: el.orderQty,
                          validityStartDate: itm.date.id.replace(/\//g, "-"),
                          validityEndDate: itm.date.id.replace(/\//g, "-"),
                          validityStartTime: "11:00:00",
                          validityEndTime: "20:00:00",
                        }))
                      ),
                      participantDetails: {
                        firstname: firstName,
                        lastname: lastName,
                        email: email,
                      },
                      totalAmount: calculateTotalPrice(checkoutCart),
                    }}
                    userLogged={userLogged}
                  />
                </Elements>
              )
            ) : null}
          </div>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={payModalShow}
            onHide={() => setPayModalShow(false)}
            className="_calendarModal"
          >
            <Modal.Header closeButton>
              <Modal.Title
                id="contained-modal-title-vcenter"
                className="checkout_stripe_modal_title"
              >
                Mit der Zahlung fortfahren
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mb-4">
              {selectedPayMeth === "stripe" && stripePromise ? (
                <Elements stripe={stripePromise} options={options}>
                  <PaymentForm
                    order={{
                      eventId: checkoutCart[0].eventDetails._id,
                      items: checkoutCart.flatMap((itm, index) =>
                        itm.items.map((el, i) => ({
                          ticketId: el._id,
                          quantity: el.orderQty,
                          validityStartDate: itm.date.id.replace(/\//g, "-"),
                          validityEndDate: itm.date.id.replace(/\//g, "-"),
                          validityStartTime: "11:00:00",
                          validityEndTime: "20:00:00",
                        }))
                      ),
                      participantDetails: {
                        firstname: firstName,
                        lastname: lastName,
                        email: email,
                      },
                    }}
                    userLogged={userLogged}
                    setPayModalShow={setPayModalShow}
                    setUpdateCartData={updateCartData}
                  />
                </Elements>
              ) : null}
            </Modal.Body>
          </Modal>
        </section>
        <section className="col-lg-5 col-xxl-4 _order_details">
          <div className="_header">
            <h2 className="_title">Deine Bestellung</h2>
            <div className="_divider"></div>
          </div>
          <div className="_order_details_outterbox">
            {checkoutCart?.map((element, i) => (
              <>
                <div className="_event_items_container" key={i}>
                  <div className="_event_details row px-2">
                    <div className="_img col-7">
                      <img
                        src={element.eventDetails.banner}
                        alt="event"
                        className="img-fluid checkout_event_banner"
                        style={
                          isAppleProduct && window.innerWidth < 576
                            ? { maxWidth: 150, maxHeight: 100 }
                            : {}
                        }
                      />
                    </div>
                    <div className="_details col-5 text-start">
                      <h5 className="_name">
                        {element.eventDetails.eventName}
                      </h5>
                      <p className="_date">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 7 7"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_543_15233)">
                            <path
                              d="M2.36858 3.65749C2.36858 3.75337 2.29013 3.83179 2.19428 3.83179H1.32274C1.22688 3.83179 1.14844 3.75335 1.14844 3.65749V3.07494C1.14844 2.97906 1.22688 2.90063 1.32274 2.90063H2.19428C2.29015 2.90063 2.36858 2.97908 2.36858 3.07494V3.65749Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M2.36858 5.18825C2.36858 5.28413 2.29013 5.36256 2.19428 5.36256H1.32274C1.22688 5.36256 1.14844 5.28411 1.14844 5.18825V4.6057C1.14844 4.50982 1.22688 4.4314 1.32274 4.4314H2.19428C2.29015 4.4314 2.36858 4.50984 2.36858 4.6057V5.18825Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M4.03071 3.65725C4.03071 3.75312 3.95226 3.83155 3.85641 3.83155H2.98485C2.88897 3.83155 2.81055 3.7531 2.81055 3.65725V3.07469C2.81055 2.97882 2.88899 2.90039 2.98485 2.90039H3.85641C3.95228 2.90039 4.03071 2.97884 4.03071 3.07469V3.65725Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M4.03071 5.18801C4.03071 5.28388 3.95226 5.36231 3.85641 5.36231H2.98485C2.88897 5.36231 2.81055 5.28387 2.81055 5.18801V4.60546C2.81055 4.50958 2.88899 4.43115 2.98485 4.43115H3.85641C3.95228 4.43115 4.03071 4.5096 4.03071 4.60546V5.18801Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M5.67133 3.65725C5.67133 3.75312 5.59289 3.83155 5.49703 3.83155H4.62548C4.5296 3.83155 4.45117 3.7531 4.45117 3.65725V3.07469C4.45117 2.97882 4.52962 2.90039 4.62548 2.90039H5.49703C5.59291 2.90039 5.67133 2.97884 5.67133 3.07469V3.65725Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M5.67133 5.18801C5.67133 5.28388 5.59289 5.36231 5.49703 5.36231H4.62548C4.5296 5.36231 4.45117 5.28387 4.45117 5.18801V4.60546C4.45117 4.50958 4.52962 4.43115 4.62548 4.43115H5.49703C5.59291 4.43115 5.67133 4.5096 5.67133 4.60546V5.18801Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M1.58582 1.59676C1.48168 1.59676 1.39648 1.51156 1.39648 1.40741V0.382714C1.39648 0.278557 1.48168 0.193359 1.58582 0.193359H1.97971C2.08385 0.193359 2.16907 0.278557 2.16907 0.382714V1.40741C2.16907 1.51155 2.08387 1.59676 1.97971 1.59676H1.58582Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M4.86316 1.59676C4.75903 1.59676 4.67383 1.51156 4.67383 1.40741V0.382714C4.67383 0.278557 4.75903 0.193359 4.86316 0.193359H5.25706C5.36119 0.193359 5.44641 0.278557 5.44641 0.382714V1.40741C5.44641 1.51155 5.36121 1.59676 5.25706 1.59676H4.86316Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M6.4425 0.967773C6.4425 0.967773 6.12988 0.967773 5.89133 0.967773C5.85983 0.967773 5.80157 0.967773 5.80157 1.04038V1.36449C5.80157 1.67394 5.63016 1.92571 5.24035 1.92571H4.87772C4.5081 1.92571 4.3165 1.67394 4.3165 1.36449L4.31652 1.0573C4.31652 0.999268 4.27598 0.967773 4.22761 0.967773C3.76585 0.967773 3.10489 0.967773 2.62675 0.967773C2.59123 0.967773 2.52371 0.967773 2.52371 1.05972V1.36449C2.52371 1.67394 2.36941 1.92571 1.9625 1.92571H1.59987C1.14927 1.92571 1.03865 1.67394 1.03865 1.36449V1.07181C1.03865 0.989595 0.964638 0.967773 0.924341 0.967773C0.688577 0.967773 0.397737 0.967773 0.397737 0.967773C0.29714 0.967773 0.214844 1.05007 0.214844 1.28616V6.17319C0.214844 6.13829 0.29714 6.22059 0.397737 6.22059H6.44248C6.54308 6.22059 6.62538 6.13829 6.62538 6.17319V1.28616C6.62538 1.05007 6.54308 0.967773 6.4425 0.967773ZM6.21896 5.63127C6.21896 5.73186 6.13667 5.81416 6.03607 5.81416H0.804167C0.70357 5.81416 0.621274 5.73186 0.621274 5.63127V2.60303C0.621274 2.50244 0.70357 2.42014 0.804167 2.42014H6.03607C6.13667 2.42014 6.21896 2.50244 6.21896 2.60303V5.63127Z"
                              fill="#64C3C5"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_543_15233">
                              <rect
                                width="6.41053"
                                height="6.41053"
                                fill="white"
                                transform="translate(0.216797 0.00195312)"
                              />
                            </clipPath>
                          </defs>
                        </svg>{" "}
                        {`${element.date.day} ${element.date.month}, 2024`}
                      </p>
                      <p className="_time">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 9 10"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_543_15198)">
                            <path
                              d="M7.44414 2.00614C6.63694 1.19894 5.56361 0.754395 4.42213 0.754395C3.28064 0.754395 2.20731 1.19894 1.40012 2.00614C0.592922 2.81333 0.148438 3.88652 0.148438 5.02808C0.148438 6.16965 0.592922 7.24284 1.40012 8.05003C2.20731 8.85722 3.28064 9.30177 4.42213 9.30177C5.56361 9.30177 6.63694 8.85722 7.44414 8.05003C8.25133 7.24284 8.69581 6.16965 8.69581 5.02808C8.69581 3.88652 8.25133 2.81333 7.44414 2.00614ZM4.42213 8.58336C2.46178 8.58336 0.866759 6.98849 0.866759 5.02808C0.866759 3.06768 2.46178 1.4728 4.42213 1.4728C6.38247 1.4728 7.97749 3.06768 7.97749 5.02808C7.97749 6.98849 6.38247 8.58336 4.42213 8.58336Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M3.11405 7.29767C2.97629 7.21818 2.79998 7.26525 2.72021 7.40304C2.64074 7.54097 2.68803 7.7173 2.82579 7.79681C2.87113 7.82308 2.92079 7.83558 2.96973 7.83558C3.06926 7.83558 3.16606 7.78389 3.21952 7.69147C3.29908 7.55349 3.25194 7.3772 3.11405 7.29767Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M2.96428 2.80063C3.01338 2.80063 3.06326 2.78811 3.10882 2.7617C3.24636 2.68178 3.29329 2.50528 3.21333 2.36771C3.13322 2.22997 2.95695 2.18323 2.81934 2.26313C2.6816 2.34305 2.63489 2.51936 2.71482 2.6571C2.76831 2.74918 2.86487 2.80063 2.96428 2.80063Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M1.7576 3.82759C1.80293 3.85359 1.85244 3.86614 1.90133 3.86614C2.00093 3.86614 2.09794 3.81447 2.15121 3.72184C2.23072 3.58409 2.18339 3.40778 2.04563 3.32827C1.90769 3.24857 1.7314 3.29588 1.65187 3.43379C1.57234 3.57176 1.61969 3.74788 1.7576 3.82759Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M4.4191 2.40946C4.41931 2.40946 4.41931 2.40946 4.41946 2.40946C4.5787 2.40906 4.70749 2.27987 4.70736 2.12065C4.70691 1.96141 4.57778 1.83262 4.41852 1.83301C4.25926 1.8332 4.1305 1.96242 4.13086 2.12161C4.13105 2.28066 4.26003 2.40946 4.4191 2.40946Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M1.76092 6.23478C1.62316 6.31448 1.57623 6.49077 1.65619 6.62858C1.70968 6.72076 1.80647 6.7723 1.90588 6.7723C1.95496 6.7723 2.00462 6.75978 2.05018 6.73335C2.18792 6.65366 2.23481 6.47712 2.15489 6.33955C2.07499 6.20181 1.89866 6.15484 1.76092 6.23478Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M1.80495 5.03126C1.80474 4.872 1.67554 4.74324 1.51635 4.74341C1.35713 4.7436 1.22832 4.87279 1.22852 5.03182C1.22873 5.19106 1.35771 5.31984 1.51675 5.31984H1.5169C1.67618 5.31965 1.80516 5.19044 1.80495 5.03126Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M4.42474 7.64673C4.26576 7.64694 4.13672 7.77594 4.13672 7.93514C4.13693 8.09438 4.26598 8.22338 4.42517 8.22316C4.58437 8.22316 4.71341 8.09395 4.7132 7.93473C4.71322 7.77571 4.58407 7.64673 4.42474 7.64673Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M7.08487 6.23213C6.94717 6.15245 6.7709 6.19952 6.69111 6.33728C6.61143 6.47503 6.65852 6.65134 6.79626 6.73106C6.84182 6.75732 6.89148 6.7698 6.94035 6.7698C7.03995 6.7698 7.13675 6.71835 7.19002 6.62589C7.26977 6.48815 7.22263 6.31181 7.08487 6.23213Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M7.32861 4.73315C7.16942 4.73356 7.04059 4.86297 7.04102 5.02216C7.04102 5.02377 7.04102 5.02537 7.04102 5.02674C7.04102 5.02736 7.04102 5.02774 7.04102 5.02815C7.04102 5.18736 7.16998 5.31636 7.32919 5.31636C7.48845 5.31636 7.61743 5.18736 7.61743 5.02815C7.61743 5.02714 7.61743 5.02594 7.61743 5.02477C7.61743 5.02357 7.61743 5.02216 7.61743 5.0208C7.61707 4.86158 7.48781 4.73296 7.32861 4.73315Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M5.72637 2.75722C5.77165 2.78346 5.82118 2.79577 5.87005 2.79577C5.96965 2.79577 6.06666 2.7441 6.11993 2.65147C6.19946 2.51349 6.15213 2.3372 6.0142 2.25769C5.87622 2.17837 5.69989 2.22568 5.62059 2.36365C5.54112 2.50159 5.58841 2.67792 5.72637 2.75722Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M5.73173 7.29627C5.59399 7.37595 5.54691 7.55224 5.62681 7.69002C5.68028 7.78223 5.77703 7.83392 5.87648 7.83392C5.92558 7.83392 5.97507 7.8214 6.02057 7.79503C6.15833 7.71533 6.20526 7.53899 6.12557 7.40119C6.0458 7.26343 5.86947 7.21633 5.73173 7.29627Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M6.93694 3.85758C6.98626 3.85758 7.03592 3.84485 7.08163 3.81842C7.21922 3.73831 7.26595 3.562 7.18584 3.42445C7.10592 3.28668 6.9294 3.24017 6.79185 3.32008C6.65426 3.39998 6.60755 3.57648 6.68749 3.71405C6.74097 3.80609 6.83756 3.85758 6.93694 3.85758Z"
                              fill="#64C3C5"
                            />
                            <path
                              d="M6.23197 5.23021L4.71841 5.12698L4.56733 2.91013C4.56212 2.83387 4.49869 2.77466 4.42222 2.77466C4.34576 2.77466 4.28242 2.83387 4.27717 2.91013L4.12876 5.08677L3.88651 5.07025C3.8542 5.06803 3.82243 5.07933 3.79877 5.10145C3.77516 5.12354 3.76172 5.15448 3.76172 5.18688V5.50681C3.76172 5.53922 3.77516 5.57012 3.79877 5.59222C3.82048 5.61249 3.84905 5.62371 3.87858 5.62371C3.88119 5.62371 3.88384 5.62363 3.88651 5.62346L4.09314 5.60935L4.07823 5.8275C4.07554 5.8677 4.08957 5.90719 4.11705 5.93659C4.14453 5.96603 4.18302 5.98274 4.22332 5.98274H4.62116C4.62133 5.98274 4.62152 5.98274 4.62161 5.98274C4.70187 5.98274 4.76695 5.91766 4.76695 5.83735C4.76695 5.83028 4.74834 5.56459 4.74834 5.56459L6.23204 5.46343C6.29339 5.45924 6.34104 5.40828 6.34104 5.3468C6.34091 5.28536 6.29332 5.2344 6.23197 5.23021Z"
                              fill="#64C3C5"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_543_15198">
                              <rect
                                width="8.54738"
                                height="8.54738"
                                fill="white"
                                transform="translate(0.148438 0.754395)"
                              />
                            </clipPath>
                          </defs>
                        </svg>{" "}
                        Einlass um 11 Uhr
                      </p>
                    </div>
                  </div>
                  <div className="_items_details px-2">
                    {element.items.map((itm, index) => (
                      <div key={index}>
                        <div className="_divider"></div>
                        <div className="_item row px-2">
                          <div className="_ticket col-8">{itm.name}:</div>
                          <div className="col-4 text-start">
                            <span className="_qty">{itm.orderQty} X</span>{" "}
                            <span className="_price">
                              {itm.price.toFixed(2).replace(".", ",")}€
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="_orders_divider"></div>
              </>
            ))}
          </div>
          <div className="_total_price_box _item _total row px-3 mt-3 d-flex align-items-center">
            <div className="_ticket col-8 text-start">
              Gesamtpreis
              <p className="vat_notice mb-0">Inkl. MwSt</p>
            </div>
            <div className="_price col-4 text-end">
              {calculateTotalPrice(checkoutCart)
                .toLocaleString("de-DE", {
                  minimumFractionDigits: 2,
                })
                .replace(".", ",")}{" "}
              €
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
