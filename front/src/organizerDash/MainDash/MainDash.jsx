import React, { useEffect, useRef, useState } from "react";
import "./MainDash.css";
import DonutChart from "react-donut-chart";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

import organizerPic from "../../media/org/Dino-Logo.webp";
import eventBanner from "../../media/banner/banner.webp";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

import { formatDateToDDMMYYYY } from "../../utils/utils";
import OrderModal from "./OrderModal/OrderModal";
import Loader from "../../utils/Loader";

export default function MainDash({ setSelectedDash }) {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({});
  const [reactDonutChartdata, setReactDonutChartdata] = useState([]);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}events/`)
      .then((response) => {
        setEventData(response.data[0]);
        const mappedTickets = response.data[0].tickets.map((ticket) => {
          const { name, displayOptions, quantity } = ticket;

          const label = name.split(" ")[0];
          const value = quantity - displayOptions.remainingTickets;

          return {
            label,
            value: value >= 0 ? value : 0,
            isEmpty: value === 0,
          };
        });
        setReactDonutChartdata(mappedTickets);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);
  const [allOrders, setAllOrders] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}orders/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
    // eslint-disable-next-line
  }, [token]);
  const [splittedSalesTotal, setSplittedSalesTotal] = useState([]);
  const [targetMonth, setTargetMonth] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    setTargetMonth(`${year}-${formattedMonth}`);
  }, []);

  useEffect(() => {
    const formattedTotal = calculateTotalAmountForMonth(allOrders, targetMonth);
    if (!formattedTotal) {
      return;
    }
    setSplittedSalesTotal(formattedTotal);
  }, [allOrders, targetMonth]);

  const calculateTotalAmountForMonth = (allOrders, targetMonthYear) => {
    if (!allOrders || !targetMonthYear) {
      return;
    }
    const [targetYear, targetMonth] = targetMonthYear.split("-");
    const targetMonthNumber = parseInt(targetMonth, 10);

    const filteredOrders = allOrders
      .filter((order) => {
        const orderDate = new Date(order.orderDate);
        return (
          orderDate.getFullYear() === parseInt(targetYear, 10) &&
          orderDate.getMonth() + 1 === targetMonthNumber
        );
      })
      .map((order) => order.paymentDetails.totalAmount);

    const totalAmountSum = filteredOrders.reduce(
      (acc, amount) => acc + amount,
      0
    );

    const formattedTotalAmount = totalAmountSum.toFixed(2);
    const [beforeDecimal, afterDecimal] = formattedTotalAmount.split(".");

    return [beforeDecimal, afterDecimal];
  };

  const reactDonutChartBackgroundColor = ["#65C8CE", "#FDBF41", "#444790"];

  const reactDonutChartInnerRadius = 0.3;
  const reactDonutChartSelectedOffset = -0.13;
  let reactDonutChartStrokeColor = "transparent";

  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const newViewBox = "0 0 200 200";

      svgRef.current.setAttribute("viewBox", newViewBox);
    }
  }, []);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleHideOrderModal = () => {
    setShowOrderModal(false);
  };
  const handleShowOrderModal = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  if (!eventData) {
    return <p>...</p>;
  }

  return (
    eventData && (
      <main className="px-xxl-5 px-3 py-3 maindash_container w-100 m-0">
        <h1 className="dash_header mb-sm-0 mb-5">Dashboard</h1>
        <div className="dash_content d-flex justify-content-xl-between flex-xl-row align-items-center flex-column">
          <section className="maindash_details_box h-100 p-0 row">
            <div className="user_details_outerbox main_dash_detail col-xl-4 col-lg-7 col-md-7 mb-4">
              <div className="user_details_innerbox w-100 h-100">
                <div className="user_image">
                  <img
                    src={organizerPic}
                    alt="organizer"
                    className="img-fluid"
                  />
                </div>
                {eventData.organizer ? (
                  <p className="user_name">{`${eventData.organizer?.firstname} ${eventData.organizer?.lastname}`}</p>
                ) : (
                  <Loader />
                )}
                <div className="user_details_content mb-2 d-flex row w-100"></div>
                <button
                  className="btn user_details_button"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profil anzeigen
                </button>
              </div>
            </div>
            <div className="sales_amount_outerbox main_dash_detail col-xl-3 col-xxl-4 col-lg-5 col-md-5 col-sm-6 mb-md-4 mb-5">
              <div className="sales_amount_innerbox d-flex flex-column justify-content-between">
                <div className="sales_amount_header">
                  <h3 className="text-start fw-bold">Bruttoumsatz</h3>
                  <p className="sales_amount_date">
                    <Form.Select
                      onChange={(e) => {
                        setTargetMonth(e.target.value);
                      }}
                    >
                      <option
                        value={"2023-11"}
                        selected={targetMonth === "2023-11"}
                      >
                        November, 2023
                      </option>
                      <option
                        value={"2023-12"}
                        selected={targetMonth === "2023-12"}
                      >
                        December, 2023
                      </option>
                      <option
                        value={"2024-01"}
                        selected={targetMonth === "2024-01"}
                      >
                        January, 2024
                      </option>
                      <option
                        value={"2024-02"}
                        selected={targetMonth === "2024-02"}
                      >
                        February, 2024
                      </option>
                      <option
                        value={"2024-03"}
                        selected={targetMonth === "2024-03"}
                      >
                        Mars, 2024
                      </option>
                      <option
                        value={"2024-04"}
                        selected={targetMonth === "2024-04"}
                      >
                        April, 2024
                      </option>
                    </Form.Select>
                  </p>
                </div>
                {allOrders ? (
                  <>
                    <div className="sales_amount_value d-flex">
                      <p className="before_decimal mb-0 fw-bold me-2">
                        {splittedSalesTotal[0]}
                      </p>
                      <p className="after_decimal mb-0 fw-bold me-2">
                        {splittedSalesTotal[1]}
                      </p>
                      <p className="currency mb-0">€</p>
                    </div>
                    <div className="sales_amount_chart">
                      {width > 1440 ? (
                        <svg
                          width="749"
                          height="140"
                          viewBox="0 0 749 140"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_53_101)">
                            <path
                              d="M767.584 40.7148V167.391H-46.3477V72.517L71.4171 17.7707C96.2207 6.25026 136.344 6.25026 161.148 17.7707L294.024 79.4874C318.827 91.0078 358.951 91.0078 383.754 79.4874L436.279 55.0911C461.083 43.5707 501.206 43.5707 526.01 55.0911L542.893 62.9812C567.697 74.5016 607.82 74.5016 632.624 62.9812L679.208 41.344C703.491 30.0656 742.572 29.8236 767.48 40.7148H767.584Z"
                              fill="#57BEC0"
                              fill-opacity="0.15"
                            />
                          </g>
                          <g filter="url(#filter0_d_53_101)">
                            <path
                              d="M727 34.6337H726.904C704.055 24.3535 678.393 34.6337 666.61 39.5367L623.874 59.9599C601.12 70.834 564.311 70.834 541.557 59.9599L526.069 52.5125C503.315 41.6384 466.506 41.6384 443.752 52.5125L395.566 75.54C372.812 86.4141 336.004 86.4141 313.25 75.54L191.352 17.2859C168.598 6.41185 131.789 6.41185 109.035 17.2859L1 68.9607"
                              stroke="#57BEC0"
                              stroke-width="3"
                            />
                          </g>
                          <defs>
                            <filter
                              id="filter0_d_53_101"
                              x="0.352539"
                              y="6.63037"
                              width="748.167"
                              height="93.5652"
                              filterUnits="userSpaceOnUse"
                              color-interpolation-filters="sRGB"
                            >
                              <feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dx="13" dy="7" />
                              <feGaussianBlur stdDeviation="4" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.341176 0 0 0 0 0.745098 0 0 0 0 0.752941 0 0 0 0.45 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_53_101"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_53_101"
                                result="shape"
                              />
                            </filter>
                            <clipPath id="clip0_53_101">
                              <rect
                                x="1"
                                width="719.236"
                                height="140"
                                rx="40"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          width="428"
                          height="121"
                          viewBox="0 0 428 121"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_57_2)">
                            <path
                              d="M452.328 35.1893V144.674H-26.8761V62.6755L42.4581 15.3591C57.0612 5.40212 80.6839 5.40212 95.2871 15.3591L173.518 68.6999C188.121 78.6569 211.744 78.6569 226.347 68.6999L257.271 47.6146C271.875 37.6576 295.497 37.6576 310.1 47.6146L320.04 54.4338C334.644 64.3908 358.266 64.3908 372.869 54.4338L400.296 35.7332C414.593 25.9854 437.602 25.7762 452.266 35.1893H452.328Z"
                              fill="#57BEC0"
                              fill-opacity="0.15"
                            />
                          </g>
                          <g filter="url(#filter0_d_57_2)">
                            <path
                              d="M428 29.9335H427.944C414.505 21.0485 399.412 29.9335 392.481 34.1711L367.346 51.8226C353.963 61.2209 332.314 61.2209 318.931 51.8226L309.821 45.3859C296.438 35.9876 274.789 35.9876 261.406 45.3859L233.066 65.2883C219.683 74.6866 198.034 74.6866 184.651 65.2883L112.956 14.9401C99.5732 5.54178 77.9242 5.54178 64.5412 14.9401L1 59.6019"
                              stroke="#57BEC0"
                              stroke-width="3"
                            />
                          </g>
                          <defs>
                            <filter
                              id="filter0_d_57_2"
                              x="0.137451"
                              y="5.39136"
                              width="449.634"
                              height="83.4457"
                              filterUnits="userSpaceOnUse"
                              color-interpolation-filters="sRGB"
                            >
                              <feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dx="13" dy="7" />
                              <feGaussianBlur stdDeviation="4" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.341176 0 0 0 0 0.745098 0 0 0 0 0.752941 0 0 0 0.45 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_57_2"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_57_2"
                                result="shape"
                              />
                            </filter>
                            <clipPath id="clip0_57_2">
                              <rect
                                x="1"
                                width="423.452"
                                height="121"
                                rx="40"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      )}
                    </div>
                  </>
                ) : (
                  <Loader />
                )}
              </div>
            </div>
            <div className="tickets_chart_outerbox main_dash_detail col-xl-5 col-xxl-4 col-md-6 col-sm-6 mb-md-4 mb-5">
              <div className="tickets_chart_innerbox">
                <div className="tickets_chart_header">
                  <h3 className="text-start fw-bold">Verkauf nach Tickettyp</h3>
                </div>
                {reactDonutChartdata ? (
                  <div className="tickects_chart_box">
                    <svg className="tickects_chart_container">
                      <DonutChart
                        className="tickects_chart"
                        width={500}
                        legend={false}
                        clickToggle={false}
                        strokeColor={reactDonutChartStrokeColor}
                        data={reactDonutChartdata}
                        colors={reactDonutChartBackgroundColor}
                        innerRadius={reactDonutChartInnerRadius}
                        selectedOffset={reactDonutChartSelectedOffset}
                        emptyColor={"#ECEFF1"}
                      />
                    </svg>
                    <div className="tickets_chart_labels d-flex justify-content-center align-items-start flex-column">
                      {reactDonutChartdata &&
                        reactDonutChartdata.map((el, index) => (
                          <div
                            className="tickets_chart_label d-flex align-items-center me-1"
                            key={index}
                          >
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 13 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="13"
                                height="13"
                                fill={reactDonutChartBackgroundColor[index]}
                              />
                            </svg>
                            <p className="mb-0 ms-2">{`${el.label}: ${el.value}`}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <Loader />
                )}
              </div>
            </div>
            <div className="next_event_outerbox main_dash_detail col-md-6 col-12 mb-md-5">
              <div className="next_event_innerbox d-flex flex-column justify-content-between">
                <div
                  className="next_event_banner"
                  style={{
                    backgroundImage: `url("${eventBanner}")`,
                  }}
                ></div>
              </div>
            </div>
            <div className="orders_outerbox main_dash_detail col-xl-6 col-lg-12 col-md-12 mb-md-5">
              <div className="orders_innerbox">
                <div className="orders_header d-flex justify-content-between align-items-center">
                  <h2 className="text-start fw-bold">Aktuelle Bestellungen</h2>
                </div>
                <div className="orders_list d-flex flex-column">
                  {allOrders ? (
                    allOrders.slice(0, 5).map((el, index) => (
                      <div
                        className="orders_list_element py-1 d-flex justify-content-between align-items-center row"
                        key={index}
                      >
                        <div className="orders_list_element_icon col d-none d-md-block">
                          <svg
                            width="44"
                            height="45"
                            viewBox="0 0 44 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <ellipse
                              cx="21.8611"
                              cy="22.2897"
                              rx="21.8611"
                              ry="22.2897"
                              fill="#FEA62F"
                              fill-opacity="0.17"
                            />
                            <path
                              d="M15.8438 19.6562C16.1026 19.6562 16.3125 19.4464 16.3125 19.1875C16.3125 18.9286 16.1026 18.7188 15.8438 18.7188C15.5849 18.7188 15.375 18.9286 15.375 19.1875C15.375 19.4464 15.5849 19.6562 15.8438 19.6562Z"
                              fill="#FEA62F"
                            />
                            <path
                              d="M15.8438 24.3438C16.1026 24.3438 16.3125 24.1339 16.3125 23.875C16.3125 23.6161 16.1026 23.4062 15.8438 23.4062C15.5849 23.4062 15.375 23.6161 15.375 23.875C15.375 24.1339 15.5849 24.3438 15.8438 24.3438Z"
                              fill="#FEA62F"
                            />
                            <path
                              d="M15.8438 29.0312C16.1026 29.0312 16.3125 28.8214 16.3125 28.5625C16.3125 28.3036 16.1026 28.0938 15.8438 28.0938C15.5849 28.0938 15.375 28.3036 15.375 28.5625C15.375 28.8214 15.5849 29.0312 15.8438 29.0312Z"
                              fill="#FEA62F"
                            />
                            <path
                              d="M31.3125 13.5625H30.375V33.7188C30.375 33.8431 30.3256 33.9623 30.2377 34.0502C30.1498 34.1381 30.0306 34.1875 29.9062 34.1875H14.4375V35.125H31.3125V13.5625Z"
                              fill="#FEA62F"
                            />
                            <path
                              d="M18.1875 11.6875V10.2812C18.1875 9.78397 17.99 9.30706 17.6383 8.95542C17.2867 8.60379 16.8098 8.40625 16.3125 8.40625C15.8152 8.40625 15.3383 8.60379 14.9867 8.95542C14.635 9.30706 14.4375 9.78397 14.4375 10.2812V11.6875H15.375V10.2812C15.375 10.0326 15.4738 9.79415 15.6496 9.61834C15.8254 9.44252 16.0639 9.34375 16.3125 9.34375C16.5611 9.34375 16.7996 9.44252 16.9754 9.61834C17.1512 9.79415 17.25 10.0326 17.25 10.2812V11.6875H15.375V13.5625C15.375 13.8111 15.4738 14.0496 15.6496 14.2254C15.8254 14.4012 16.0639 14.5 16.3125 14.5C16.5611 14.5 16.7996 14.4012 16.9754 14.2254C17.1512 14.0496 17.25 13.8111 17.25 13.5625V12.625H18.1875V13.5625C18.1875 14.0598 17.99 14.5367 17.6383 14.8883C17.2867 15.24 16.8098 15.4375 16.3125 15.4375C15.8152 15.4375 15.3383 15.24 14.9867 14.8883C14.635 14.5367 14.4375 14.0598 14.4375 13.5625V11.6875H12.5625V33.25H29.4375V11.6875H18.1875ZM15.8438 29.9688C15.5656 29.9688 15.2937 29.8863 15.0625 29.7318C14.8312 29.5772 14.651 29.3576 14.5445 29.1006C14.4381 28.8437 14.4103 28.5609 14.4645 28.2882C14.5188 28.0154 14.6527 27.7648 14.8494 27.5681C15.046 27.3715 15.2966 27.2375 15.5694 27.1833C15.8422 27.129 16.1249 27.1569 16.3819 27.2633C16.6389 27.3697 16.8585 27.55 17.013 27.7812C17.1675 28.0125 17.25 28.2844 17.25 28.5625C17.25 28.9355 17.1018 29.2931 16.8381 29.5569C16.5744 29.8206 16.2167 29.9688 15.8438 29.9688ZM15.8438 25.2812C15.5656 25.2812 15.2937 25.1988 15.0625 25.0443C14.8312 24.8897 14.651 24.6701 14.5445 24.4131C14.4381 24.1562 14.4103 23.8734 14.4645 23.6007C14.5188 23.3279 14.6527 23.0773 14.8494 22.8806C15.046 22.684 15.2966 22.55 15.5694 22.4958C15.8422 22.4415 16.1249 22.4694 16.3819 22.5758C16.6389 22.6822 16.8585 22.8625 17.013 23.0937C17.1675 23.325 17.25 23.5969 17.25 23.875C17.25 24.248 17.1018 24.6056 16.8381 24.8694C16.5744 25.1331 16.2167 25.2812 15.8438 25.2812ZM15.8438 20.5938C15.5656 20.5938 15.2937 20.5113 15.0625 20.3568C14.8312 20.2022 14.651 19.9826 14.5445 19.7256C14.4381 19.4687 14.4103 19.1859 14.4645 18.9132C14.5188 18.6404 14.6527 18.3898 14.8494 18.1931C15.046 17.9965 15.2966 17.8625 15.5694 17.8083C15.8422 17.754 16.1249 17.7819 16.3819 17.8883C16.6389 17.9947 16.8585 18.175 17.013 18.4062C17.1675 18.6375 17.25 18.9094 17.25 19.1875C17.25 19.5605 17.1018 19.9181 16.8381 20.1819C16.5744 20.4456 16.2167 20.5938 15.8438 20.5938ZM27.0938 29.0312H19.5938C19.4694 29.0312 19.3502 28.9819 19.2623 28.894C19.1744 28.806 19.125 28.6868 19.125 28.5625C19.125 28.4382 19.1744 28.319 19.2623 28.231C19.3502 28.1431 19.4694 28.0938 19.5938 28.0938H27.0938C27.2181 28.0938 27.3373 28.1431 27.4252 28.231C27.5131 28.319 27.5625 28.4382 27.5625 28.5625C27.5625 28.6868 27.5131 28.806 27.4252 28.894C27.3373 28.9819 27.2181 29.0312 27.0938 29.0312ZM27.0938 24.3438H19.5938C19.4694 24.3438 19.3502 24.2944 19.2623 24.2065C19.1744 24.1185 19.125 23.9993 19.125 23.875C19.125 23.7507 19.1744 23.6315 19.2623 23.5435C19.3502 23.4556 19.4694 23.4062 19.5938 23.4062H27.0938C27.2181 23.4062 27.3373 23.4556 27.4252 23.5435C27.5131 23.6315 27.5625 23.7507 27.5625 23.875C27.5625 23.9993 27.5131 24.1185 27.4252 24.2065C27.3373 24.2944 27.2181 24.3438 27.0938 24.3438ZM27.0938 19.6562H19.5938C19.4694 19.6562 19.3502 19.6069 19.2623 19.519C19.1744 19.431 19.125 19.3118 19.125 19.1875C19.125 19.0632 19.1744 18.944 19.2623 18.856C19.3502 18.7681 19.4694 18.7188 19.5938 18.7188H27.0938C27.2181 18.7188 27.3373 18.7681 27.4252 18.856C27.5131 18.944 27.5625 19.0632 27.5625 19.1875C27.5625 19.3118 27.5131 19.431 27.4252 19.519C27.3373 19.6069 27.2181 19.6562 27.0938 19.6562Z"
                              fill="#FEA62F"
                            />
                          </svg>
                        </div>
                        <div className="orders_list_element_detail col d-none d-md-block">
                          <p className="mb-0">{el.code}</p>
                        </div>
                        <div className="orders_list_element_detail col">
                          <p className="mb-0">
                            {el.participantDetails.firstname}
                          </p>
                        </div>
                        <div className="orders_list_element_detail col">
                          <p className="mb-0">{el.paymentDetails.method}</p>
                        </div>
                        <div className="orders_list_element_detail col">
                          <p className="mb-0">
                            {el.paymentDetails.totalAmount.toFixed(2)}€
                          </p>
                        </div>
                        <div className="orders_list_element_detail col">
                          <p className="mb-0">
                            {formatDateToDDMMYYYY(el.orderDate)}
                          </p>
                        </div>
                        <div className="col">
                          <button
                            className="orders_list_element_button btn p-0"
                            onClick={() => {
                              handleShowOrderModal(el);
                            }}
                          >
                            <svg
                              width="29"
                              height="28"
                              viewBox="0 0 29 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                opacity="0.15"
                                x="0.850586"
                                y="0.572998"
                                width="27.4335"
                                height="27.4335"
                                rx="13.7168"
                                fill="#889BFF"
                              />
                              <g clipPath="url(#clip0_75_6)">
                                <path
                                  d="M18.1728 14.7184C18.1728 14.9182 18.0965 15.1179 17.9443 15.2701L13.1522 20.0622C12.8474 20.367 12.3531 20.367 12.0484 20.0622C11.7437 19.7575 11.7437 19.2633 12.0484 18.9585L16.2887 14.7184L12.0486 10.4783C11.7438 10.1735 11.7438 9.6794 12.0486 9.37471C12.3533 9.06973 12.8475 9.06973 13.1523 9.37471L17.9444 14.1667C18.0967 14.319 18.1728 14.5188 18.1728 14.7184Z"
                                  fill="#889BFF"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_75_6">
                                  <rect
                                    width="11.1449"
                                    height="11.1449"
                                    fill="white"
                                    transform="translate(9.42383 20.2908) rotate(-90)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Loader />
                  )}
                  <OrderModal
                    handleHide={handleHideOrderModal}
                    show={showOrderModal}
                    data={selectedOrder}
                    event={eventData}
                  />
                </div>
                <p
                  className="orders_list_more_button"
                  onClick={() => {
                    setSelectedDash("orders");
                  }}
                >
                  More
                </p>
              </div>
            </div>
            <div
              className="col-12 d-none d-lg-block"
              style={{ height: "1.5rem" }}
            ></div>
          </section>
        </div>
      </main>
    )
  );
}
