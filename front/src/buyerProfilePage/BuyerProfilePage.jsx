import React, { useEffect, useState } from "react";
import "./BuyerProfilePage.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/userAction";
import { Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import MyOrders from "./MyOrders/MyOrders";
import MetaData from "../landingPage/components/MetaData/MetaData";
import logo from "../media/org/Dino-Logo.webp";
import user from "../media/org/user.jpg";

export default function BuyerProfilePage() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const { isAdmin } = useSelector((state) => state.user);

  const [showMyOrders, setShowMyOrders] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);

  const [userInitInfo, setUserInitInfo] = useState({});

  const [btnClicked, setBtnClicked] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUserInitInfo(user);
      setFirstName(user.firstname);
      setLastName(user.lastname);
      setEmail(user.email);
    } else {
      navigate("/");
    }
  }, [navigate]);

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
  function capitalizeEachWord(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const resetForm = (e) => {
    e.preventDefault();
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const updateUserProfile = async (e) => {
    e.preventDefault();
    setBtnClicked(true);
    setBtnDisabled(true);
    const token = localStorage.getItem("token");
    const data = {
      firstname: firstName,
      lastname: lastName,
    };

    if (
      firstName === userInitInfo.firstname &&
      lastName === userInitInfo.lastname
    ) {
      toast.error("Keine Änderungen vorgenommen!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setBtnDisabled(false);
      return;
    }

    if (firstName === "" || lastName === "") {
      toast.error("Vorname und Nachname dürfen nicht leer sein.");
    }

    if (!validFirstName || !validLastName) {
      setBtnDisabled(false);
      return;
    }

    try {
      // eslint-disable-next-line
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}user/update-profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUser = data;
      setUserInitInfo((prevUserInitInfo) => ({
        ...prevUserInitInfo,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
      }));
      const userInLocalStorage = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...userInLocalStorage, ...updatedUser })
      );

      toast.success("Update erfolgreich durchgeführt.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setBtnDisabled(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Update fehlgeschlagen!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setBtnDisabled(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("updtBtn").click();
    }
  };

  return (
    <main className="buyer_profile_container">
      <MetaData title="eTicket - Konto" />
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
        <section className="_actions_container col-xl-3 mx-md-auto mx-xl-0 col-md-8 mb-5">
          <div className="_image px-5">
            {isAdmin ? (
              <img src={logo} alt="" className="img-fluid" />
            ) : (
              <img src={user} alt="" className="img-fluid" />
            )}
          </div>
          {width > 768 ? (
            <div className="_actions mt-3">
              <div className="_action">
                <div className="_label row">
                  <div className="col-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="24"
                      viewBox="0 0 23 24"
                      fill="none"
                    >
                      <g opacity="0.5" clipPath="url(#clip0_473_10208)">
                        <path
                          d="M20.3038 5.27728L15.4512 0.213684C15.3182 0.0748901 15.139 0 14.9562 0H7.9331C7.54688 0 7.2333 0.327209 7.2333 0.730225V4.92297H3.21542C2.8292 4.92297 2.51562 5.25 2.51562 5.6532V23.2698C2.51562 23.6728 2.8292 24 3.21542 24H15.0909C15.4773 24 15.7909 23.6728 15.7909 23.2698V19.077H19.8088C20.195 19.077 20.5086 18.75 20.5086 18.3468V5.79382C20.5086 5.60815 20.4402 5.41956 20.3038 5.27728ZM19.109 17.6166H15.7909V10.7168C15.7909 10.5276 15.7204 10.3403 15.586 10.2001L10.7335 5.13666C10.6017 4.99896 10.4229 4.92279 10.2385 4.92279H8.63307V1.46045H14.2564V5.79382C14.2564 6.19684 14.57 6.52405 14.9562 6.52405H19.109V17.6166ZM14.3911 22.5396H3.91522V6.38342H9.53853V10.7168C9.53853 11.1198 9.8521 11.447 10.2385 11.447H14.3911V22.5396ZM10.9383 7.41595L13.4016 9.98639H10.9383V7.41595ZM18.1193 5.0636H15.656V2.49316C15.9639 2.81433 17.8736 4.80725 18.1193 5.0636Z"
                          fill="#444790"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_473_10208">
                          <rect width="23" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <span className="col text-start">
                    Meine Bestellungen überprüfen
                  </span>
                </div>
                <div className="row _button mt-2">
                  <div className="col-2"></div>
                  <p className="col text-start">
                    <span
                      className="me-1 cursor-pointer"
                      onClick={() => setShowMyOrders(true)}
                    >
                      Mehr
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_473_10217)">
                        <path
                          d="M1.09111 0.164748C0.98562 0.0592595 0.842543 -2.22874e-06 0.693357 -2.45264e-08C0.544171 2.17969e-06 0.401097 0.0592682 0.295608 0.16476C0.190119 0.270252 0.130857 0.413329 0.130859 0.562515C0.130862 0.7117 0.190128 0.854775 0.29562 0.960264L5.33536 6.00001L0.29562 11.0397C0.190128 11.1452 0.130862 11.2883 0.13086 11.4375C0.130858 11.5867 0.190119 11.7298 0.295608 11.8353C0.401097 11.9407 0.544172 12 0.693358 12C0.842544 12 0.98562 11.9408 1.09111 11.8353L6.52861 6.39776C6.58085 6.34553 6.62228 6.28352 6.65055 6.21527C6.67882 6.14703 6.69337 6.07388 6.69337 6.00001C6.69337 5.92614 6.67882 5.85299 6.65055 5.78474C6.62228 5.71649 6.58085 5.65448 6.52861 5.60225L1.09111 0.164748ZM5.472 11.0397L10.5117 6.00001L5.472 0.960264C5.36651 0.854775 5.30724 0.7117 5.30724 0.562514C5.30724 0.413328 5.3665 0.270252 5.47199 0.16476C5.57748 0.059268 5.72055 1.96561e-06 5.86974 -2.40528e-07C6.01893 -2.44667e-06 6.162 0.0592593 6.26749 0.164748L11.705 5.60225C11.7572 5.65448 11.7987 5.71649 11.8269 5.78474C11.8552 5.85299 11.8698 5.92614 11.8698 6.00001C11.8698 6.07388 11.8552 6.14703 11.8269 6.21527C11.7987 6.28352 11.7572 6.34553 11.705 6.39776L6.26749 11.8353C6.162 11.9408 6.01893 12 5.86974 12C5.72055 12 5.57748 11.9407 5.47199 11.8353C5.3665 11.7298 5.30724 11.5867 5.30724 11.4375C5.30724 11.2883 5.36651 11.1452 5.472 11.0397Z"
                          fill="#444790"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_473_10217">
                          <rect
                            width="12"
                            height="12"
                            fill="white"
                            transform="matrix(4.37114e-08 1 1 -4.37114e-08 0 0)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </p>
                </div>
              </div>
              <div className="_divider"></div>
              <div className="_action">
                <div className="_label row">
                  <div className="col-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12.0009 0C8.29569 0 5.28125 3.01444 5.28125 6.71967V10.01C5.28125 10.234 5.46308 10.4157 5.68714 10.4157H7.93981C8.16388 10.4157 8.34556 10.234 8.34556 10.01V6.71967C8.34556 4.70414 9.9853 3.06436 12.0008 3.06436C14.0164 3.06436 15.6561 4.70414 15.6561 6.71967V10.01C15.6561 10.234 15.838 10.4157 16.0621 10.4157H18.3148C18.5388 10.4157 18.7205 10.234 18.7205 10.01V6.71967C18.7205 3.01444 15.7061 0 12.0009 0ZM17.909 9.60422H16.4677V6.71967C16.4677 4.25667 14.4639 2.25286 12.001 2.25286C9.53802 2.25286 7.5342 4.25667 7.5342 6.71967V9.60422H6.09289V6.71967C6.09289 3.46191 8.7432 0.811547 12.0009 0.811547C15.2587 0.811547 17.909 3.46191 17.909 6.71967V9.60422Z"
                        fill="#444790"
                        fill-opacity="0.5"
                      />
                      <path
                        d="M19.2475 9.60422H4.751C3.78983 9.60422 3.00781 10.3862 3.00781 11.3474V22.2568C3.00781 23.218 3.78983 24 4.751 24H19.2475C20.2087 24 20.9907 23.218 20.9907 22.2568V11.3474C20.9907 10.3862 20.2087 9.60422 19.2475 9.60422ZM20.1792 22.2568C20.1792 22.7705 19.7612 23.1885 19.2475 23.1885H4.751C4.23725 23.1885 3.81931 22.7705 3.81931 22.2568V11.3474C3.81931 10.8337 4.23725 10.4157 4.751 10.4157H19.2475C19.7612 10.4157 20.1792 10.8337 20.1792 11.3474V22.2568Z"
                        fill="#444790"
                        fill-opacity="0.5"
                      />
                      <path
                        d="M13.3639 17.3335C13.8379 16.9341 14.1138 16.3502 14.1138 15.7226C14.1138 14.5567 13.1652 13.6082 11.9993 13.6082C10.8333 13.6082 9.88477 14.5567 9.88477 15.7226C9.88477 16.3502 10.1606 16.9341 10.6348 17.3336L10.1786 19.5068C10.1535 19.6265 10.1837 19.7511 10.2607 19.846C10.3379 19.9408 10.4535 19.996 10.5757 19.996H13.4228C13.5451 19.996 13.6608 19.9409 13.7378 19.846C13.8148 19.751 13.845 19.6265 13.8199 19.5069L13.3639 17.3335ZM12.6955 16.8197C12.553 16.9105 12.4815 17.08 12.5162 17.2454L12.9231 19.1844H11.0755L11.4825 17.2455C11.5172 17.0801 11.4458 16.9105 11.3032 16.8198C10.9232 16.578 10.6963 16.1678 10.6963 15.7227C10.6963 15.0042 11.2808 14.4197 11.9993 14.4197C12.7177 14.4197 13.3022 15.0042 13.3022 15.7227C13.3023 16.1679 13.0755 16.578 12.6955 16.8197Z"
                        fill="#444790"
                        fill-opacity="0.5"
                      />
                    </svg>
                  </div>
                  <span className="col text-start cursor-pointer">
                    Meine Identität
                  </span>
                </div>
                <div className="row _button mt-2">
                  <div className="col-2"></div>
                  <p className="col text-start">
                    <span
                      className="me-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowMyOrders(false)}
                    >
                      Mehr
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_473_10217)">
                        <path
                          d="M1.09111 0.164748C0.98562 0.0592595 0.842543 -2.22874e-06 0.693357 -2.45264e-08C0.544171 2.17969e-06 0.401097 0.0592682 0.295608 0.16476C0.190119 0.270252 0.130857 0.413329 0.130859 0.562515C0.130862 0.7117 0.190128 0.854775 0.29562 0.960264L5.33536 6.00001L0.29562 11.0397C0.190128 11.1452 0.130862 11.2883 0.13086 11.4375C0.130858 11.5867 0.190119 11.7298 0.295608 11.8353C0.401097 11.9407 0.544172 12 0.693358 12C0.842544 12 0.98562 11.9408 1.09111 11.8353L6.52861 6.39776C6.58085 6.34553 6.62228 6.28352 6.65055 6.21527C6.67882 6.14703 6.69337 6.07388 6.69337 6.00001C6.69337 5.92614 6.67882 5.85299 6.65055 5.78474C6.62228 5.71649 6.58085 5.65448 6.52861 5.60225L1.09111 0.164748ZM5.472 11.0397L10.5117 6.00001L5.472 0.960264C5.36651 0.854775 5.30724 0.7117 5.30724 0.562514C5.30724 0.413328 5.3665 0.270252 5.47199 0.16476C5.57748 0.059268 5.72055 1.96561e-06 5.86974 -2.40528e-07C6.01893 -2.44667e-06 6.162 0.0592593 6.26749 0.164748L11.705 5.60225C11.7572 5.65448 11.7987 5.71649 11.8269 5.78474C11.8552 5.85299 11.8698 5.92614 11.8698 6.00001C11.8698 6.07388 11.8552 6.14703 11.8269 6.21527C11.7987 6.28352 11.7572 6.34553 11.705 6.39776L6.26749 11.8353C6.162 11.9408 6.01893 12 5.86974 12C5.72055 12 5.57748 11.9407 5.47199 11.8353C5.3665 11.7298 5.30724 11.5867 5.30724 11.4375C5.30724 11.2883 5.36651 11.1452 5.472 11.0397Z"
                          fill="#444790"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_473_10217">
                          <rect
                            width="12"
                            height="12"
                            fill="white"
                            transform="matrix(4.37114e-08 1 1 -4.37114e-08 0 0)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </p>
                </div>
              </div>
              <div className="_divider"></div>
              <div className="_action">
                <div className="_label row">
                  <div className="col-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_473_10275)">
                        <path
                          d="M10.1445 19.7967H4.6672C3.17866 19.7967 1.97089 18.5845 1.97089 17.1004V3.89962C1.97089 2.41108 3.18311 1.20331 4.6672 1.20331H10.2336C10.5679 1.20331 10.8353 0.935908 10.8353 0.601655C10.8353 0.267402 10.5679 0 10.2336 0H4.6672C2.51461 0 0.767578 1.75149 0.767578 3.89962V17.1004C0.767578 19.253 2.51906 21 4.6672 21H10.1445C10.4787 21 10.7461 20.7326 10.7461 20.3983C10.7461 20.0641 10.4743 19.7967 10.1445 19.7967Z"
                          fill="#444790"
                          fill-opacity="0.5"
                        />
                        <path
                          d="M20.0559 10.0766L16.2321 6.25275C15.9959 6.01654 15.6171 6.01654 15.3809 6.25275C15.1446 6.48895 15.1446 6.86777 15.3809 7.10398L18.1797 9.90279H5.97275C5.6385 9.90279 5.37109 10.1702 5.37109 10.5044C5.37109 10.8387 5.6385 11.1061 5.97275 11.1061H18.1797L15.3809 13.9049C15.1446 14.1411 15.1446 14.5199 15.3809 14.7561C15.4967 14.872 15.6527 14.9344 15.8042 14.9344C15.9558 14.9344 16.1118 14.8765 16.2276 14.7561L20.0515 10.9323C20.2921 10.6916 20.2921 10.3083 20.0559 10.0766Z"
                          fill="#444790"
                          fill-opacity="0.5"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_473_10275">
                          <rect width="21" height="21" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="col _button">
                    <p
                      className="text-start logout_action text-decoration-underline"
                      onClick={handleLogout}
                    >
                      <span className="me-1 cursor-pointer">Ausloggen</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_473_10217)">
                          <path
                            d="M1.09111 0.164748C0.98562 0.0592595 0.842543 -2.22874e-06 0.693357 -2.45264e-08C0.544171 2.17969e-06 0.401097 0.0592682 0.295608 0.16476C0.190119 0.270252 0.130857 0.413329 0.130859 0.562515C0.130862 0.7117 0.190128 0.854775 0.29562 0.960264L5.33536 6.00001L0.29562 11.0397C0.190128 11.1452 0.130862 11.2883 0.13086 11.4375C0.130858 11.5867 0.190119 11.7298 0.295608 11.8353C0.401097 11.9407 0.544172 12 0.693358 12C0.842544 12 0.98562 11.9408 1.09111 11.8353L6.52861 6.39776C6.58085 6.34553 6.62228 6.28352 6.65055 6.21527C6.67882 6.14703 6.69337 6.07388 6.69337 6.00001C6.69337 5.92614 6.67882 5.85299 6.65055 5.78474C6.62228 5.71649 6.58085 5.65448 6.52861 5.60225L1.09111 0.164748ZM5.472 11.0397L10.5117 6.00001L5.472 0.960264C5.36651 0.854775 5.30724 0.7117 5.30724 0.562514C5.30724 0.413328 5.3665 0.270252 5.47199 0.16476C5.57748 0.059268 5.72055 1.96561e-06 5.86974 -2.40528e-07C6.01893 -2.44667e-06 6.162 0.0592593 6.26749 0.164748L11.705 5.60225C11.7572 5.65448 11.7987 5.71649 11.8269 5.78474C11.8552 5.85299 11.8698 5.92614 11.8698 6.00001C11.8698 6.07388 11.8552 6.14703 11.8269 6.21527C11.7987 6.28352 11.7572 6.34553 11.705 6.39776L6.26749 11.8353C6.162 11.9408 6.01893 12 5.86974 12C5.72055 12 5.57748 11.9407 5.47199 11.8353C5.3665 11.7298 5.30724 11.5867 5.30724 11.4375C5.30724 11.2883 5.36651 11.1452 5.472 11.0397Z"
                            fill="#444790"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_473_10217">
                            <rect
                              width="12"
                              height="12"
                              fill="white"
                              transform="matrix(4.37114e-08 1 1 -4.37114e-08 0 0)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </section>
        <section className="_info_container col-xl-6 mb-5" style={{ order: 3 }}>
          {showMyOrders ? (
            <MyOrders />
          ) : (
            <>
              <div className="_header">
                <h2 className="_title">Mein Profil</h2>
                <div className="_divider"></div>
              </div>
              <Form className="_form">
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
                        placeholder="Vorname"
                        aria-label="first name"
                        aria-describedby="basic-addon1"
                        value={firstName}
                        onChange={(e) => {
                          onFirstNameChange(e);
                        }}
                        onKeyPress={handleKeyPress}
                      />
                    </InputGroup>
                    {btnClicked && firstName === "" ? (
                      <p className="reg_input_feedback text-start">
                        Der Vorname darf nicht leer sein.
                      </p>
                    ) : btnClicked && !validFirstName ? (
                      <p className="reg_input_feedback text-start">
                        Der Vorname muss mindestens 3 Zeichen lang sein.
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
                        placeholder="Nachname"
                        aria-label="last name"
                        aria-describedby="basic-addon1"
                        value={lastName}
                        onChange={(e) => {
                          onLastNameChange(e);
                        }}
                        onKeyPress={handleKeyPress}
                        id="profile-user-info-form"
                      />
                    </InputGroup>
                    {btnClicked && lastName === "" ? (
                      <p className="reg_input_feedback text-start">
                        First name can't be empty
                      </p>
                    ) : btnClicked && !validLastName ? (
                      <p className="reg_input_feedback text-start">
                        Der Nachname muss mindestens 3 Zeichen lang sein.
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
                        placeholder="Email"
                        aria-label="email"
                        aria-describedby="basic-addon1"
                        type="email"
                        value={email}
                        readOnly
                        id="profile-user-info-form"
                      />
                    </InputGroup>
                  </div>

                  <div className="col-12 mt-5">
                    <button
                      className="btn _reset_button me-4"
                      onClick={(e) => {
                        resetForm(e);
                      }}
                    >
                      Zurücksetzen
                    </button>
                    <button
                      className="btn _submit_button"
                      disabled={btnDisabled}
                      onClick={(e) => {
                        updateUserProfile(e);
                      }}
                      id="updtBtn"
                    >
                      {btnDisabled ? "..." : "Aktualisieren"}
                    </button>
                  </div>
                </div>
              </Form>
            </>
          )}
        </section>
        {width <= 768 ? (
          <div className="_actions mt-3 mb-5">
            <div className="_action">
              <div className="_label row">
                <div className="col-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="24"
                    viewBox="0 0 23 24"
                    fill="none"
                  >
                    <g opacity="0.5" clipPath="url(#clip0_473_10208)">
                      <path
                        d="M20.3038 5.27728L15.4512 0.213684C15.3182 0.0748901 15.139 0 14.9562 0H7.9331C7.54688 0 7.2333 0.327209 7.2333 0.730225V4.92297H3.21542C2.8292 4.92297 2.51562 5.25 2.51562 5.6532V23.2698C2.51562 23.6728 2.8292 24 3.21542 24H15.0909C15.4773 24 15.7909 23.6728 15.7909 23.2698V19.077H19.8088C20.195 19.077 20.5086 18.75 20.5086 18.3468V5.79382C20.5086 5.60815 20.4402 5.41956 20.3038 5.27728ZM19.109 17.6166H15.7909V10.7168C15.7909 10.5276 15.7204 10.3403 15.586 10.2001L10.7335 5.13666C10.6017 4.99896 10.4229 4.92279 10.2385 4.92279H8.63307V1.46045H14.2564V5.79382C14.2564 6.19684 14.57 6.52405 14.9562 6.52405H19.109V17.6166ZM14.3911 22.5396H3.91522V6.38342H9.53853V10.7168C9.53853 11.1198 9.8521 11.447 10.2385 11.447H14.3911V22.5396ZM10.9383 7.41595L13.4016 9.98639H10.9383V7.41595ZM18.1193 5.0636H15.656V2.49316C15.9639 2.81433 17.8736 4.80725 18.1193 5.0636Z"
                        fill="#444790"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_473_10208">
                        <rect width="23" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <span className="col text-start">
                  Meine Bestellungen überprüfen
                </span>
              </div>
              <div className="row _button mt-2">
                <div className="col-2"></div>
                <p className="col text-start">
                  <span className="me-1" onClick={() => setShowMyOrders(true)}>
                    Mehr
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_473_10217)">
                      <path
                        d="M1.09111 0.164748C0.98562 0.0592595 0.842543 -2.22874e-06 0.693357 -2.45264e-08C0.544171 2.17969e-06 0.401097 0.0592682 0.295608 0.16476C0.190119 0.270252 0.130857 0.413329 0.130859 0.562515C0.130862 0.7117 0.190128 0.854775 0.29562 0.960264L5.33536 6.00001L0.29562 11.0397C0.190128 11.1452 0.130862 11.2883 0.13086 11.4375C0.130858 11.5867 0.190119 11.7298 0.295608 11.8353C0.401097 11.9407 0.544172 12 0.693358 12C0.842544 12 0.98562 11.9408 1.09111 11.8353L6.52861 6.39776C6.58085 6.34553 6.62228 6.28352 6.65055 6.21527C6.67882 6.14703 6.69337 6.07388 6.69337 6.00001C6.69337 5.92614 6.67882 5.85299 6.65055 5.78474C6.62228 5.71649 6.58085 5.65448 6.52861 5.60225L1.09111 0.164748ZM5.472 11.0397L10.5117 6.00001L5.472 0.960264C5.36651 0.854775 5.30724 0.7117 5.30724 0.562514C5.30724 0.413328 5.3665 0.270252 5.47199 0.16476C5.57748 0.059268 5.72055 1.96561e-06 5.86974 -2.40528e-07C6.01893 -2.44667e-06 6.162 0.0592593 6.26749 0.164748L11.705 5.60225C11.7572 5.65448 11.7987 5.71649 11.8269 5.78474C11.8552 5.85299 11.8698 5.92614 11.8698 6.00001C11.8698 6.07388 11.8552 6.14703 11.8269 6.21527C11.7987 6.28352 11.7572 6.34553 11.705 6.39776L6.26749 11.8353C6.162 11.9408 6.01893 12 5.86974 12C5.72055 12 5.57748 11.9407 5.47199 11.8353C5.3665 11.7298 5.30724 11.5867 5.30724 11.4375C5.30724 11.2883 5.36651 11.1452 5.472 11.0397Z"
                        fill="#444790"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_473_10217">
                        <rect
                          width="12"
                          height="12"
                          fill="white"
                          transform="matrix(4.37114e-08 1 1 -4.37114e-08 0 0)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </p>
              </div>
            </div>
            <div className="_divider"></div>
            <div className="_action">
              <div className="_label row">
                <div className="col-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12.0009 0C8.29569 0 5.28125 3.01444 5.28125 6.71967V10.01C5.28125 10.234 5.46308 10.4157 5.68714 10.4157H7.93981C8.16388 10.4157 8.34556 10.234 8.34556 10.01V6.71967C8.34556 4.70414 9.9853 3.06436 12.0008 3.06436C14.0164 3.06436 15.6561 4.70414 15.6561 6.71967V10.01C15.6561 10.234 15.838 10.4157 16.0621 10.4157H18.3148C18.5388 10.4157 18.7205 10.234 18.7205 10.01V6.71967C18.7205 3.01444 15.7061 0 12.0009 0ZM17.909 9.60422H16.4677V6.71967C16.4677 4.25667 14.4639 2.25286 12.001 2.25286C9.53802 2.25286 7.5342 4.25667 7.5342 6.71967V9.60422H6.09289V6.71967C6.09289 3.46191 8.7432 0.811547 12.0009 0.811547C15.2587 0.811547 17.909 3.46191 17.909 6.71967V9.60422Z"
                      fill="#444790"
                      fill-opacity="0.5"
                    />
                    <path
                      d="M19.2475 9.60422H4.751C3.78983 9.60422 3.00781 10.3862 3.00781 11.3474V22.2568C3.00781 23.218 3.78983 24 4.751 24H19.2475C20.2087 24 20.9907 23.218 20.9907 22.2568V11.3474C20.9907 10.3862 20.2087 9.60422 19.2475 9.60422ZM20.1792 22.2568C20.1792 22.7705 19.7612 23.1885 19.2475 23.1885H4.751C4.23725 23.1885 3.81931 22.7705 3.81931 22.2568V11.3474C3.81931 10.8337 4.23725 10.4157 4.751 10.4157H19.2475C19.7612 10.4157 20.1792 10.8337 20.1792 11.3474V22.2568Z"
                      fill="#444790"
                      fill-opacity="0.5"
                    />
                    <path
                      d="M13.3639 17.3335C13.8379 16.9341 14.1138 16.3502 14.1138 15.7226C14.1138 14.5567 13.1652 13.6082 11.9993 13.6082C10.8333 13.6082 9.88477 14.5567 9.88477 15.7226C9.88477 16.3502 10.1606 16.9341 10.6348 17.3336L10.1786 19.5068C10.1535 19.6265 10.1837 19.7511 10.2607 19.846C10.3379 19.9408 10.4535 19.996 10.5757 19.996H13.4228C13.5451 19.996 13.6608 19.9409 13.7378 19.846C13.8148 19.751 13.845 19.6265 13.8199 19.5069L13.3639 17.3335ZM12.6955 16.8197C12.553 16.9105 12.4815 17.08 12.5162 17.2454L12.9231 19.1844H11.0755L11.4825 17.2455C11.5172 17.0801 11.4458 16.9105 11.3032 16.8198C10.9232 16.578 10.6963 16.1678 10.6963 15.7227C10.6963 15.0042 11.2808 14.4197 11.9993 14.4197C12.7177 14.4197 13.3022 15.0042 13.3022 15.7227C13.3023 16.1679 13.0755 16.578 12.6955 16.8197Z"
                      fill="#444790"
                      fill-opacity="0.5"
                    />
                  </svg>
                </div>
                <span className="col text-start">Meine Identität</span>
              </div>
              <div className="row _button mt-2">
                <div className="col-2"></div>
                <p className="col text-start">
                  <span className="me-1" onClick={() => setShowMyOrders(false)}>
                    Mehr
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_473_10217)">
                      <path
                        d="M1.09111 0.164748C0.98562 0.0592595 0.842543 -2.22874e-06 0.693357 -2.45264e-08C0.544171 2.17969e-06 0.401097 0.0592682 0.295608 0.16476C0.190119 0.270252 0.130857 0.413329 0.130859 0.562515C0.130862 0.7117 0.190128 0.854775 0.29562 0.960264L5.33536 6.00001L0.29562 11.0397C0.190128 11.1452 0.130862 11.2883 0.13086 11.4375C0.130858 11.5867 0.190119 11.7298 0.295608 11.8353C0.401097 11.9407 0.544172 12 0.693358 12C0.842544 12 0.98562 11.9408 1.09111 11.8353L6.52861 6.39776C6.58085 6.34553 6.62228 6.28352 6.65055 6.21527C6.67882 6.14703 6.69337 6.07388 6.69337 6.00001C6.69337 5.92614 6.67882 5.85299 6.65055 5.78474C6.62228 5.71649 6.58085 5.65448 6.52861 5.60225L1.09111 0.164748ZM5.472 11.0397L10.5117 6.00001L5.472 0.960264C5.36651 0.854775 5.30724 0.7117 5.30724 0.562514C5.30724 0.413328 5.3665 0.270252 5.47199 0.16476C5.57748 0.059268 5.72055 1.96561e-06 5.86974 -2.40528e-07C6.01893 -2.44667e-06 6.162 0.0592593 6.26749 0.164748L11.705 5.60225C11.7572 5.65448 11.7987 5.71649 11.8269 5.78474C11.8552 5.85299 11.8698 5.92614 11.8698 6.00001C11.8698 6.07388 11.8552 6.14703 11.8269 6.21527C11.7987 6.28352 11.7572 6.34553 11.705 6.39776L6.26749 11.8353C6.162 11.9408 6.01893 12 5.86974 12C5.72055 12 5.57748 11.9407 5.47199 11.8353C5.3665 11.7298 5.30724 11.5867 5.30724 11.4375C5.30724 11.2883 5.36651 11.1452 5.472 11.0397Z"
                        fill="#444790"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_473_10217">
                        <rect
                          width="12"
                          height="12"
                          fill="white"
                          transform="matrix(4.37114e-08 1 1 -4.37114e-08 0 0)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </p>
              </div>
            </div>
            <div className="_divider"></div>
            <div className="_action">
              <div className="_label row">
                <div className="col-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_473_10275)">
                      <path
                        d="M10.1445 19.7967H4.6672C3.17866 19.7967 1.97089 18.5845 1.97089 17.1004V3.89962C1.97089 2.41108 3.18311 1.20331 4.6672 1.20331H10.2336C10.5679 1.20331 10.8353 0.935908 10.8353 0.601655C10.8353 0.267402 10.5679 0 10.2336 0H4.6672C2.51461 0 0.767578 1.75149 0.767578 3.89962V17.1004C0.767578 19.253 2.51906 21 4.6672 21H10.1445C10.4787 21 10.7461 20.7326 10.7461 20.3983C10.7461 20.0641 10.4743 19.7967 10.1445 19.7967Z"
                        fill="#444790"
                        fill-opacity="0.5"
                      />
                      <path
                        d="M20.0559 10.0766L16.2321 6.25275C15.9959 6.01654 15.6171 6.01654 15.3809 6.25275C15.1446 6.48895 15.1446 6.86777 15.3809 7.10398L18.1797 9.90279H5.97275C5.6385 9.90279 5.37109 10.1702 5.37109 10.5044C5.37109 10.8387 5.6385 11.1061 5.97275 11.1061H18.1797L15.3809 13.9049C15.1446 14.1411 15.1446 14.5199 15.3809 14.7561C15.4967 14.872 15.6527 14.9344 15.8042 14.9344C15.9558 14.9344 16.1118 14.8765 16.2276 14.7561L20.0515 10.9323C20.2921 10.6916 20.2921 10.3083 20.0559 10.0766Z"
                        fill="#444790"
                        fill-opacity="0.5"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_473_10275">
                        <rect width="21" height="21" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="col _button">
                  <p
                    className="text-start logout_action text-decoration-underline"
                    onClick={handleLogout}
                  >
                    <span className="me-1">Ausloggen</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_473_10217)">
                        <path
                          d="M1.09111 0.164748C0.98562 0.0592595 0.842543 -2.22874e-06 0.693357 -2.45264e-08C0.544171 2.17969e-06 0.401097 0.0592682 0.295608 0.16476C0.190119 0.270252 0.130857 0.413329 0.130859 0.562515C0.130862 0.7117 0.190128 0.854775 0.29562 0.960264L5.33536 6.00001L0.29562 11.0397C0.190128 11.1452 0.130862 11.2883 0.13086 11.4375C0.130858 11.5867 0.190119 11.7298 0.295608 11.8353C0.401097 11.9407 0.544172 12 0.693358 12C0.842544 12 0.98562 11.9408 1.09111 11.8353L6.52861 6.39776C6.58085 6.34553 6.62228 6.28352 6.65055 6.21527C6.67882 6.14703 6.69337 6.07388 6.69337 6.00001C6.69337 5.92614 6.67882 5.85299 6.65055 5.78474C6.62228 5.71649 6.58085 5.65448 6.52861 5.60225L1.09111 0.164748ZM5.472 11.0397L10.5117 6.00001L5.472 0.960264C5.36651 0.854775 5.30724 0.7117 5.30724 0.562514C5.30724 0.413328 5.3665 0.270252 5.47199 0.16476C5.57748 0.059268 5.72055 1.96561e-06 5.86974 -2.40528e-07C6.01893 -2.44667e-06 6.162 0.0592593 6.26749 0.164748L11.705 5.60225C11.7572 5.65448 11.7987 5.71649 11.8269 5.78474C11.8552 5.85299 11.8698 5.92614 11.8698 6.00001C11.8698 6.07388 11.8552 6.14703 11.8269 6.21527C11.7987 6.28352 11.7572 6.34553 11.705 6.39776L6.26749 11.8353C6.162 11.9408 6.01893 12 5.86974 12C5.72055 12 5.57748 11.9407 5.47199 11.8353C5.3665 11.7298 5.30724 11.5867 5.30724 11.4375C5.30724 11.2883 5.36651 11.1452 5.472 11.0397Z"
                          fill="#444790"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_473_10217">
                          <rect
                            width="12"
                            height="12"
                            fill="white"
                            transform="matrix(4.37114e-08 1 1 -4.37114e-08 0 0)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
