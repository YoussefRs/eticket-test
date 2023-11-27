import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../utils/Loader";
import { formatDateToDDMMYYYY } from "../../utils/utils";
import OrderModal from "../MainDash/OrderModal/OrderModal";
import "./OrdersDash.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function OrdersDash() {
  const [allOrders, setAllOrders] = useState();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const handleHideOrderModal = () => {
    setShowOrderModal(false);
  };

  const handleShowOrderModal = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  // Helper function to chunk array into smaller arrays
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };
  return (
    <main className="px-xxl-5 px-3 py-3 ordersdash_container w-100 m-0">
      <h1 className="dash_header mb-sm-0 mb-5">Orders</h1>
      <div className="dash_content">
        <div className="orders_list d-flex flex-column align-items-center mt-5">
          {allOrders ? (
            <Swiper
              modules={[Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={pagination}
              className="mySwiper"
            >
              {chunkArray(allOrders, 10).map((orderGroup, index) => (
                <SwiperSlide key={index}>
                  {orderGroup.map((el, orderIndex) => (
                    <div
                      className="orders_list_element py-1 d-flex justify-content-between align-items-center row"
                      key={orderIndex}
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
                  ))}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Loader />
          )}
          <OrderModal
            handleHide={handleHideOrderModal}
            show={showOrderModal}
            data={selectedOrder}
          />
        </div>
      </div>
    </main>
  );
}
