import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import MobileCart from "./mobileViewCart/MobileCart";
import MetaData from "../MetaData/MetaData";
import { calculateTotalPrice } from "../../../utils/utils";

export default function Cart({ updateCartData }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (!cartData) {
      return;
    }
    setCart(cartData);
  }, []);

  const handleDeleteItem = (eventId, itemId) => {
    const updatedCart = cart.map((el) => {
      if (el.date.id === eventId) {
        el.items = el.items.filter((itm) => itm._id !== itemId);
      }
      return el;
    });
    setCart(updatedCart);
    updateCartData((prev) => prev + 1);
    if (updatedCart[0].items.length === 0) {
      localStorage.removeItem("cart");
      setCart([]);
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };


  function formatTimeToAmPm(timeString) {
    if (!timeString) {
      return;
    }
    const [hours, minutes] = timeString.split(":");
    let period = "am";

    let hoursNum = parseInt(hours);
    if (hoursNum >= 12) {
      if (hoursNum > 12) {
        hoursNum -= 12;
      }
      period = "pm";
    } else if (hoursNum === 0) {
      hoursNum = 12;
    }

    if (minutes === "00") {
      return `${hoursNum}${period}`;
    } else {
      return `${hoursNum}:${minutes}${period}`;
    }
  }

  function formatDateFull(inputDate) {
    if (!inputDate) {
      return;
    }
    const months = [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ];

    const date = new Date(inputDate);
    const dd = date.getDate();
    const mm = months[date.getUTCMonth()];
    const yyyy = date.getUTCFullYear();

    const formattedDate = `${dd} ${mm}, ${yyyy}`;

    return formattedDate;
  }

  const getTotalPrice = (items) => {
    let totalPrice = 0;
    for (const item of items) {
      totalPrice += item.orderQty * item.price;
    }
    return totalPrice.toFixed(2);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleIncrement = (dateId, itemId) => {
    const updatedCart = [...cart];
    const eventIndex = updatedCart.findIndex(
      (event) => event.date.id === dateId
    );
    const itemIndex = updatedCart[eventIndex].items.findIndex(
      (item) => item._id === itemId
    );

    if (itemIndex !== -1) {
      updatedCart[eventIndex].items[itemIndex].orderQty += 1;
      setCart(updatedCart);

      // Update local storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      updateCartData((prev) => prev + 1);
    }
  };

  const handleDecrement = (dateId, itemId) => {
    const updatedCart = [...cart];
    const eventIndex = updatedCart.findIndex(
      (event) => event.date.id === dateId
    );
    const itemIndex = updatedCart[eventIndex].items.findIndex(
      (item) => item._id === itemId
    );

    if (
      itemIndex !== -1 &&
      updatedCart[eventIndex].items[itemIndex].orderQty > 1
    ) {
      updatedCart[eventIndex].items[itemIndex].orderQty -= 1;
      setCart(updatedCart);

      // Update local storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      updateCartData((prev) => prev + 1);
    }
  };

  return (
    <>
      <MetaData title="eTicket - Warenkorb" />
      <div className="cart_container">
        {cart.length === 0 ? (
          <p id="empty-cart">Dein Einkaufswagen ist leer.</p>
        ) : (
          <div className="cart_inner_box">
            <div className="return_box">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5458 0.219664C14.6865 0.0790127 14.8773 -2.97165e-06 15.0762 -3.27019e-08C15.2751 2.90625e-06 15.4659 0.0790242 15.6065 0.21968C15.7472 0.360336 15.8262 0.551105 15.8262 0.750019C15.8262 0.948934 15.7471 1.1397 15.6065 1.28035L8.88684 8.00001L15.6065 14.7197C15.7471 14.8603 15.8262 15.0511 15.8262 15.25C15.8262 15.4489 15.7472 15.6397 15.6065 15.7803C15.4659 15.921 15.2751 16 15.0762 16C14.8773 16 14.6865 15.921 14.5458 15.7804L7.29584 8.53035C7.22619 8.46071 7.17094 8.37803 7.13325 8.28703C7.09555 8.19603 7.07615 8.0985 7.07615 8.00001C7.07615 7.90151 7.09555 7.80398 7.13325 7.71299C7.17094 7.62199 7.22619 7.53931 7.29584 7.46966L14.5458 0.219664ZM8.70465 14.7197L1.98499 8.00001L8.70465 1.28035C8.8453 1.1397 8.92433 0.948934 8.92433 0.750019C8.92433 0.551104 8.84532 0.360336 8.70467 0.21968C8.56401 0.0790239 8.37325 2.62081e-06 8.17433 -3.20704e-07C7.97542 -3.26222e-06 7.78465 0.0790124 7.64399 0.219664L0.393994 7.46966C0.324346 7.53931 0.269097 7.62199 0.231404 7.71299C0.19371 7.80398 0.17431 7.90151 0.17431 8.00001C0.17431 8.0985 0.19371 8.19603 0.231404 8.28703C0.269097 8.37803 0.324346 8.46071 0.393994 8.53035L7.64399 15.7804C7.78465 15.921 7.97542 16 8.17433 16C8.37325 16 8.56401 15.921 8.70466 15.7803C8.84532 15.6397 8.92433 15.4489 8.92433 15.25C8.92433 15.0511 8.8453 14.8603 8.70465 14.7197Z"
                  fill="#1F2349"
                />
              </svg>
              <p onClick={() => navigate("/")}>Zurück zur Veranstaltung</p>
            </div>
            <div className="mobile-cart">
              <MobileCart
                cart={cart}
                handleDeleteItem={handleDeleteItem}
                formatTimeToAmPm={formatTimeToAmPm}
                formatDateFull={formatDateFull}
                getTotalPrice={getTotalPrice}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
              />
            </div>
            <div className="cart-tbl-container">
              <table className="table cart-tbl table-responsive">
                <thead>
                  <tr className="_tbl_head">
                    <th>Veranstaltung</th>
                    <th>ticket</th>
                    <th className="text-center">Preis</th>
                    <th className="text-center">Gesamt</th>
                    <th className="text-center">Gesamtpreis</th>
                    <th className="text-center">Preis</th>
                    <th></th>
                  </tr>
                </thead>
                {cart &&
                  cart.map((el, i) => (
                    <tbody key={i}>
                      {el.items.map((itm, index) => (
                        <tr key={itm._id}>
                          {index === 0 && (
                            <td
                              rowSpan={el.items.length}
                              className="scroll-area"
                            >
                              <div className="event-img-date col d-flex align-items-center gap-4">
                                <div className="event-pic">
                                  <img src={el.eventDetails.banner} alt="" />
                                </div>
                                <div className="text-start w-100 event-name">
                                  <p>{el.eventDetails.eventName}</p>
                                  <div className="event-date d-flex align-items-center justify gap-2 m-0">
                                    <p className="mb-0">
                                      {formatDateFull(el.date.id)}
                                    </p>
                                  </div>
                                  <div className="event-date align-items-center d-flex gap-2">
                                    <p className="mb-0">Einlass um 11 Uhr</p>
                                  </div>
                                </div>
                              </div>
                            </td>
                          )}
                          <td className="scroll-area">
                            <div className="event-img-date col mt-2 gap-4">
                              <div className="w-100 event-name">
                                <p className="text-start">{itm.name} </p>
                              </div>
                            </div>
                          </td>
                          <td className="scroll-area">
                            <div className="event-img-date col mt-2">
                              <div className=" w-100 event-name">
                                <p className="text-center">
                                  {itm.price.toFixed(2).replace(".", ",")}€
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="scroll-area">
                            <div className="event-img-date col">
                              <div className=" w-100 event-name ">
                                <span className="cart-input-wrapper d-flex justify-content-center align-items-center">
                                  <button
                                    onClick={() =>
                                      handleDecrement(el.date.id, itm._id)
                                    }
                                  >
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    value={itm.orderQty}
                                    id="quantity"
                                    readOnly
                                  />
                                  <button
                                    onClick={() =>
                                      handleIncrement(el.date.id, itm._id)
                                    }
                                  >
                                    +
                                  </button>
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="scroll-area">
                            <div className="event-img-date col mt-2">
                              <div className="w-100 event-name">
                                <p className="text-center">
                                  {(itm.price * itm.orderQty)
                                    .toFixed(2)
                                    .replace(".", ",")}
                                  €
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="scroll-area">
                            <div className="event-img-date col mt-1 d-flex justify-content-center">
                              <div
                                className="cart-delete-icon border d-flex align-items-center justify-content-center"
                                onClick={() =>
                                  handleDeleteItem(el.date.id, itm._id)
                                }
                              >
                                <svg
                                  width="23"
                                  height="23"
                                  viewBox="0 0 23 23"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.00276 17.035C6.71617 17.3217 6.25152 17.3217 5.96494 17.035C5.67835 16.7485 5.67835 16.2838 5.96494 15.9973L10.4622 11.5L5.96494 7.00276C5.67835 6.71617 5.67835 6.25152 5.96494 5.96494C6.25152 5.67835 6.71617 5.67835 7.00276 5.96494L11.5 10.4622L15.9973 5.96494C16.2838 5.67835 16.7485 5.67835 17.035 5.96494C17.3217 6.25152 17.3217 6.71617 17.035 7.00276L12.5378 11.5L17.035 15.9973C17.3217 16.2838 17.3217 16.7485 17.035 17.035C16.7485 17.3217 16.2838 17.3217 15.9973 17.035L11.5 12.5378L7.00276 17.035Z"
                                    fill="black"
                                  />
                                </svg>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ))}
              </table>
            </div>
            <div className="cart_btns mt-2">
              <div className="cart_pyt">
                <div className="payment_btn">
                  <p>Zahlungsoption</p>
                  <div className="pyt-icons">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M4.592 2v20H0V2h4.592zm11.46 0c0 4.194-1.583 8.105-4.415 11.068l-.278.283L17.702 22h-5.668l-6.893-9.4l1.779-1.332c2.858-2.14 4.535-5.378 4.637-8.924L11.562 2h4.49zM21.5 17a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="27"
                      width="27"
                      enableBackground="new 0 0 48 48"
                      viewBox="0 0 48 48"
                      id="paypal"
                    >
                      <path
                        fill="#03a9f4"
                        d="M36.817,14.654c0.464-2.956-0.003-4.967-1.602-6.789C33.455,5.859,30.275,5,26.206,5H14.396
	c-0.831,0-1.539,0.605-1.669,1.426L7.809,37.612c-0.097,0.615,0.379,1.172,1.001,1.172h7.291l-0.503,3.191
	C15.513,42.513,15.929,43,16.474,43h6.146c0.728,0,1.347-0.529,1.46-1.248l0.06-0.312l1.158-7.342l0.075-0.406
	c0.113-0.719,0.733-1.248,1.46-1.248h0.919c5.954,0,10.616-2.419,11.978-9.415c0.569-2.923,0.275-5.363-1.23-7.078
	C38.044,15.433,37.478,15.004,36.817,14.654"
                      ></path>
                      <path
                        fill="#3949ab"
                        d="M36.817,14.654c0.464-2.956-0.003-4.967-1.602-6.789C33.455,5.859,30.275,5,26.206,5H14.396
	c-0.831,0-1.539,0.605-1.669,1.426L7.809,37.612c-0.097,0.615,0.379,1.172,1.001,1.172h7.291l1.832-11.614l-0.057,0.364
	c0.13-0.821,0.832-1.427,1.663-1.427h3.466c6.806,0,12.135-2.765,13.692-10.761C36.743,15.109,36.782,14.88,36.817,14.654"
                      ></path>
                      <path
                        fill="#1a237e"
                        d="M17.898,27.534c0.13-0.821,0.832-1.427,1.663-1.427h3.466c11.878,0,13.184-8.52,13.813-11.453
	c-0.393-0.208-2.227-1.209-6.199-1.209h-9.258c-0.227,0-1.173,0.105-1.46,1.248L17.898,27.534z"
                      ></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      id="apple-pay"
                    >
                      <g fill="#303C42" fillRule="evenodd" clipRule="evenodd">
                        <path d="M15.15 12.5H13v5.49h.855v-1.873h1.269c1.079 0 1.839-.742 1.839-1.813S16.21 12.5 15.15 12.5zm-.225 2.9h-1.07v-2.183h1.07c.743 0 1.166.405 1.166 1.096 0 .69-.432 1.088-1.166 1.088zM18.983 13.804c-.924 0-1.615.535-1.64 1.269h.768c.069-.354.397-.587.846-.587.544 0 .863.259.863.733v.32l-1.114.06c-1.018.07-1.58.484-1.58 1.209 0 .734.57 1.226 1.408 1.217.561 0 1.079-.285 1.303-.734h.018v.691h.785V15.15c0-.811-.647-1.346-1.657-1.346zm.837 2.633c0 .544-.466.932-1.07.94-.475 0-.786-.224-.786-.578 0-.371.294-.578.855-.613l1.001-.069v.32zM23.075 17.222h-.017l-1.062-3.375h-.89l1.503 4.144-.06.215c-.139.44-.363.605-.752.605-.069 0-.198 0-.259-.017v.673c.07.009.268.026.328.017.846 0 1.235-.32 1.589-1.312L25 13.847h-.863l-1.062 3.375z"></path>
                        <path d="M28 4H2C.897 4 0 4.897 0 6v18c0 1.103.897 2 2 2h26c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm1 20c0 .551-.449 1-1 1H2c-.551 0-1-.449-1-1V6c0-.551.449-1 1-1h26c.551 0 1 .449 1 1v18z"></path>
                        <path d="M10.44 14.25c-.01-1.011.827-1.499.865-1.522-.47-.689-1.202-.783-1.463-.794-.623-.062-1.216.367-1.532.367-.315 0-.804-.357-1.32-.347-.68.01-1.305.394-1.655 1.002-.705 1.225-.18 3.038.507 4.031.336.485.737 1.032 1.263 1.012.507-.02.698-.327 1.31-.327.613 0 .785.327 1.321.317.545-.01.891-.495 1.225-.982.385-.564.544-1.11.553-1.139-.012-.004-1.063-.407-1.074-1.618zM9.85 10c-.403.016-.89.269-1.179.606-.259.3-.486.779-.424 1.238.449.035.907-.228 1.187-.566.28-.339.467-.81.416-1.278z"></path>
                      </g>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      viewBox="0 0 256 199"
                    >
                      <path d="M46.54 198.011V184.84c0-5.05-3.074-8.342-8.343-8.342c-2.634 0-5.488.878-7.464 3.732c-1.536-2.415-3.731-3.732-7.024-3.732c-2.196 0-4.39.658-6.147 3.073v-2.634h-4.61v21.074h4.61v-11.635c0-3.731 1.976-5.488 5.05-5.488c3.072 0 4.61 1.976 4.61 5.488v11.635h4.61v-11.635c0-3.731 2.194-5.488 5.048-5.488c3.074 0 4.61 1.976 4.61 5.488v11.635h5.05Zm68.271-21.074h-7.463v-6.366h-4.61v6.366h-4.171v4.17h4.17v9.66c0 4.83 1.976 7.683 7.245 7.683c1.976 0 4.17-.658 5.708-1.536l-1.318-3.952c-1.317.878-2.853 1.098-3.951 1.098c-2.195 0-3.073-1.317-3.073-3.513v-9.44h7.463v-4.17Zm39.076-.44c-2.634 0-4.39 1.318-5.488 3.074v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.536-5.488 4.39-5.488c.878 0 1.976.22 2.854.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22Zm-59.052 2.196c-2.196-1.537-5.269-2.195-8.562-2.195c-5.268 0-8.78 2.634-8.78 6.805c0 3.513 2.634 5.488 7.244 6.147l2.195.22c2.415.438 3.732 1.097 3.732 2.195c0 1.536-1.756 2.634-4.83 2.634c-3.073 0-5.488-1.098-7.025-2.195l-2.195 3.512c2.415 1.756 5.708 2.634 9 2.634c6.147 0 9.66-2.853 9.66-6.805c0-3.732-2.854-5.708-7.245-6.366l-2.195-.22c-1.976-.22-3.512-.658-3.512-1.975c0-1.537 1.536-2.415 3.951-2.415c2.635 0 5.269 1.097 6.586 1.756l1.976-3.732Zm122.495-2.195c-2.635 0-4.391 1.317-5.489 3.073v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.537-5.488 4.39-5.488c.879 0 1.977.22 2.855.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22Zm-58.833 10.976c0 6.366 4.39 10.976 11.196 10.976c3.073 0 5.268-.658 7.463-2.414l-2.195-3.732c-1.756 1.317-3.512 1.975-5.488 1.975c-3.732 0-6.366-2.634-6.366-6.805c0-3.951 2.634-6.586 6.366-6.805c1.976 0 3.732.658 5.488 1.976l2.195-3.732c-2.195-1.757-4.39-2.415-7.463-2.415c-6.806 0-11.196 4.61-11.196 10.976Zm42.588 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976c0 6.366 4.61 10.976 10.537 10.976c3.073 0 5.269-1.097 6.586-3.073v2.634h4.61v-10.537Zm-16.904 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805Zm-55.1-10.976c-6.147 0-10.538 4.39-10.538 10.976c0 6.586 4.39 10.976 10.757 10.976c3.073 0 6.147-.878 8.562-2.853l-2.196-3.293c-1.756 1.317-3.951 2.195-6.146 2.195c-2.854 0-5.708-1.317-6.367-5.05h15.587v-1.755c.22-6.806-3.732-11.196-9.66-11.196Zm0 3.951c2.853 0 4.83 1.757 5.268 5.05h-10.976c.439-2.854 2.415-5.05 5.708-5.05Zm114.372 7.025v-18.879h-4.61v10.976c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976c0 6.366 4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61v-10.537Zm-16.903 0c0-3.732 2.414-6.805 6.366-6.805c3.732 0 6.366 2.854 6.366 6.805c0 3.732-2.634 6.805-6.366 6.805c-3.952-.22-6.366-3.073-6.366-6.805Zm-154.107 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976c0 6.366 4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61v-10.537Zm-17.123 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805Z" />
                      <path
                        fill="#FF5F00"
                        d="M93.298 16.903h69.15v124.251h-69.15z"
                      />
                      <path
                        fill="#EB001B"
                        d="M97.689 79.029c0-25.245 11.854-47.637 30.074-62.126C114.373 6.366 97.47 0 79.03 0C35.343 0 0 35.343 0 79.029c0 43.685 35.343 79.029 79.029 79.029c18.44 0 35.343-6.366 48.734-16.904c-18.22-14.269-30.074-36.88-30.074-62.125Z"
                      />
                      <path
                        fill="#F79E1B"
                        d="M255.746 79.029c0 43.685-35.343 79.029-79.029 79.029c-18.44 0-35.343-6.366-48.734-16.904c18.44-14.488 30.075-36.88 30.075-62.125c0-25.245-11.855-47.637-30.075-62.126C141.373 6.366 158.277 0 176.717 0c43.686 0 79.03 35.563 79.03 79.029Z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="58"
                      height="58"
                      viewBox="0 0 256 83"
                    >
                      <defs>
                        <linearGradient
                          id="logosVisa0"
                          x1="45.974%"
                          x2="54.877%"
                          y1="-2.006%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#222357" />
                          <stop offset="100%" stopColor="#254AA5" />
                        </linearGradient>
                      </defs>
                      <path
                        fill="url(#logosVisa0)"
                        d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763c8.056-3.92 10.762-6.434 10.73-9.94c-.06-5.365-6.426-7.733-12.383-7.825c-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243c21.725 0 35.938 10.724 36.015 27.351c.085 21.102-29.188 22.27-28.988 31.702c.069 2.86 2.798 5.912 8.778 6.688c2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551c-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963h-17.665m3.037-21.601l6.265-30.027h-17.158l10.893 30.027m-118.599 21.6L88.964 1.246h20.687l17.104 79.963h-20.679m-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963H75.473"
                        transform="matrix(1 0 0 -1 0 82.668)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div id="checkout_btn">
                <div className="ckbtn">
                  <p className="mb-0">
                    Gesamtpreis
                    <span>{calculateTotalPrice(cart).replace(".", ",")} €</span>
                  </p>
                  <span>Inkl. MwSt</span>
                </div>
                <button onClick={handleCheckout}>Zur Kasse</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
