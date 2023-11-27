import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./Register.css";
import axios from "axios";
import { InputGroup } from "react-bootstrap";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { handlePaste } from "../../../utils/utils";

export default function Register({ show, onHide, changeAuthMode }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [password, setPassword] = useState("");

  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validEmail2, setValidEmail2] = useState(false);
  const [validPassword, setValidPassword] = useState(true);

  const [passwordCriteria, setPasswordCriteria] = useState({});

  const [pwShow, setPwShow] = useState(false);

  const [signupBtnDisabled, setSignupBtnDisabled] = useState(false);

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

    const emailRegex = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (emailRegex.test(eml) && eml.length > 0) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const onEmail2Change = (e) => {
    const eml = e.target.value.toLowerCase();
    setEmail2(eml);
    if (eml === email) {
      setValidEmail2(true);
    } else {
      setValidEmail2(false);
    }
  };

  const onPasswordChange = (e) => {
    const pw = e.target.value;
    setPassword(pw);

    const criteria = {
      length: pw.length >= 8,
      uppercase: /[A-Z]/.test(pw),
      lowercase: /[a-z]/.test(pw),
      number: /[0-9]/.test(pw),
      // eslint-disable-next-line
      specialChar: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|/-]/.test(pw),
    };

    const isValidPassword = Object.values(criteria).every(
      (criterion) => criterion
    );

    setValidPassword(isValidPassword);
    setPasswordCriteria(criteria);
  };

  const registerBuyer = async () => {
    setSignupBtnDisabled(true);
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      toast.error("Bitte füllen Sie alle Felder aus.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setSignupBtnDisabled(false);
      return;
    }

    if (
      !validFirstName ||
      !validLastName ||
      !validEmail ||
      !validEmail2 ||
      !validPassword
    ) {
      setSignupBtnDisabled(false);
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}auth/buyer-register`,
        {
          firstname: firstName,
          lastname: lastName,
          email,
          password,
        }
      );
      if (response.status === 201) {
        toast.success(
          "Registrierung erfolgreich. Bitte überprüfen Sie Ihre E-Mail zur Bestätigung.",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        hideModal();
      }
    } catch (error) {
      console.error("Registration failed: ", error);
      toast.error("Registrierung fehlgeschlagen!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setSignupBtnDisabled(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      document.getElementById("regBtn").click();
    }
  };

  const hideModal = () => {
    onHide();
  };

  const [btnClicked, setBtnClicked] = useState(false);

  return (
    <div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="signup_modal"
        show={show}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Registrieren
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="_signup_form">
            <InputGroup className="_input_group">
              <InputGroup.Text id="first-name-input">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                >
                  <path
                    d="M0 20C0 15.8095 3.6 12.381 8 12.381C12.4 12.381 16 15.8095 16 20H0ZM8 11.4286C4.7 11.4286 2 8.85714 2 5.71429C2 2.57143 4.7 0 8 0C11.3 0 14 2.57143 14 5.71429C14 8.85714 11.3 11.4286 8 11.4286Z"
                    fill="#444790"
                  />
                </svg>
              </InputGroup.Text>
              <Form.Control
                placeholder="*Vorname"
                aria-label="First name"
                aria-describedby="first-name-input"
                value={firstName}
                onChange={(e) => {
                  onFirstNameChange(e);
                }}
                maxLength={12}
                onKeyPress={handleKeyPress}
              />
            </InputGroup>
            {btnClicked && firstName === "" ? (
              <p className="reg_input_feedback">
                Vorname darf nicht leer sein.
              </p>
            ) : btnClicked && firstName.length < 3 ? (
              <p className="reg_input_feedback">
                Der Vorname muss mindestens 3 Zeichen lang sein.
              </p>
            ) : firstName.length === 12 ? (
              <p className="reg_input_feedback">Maximale Länge erreicht.</p>
            ) : (
              <p></p>
            )}
            <InputGroup className="_input_group">
              <InputGroup.Text id="last-name-input">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                >
                  <path
                    d="M0 20C0 15.8095 3.6 12.381 8 12.381C12.4 12.381 16 15.8095 16 20H0ZM8 11.4286C4.7 11.4286 2 8.85714 2 5.71429C2 2.57143 4.7 0 8 0C11.3 0 14 2.57143 14 5.71429C14 8.85714 11.3 11.4286 8 11.4286Z"
                    fill="#444790"
                  />
                </svg>
              </InputGroup.Text>
              <Form.Control
                placeholder="*Nachname"
                aria-label="Last name"
                aria-describedby="last-name-input"
                value={lastName}
                onChange={(e) => {
                  onLastNameChange(e);
                }}
                maxLength={12}
                onKeyPress={handleKeyPress}
              />
            </InputGroup>
            {btnClicked && lastName === "" ? (
              <p className="reg_input_feedback">
                Nachname darf nicht leer sein.
              </p>
            ) : btnClicked && lastName.length < 3 ? (
              <p className="reg_input_feedback">
                Der Nachname muss mindestens 3 Zeichen lang sein.
              </p>
            ) : lastName.length === 12 ? (
              <p className="reg_input_feedback">Maximale Länge erreicht.</p>
            ) : (
              <p></p>
            )}
            <InputGroup className="_input_group">
              <InputGroup.Text id="email-input">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M21.2746 4.90806C21.185 4.30916 20.8838 3.76218 20.4256 3.36626C19.9673 2.97035 19.3824 2.75172 18.7769 2.75H3.22425C2.61869 2.75172 2.03378 2.97035 1.57556 3.36626C1.11735 3.76218 0.816146 4.30916 0.726562 4.90806L11.0006 11.5562L21.2746 4.90806Z"
                    fill="#444790"
                  />
                  <path
                    d="M11.3733 12.9526C11.2621 13.0245 11.1325 13.0627 11 13.0627C10.8675 13.0627 10.7379 13.0245 10.6267 12.9526L0.6875 6.52168V16.7139C0.688228 17.3863 0.955666 18.031 1.43114 18.5064C1.90661 18.9819 2.55127 19.2493 3.22369 19.2501H18.7763C19.4487 19.2493 20.0934 18.9819 20.5689 18.5064C21.0443 18.031 21.3118 17.3863 21.3125 16.7139V6.521L11.3733 12.9526Z"
                    fill="#444790"
                  />
                </svg>
              </InputGroup.Text>
              <Form.Control
                placeholder="*Email"
                aria-label="Email"
                aria-describedby="email-input"
                type="email"
                value={email}
                onChange={(e) => {
                  onEmailChange(e);
                }}
                autoComplete="off"
                maxLength={30}
                onKeyPress={handleKeyPress}
                onPaste={(e) => {
                  handlePaste(e);
                }}
              />
            </InputGroup>
            {btnClicked && email === "" ? (
              <p className="reg_input_feedback">
                Die E-Mail darf nicht leer sein.
              </p>
            ) : btnClicked && !validEmail ? (
              <p className="reg_input_feedback">Ungültige E-Mail-Adresse.</p>
            ) : email.length === 30 ? (
              <p className="reg_input_feedback">Maximale Länge erreicht.</p>
            ) : (
              <p></p>
            )}
            <InputGroup className="_input_group">
              <InputGroup.Text id="email-comfirm-input">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M21.2746 4.90806C21.185 4.30916 20.8838 3.76218 20.4256 3.36626C19.9673 2.97035 19.3824 2.75172 18.7769 2.75H3.22425C2.61869 2.75172 2.03378 2.97035 1.57556 3.36626C1.11735 3.76218 0.816146 4.30916 0.726562 4.90806L11.0006 11.5562L21.2746 4.90806Z"
                    fill="#444790"
                  />
                  <path
                    d="M11.3733 12.9526C11.2621 13.0245 11.1325 13.0627 11 13.0627C10.8675 13.0627 10.7379 13.0245 10.6267 12.9526L0.6875 6.52168V16.7139C0.688228 17.3863 0.955666 18.031 1.43114 18.5064C1.90661 18.9819 2.55127 19.2493 3.22369 19.2501H18.7763C19.4487 19.2493 20.0934 18.9819 20.5689 18.5064C21.0443 18.031 21.3118 17.3863 21.3125 16.7139V6.521L11.3733 12.9526Z"
                    fill="#444790"
                  />
                </svg>
              </InputGroup.Text>
              <Form.Control
                placeholder="*E-Mail bestätigen"
                aria-label="Comfirm email"
                aria-describedby="email-comfirm-input"
                type="email"
                value={email2}
                onChange={(e) => {
                  onEmail2Change(e);
                }}
                autoComplete="off"
                onKeyPress={handleKeyPress}
                onPaste={(e) => {
                  handlePaste(e);
                }}
              />
            </InputGroup>
            {btnClicked && email2 === "" ? (
              <p className="reg_input_feedback">
                Die Bestätigungs-E-Mail darf nicht leer sein.
              </p>
            ) : btnClicked && !validEmail2 ? (
              <p className="reg_input_feedback">
                Die E-Mails stimmen nicht überein.
              </p>
            ) : (
              <p></p>
            )}
            <InputGroup className="_input_group">
              <InputGroup.Text id="password-input">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clipPath="url(#clip0_171_5414)">
                    <path
                      d="M18.1151 1.8847C15.602 -0.628423 11.513 -0.628384 8.99992 1.88474C7.28332 3.60134 6.68707 6.13107 7.43035 8.42619L0.17168 15.6849C0.0617969 15.7948 0 15.9435 0 16.0992V19.414C0 19.7378 0.26207 19.9999 0.585938 19.9999H3.9007C4.05633 19.9999 4.20512 19.9381 4.31496 19.8282L5.14352 18.9991C5.26996 18.8726 5.33176 18.6952 5.31117 18.5173L5.20816 17.6269L6.44184 17.5108C6.72223 17.4844 6.94367 17.263 6.97 16.9826L7.08617 15.7489L7.97652 15.8525C8.14187 15.8748 8.3084 15.8193 8.43371 15.7083C8.55844 15.5967 8.62996 15.4376 8.62996 15.2706V14.1796H9.70113C9.85676 14.1796 10.0055 14.1178 10.1154 14.0079L11.618 12.5252C13.9125 13.269 16.3985 12.7177 18.1151 10.9999C20.6282 8.48685 20.6282 4.39783 18.1151 1.8847ZM16.4575 6.02806C15.772 6.71357 14.6573 6.71357 13.9718 6.02806C13.2863 5.34255 13.2863 4.22791 13.9718 3.5424C14.6573 2.85689 15.772 2.85689 16.4575 3.5424C17.143 4.22791 17.143 5.34255 16.4575 6.02806Z"
                      fill="#444790"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_171_5414">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </InputGroup.Text>
              <Form.Control
                placeholder="*Passwort"
                aria-label="Password"
                aria-describedby="password-input"
                type={pwShow ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  onPasswordChange(e);
                }}
                autocomplete="new-password"
                className="_pw_input"
                maxLength={30}
                onKeyPress={handleKeyPress}
                onPaste={(e) => {
                  handlePaste(e);
                }}
              />
              <InputGroup.Text
                id="basic-addon2"
                className="show_pw_btn"
                onClick={() => {
                  setPwShow(!pwShow);
                }}
              >
                {pwShow ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="#444790"
                    className="bi bi-eye-slash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="#444790"
                    className="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                  </svg>
                )}
              </InputGroup.Text>
            </InputGroup>
            {btnClicked && password === "" ? (
              <p className="reg_input_feedback">
                Das Passwort darf nicht leer sein.
              </p>
            ) : btnClicked && !validPassword ? (
              <div className="reg_input_feedback">
                <p>
                  Ungültiges Passwort. Bitte stellen Sie sicher, dass es
                  folgende Kriterien erfüllt:
                </p>
                <ul>
                  {Object.entries(passwordCriteria).map(
                    ([criterion, isMet]) =>
                      !isMet && <li key={criterion}>- {criterion}</li>
                  )}
                </ul>
              </div>
            ) : password.length === 30 ? (
              <p className="reg_input_feedback">Maximale Länge erreicht.</p>
            ) : (
              <p></p>
            )}
          </Form>
          <p className="reg_input_feedback text-end">
            <em>*erforderlich</em>
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center mb-4">
          <button
            className="btn signup_btn"
            id="regBtn"
            onClick={() => {
              registerBuyer();
              if (btnClicked === false) {
                setBtnClicked(true);
              } else {
                return;
              }
            }}
            disabled={signupBtnDisabled}
          >
            {signupBtnDisabled ? "..." : "Registrieren"}
          </button>
          <p className="signup_notif mt-3">
            Sie haben bereits ein Konto?{" "}
            <p className="_link" onClick={changeAuthMode}>
              Einloggen
            </p>
          </p>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
