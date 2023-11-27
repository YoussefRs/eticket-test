import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./organizerDash/Dashboard/Dashboard";
import LandingPage from "./landingPage/LandingPage";
import NotFound from "./landingPage/components/NotFound";
import { useEffect, useState } from "react";
import ResetForms from "./landingPage/components/ResetPassword/ResetForms/ResetForms";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/userAction";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import Navbar from "./landingPage/components/Navbar/Navbar";
import Footer from "./landingPage/components/Footer/Footer";
import BuyerProfilePage from "./buyerProfilePage/BuyerProfilePage";
import Cart from "./landingPage/components/Cart/Cart";
import CheckOut from "./landingPage/components/CheckOut/CheckOut";
import PrivacyPage from "./PrivacyPage/PrivacyPage";
import AgbPage from "./AgbPage/AgbPage";
import { ToastContainer } from "react-toastify";
import Imprint from "./Imprint/Imprint";
import PaymentSuccess from "./landingPage/components/PaymentSuccessful";
import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // // Disable context menu (right-click menu)
  // useEffect(() => {
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //   };
  //   document.addEventListener("contextmenu", handleContextMenu);
  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);

  // // Disable keyboard shortcuts
  // document.onkeydown = function (e) {
  //   if (
  //     e.keyCode === 123 ||
  //     (e.ctrlKey && e.shiftKey && e.keyCode === "I".charCodeAt(0)) ||
  //     (e.ctrlKey && e.shiftKey && e.keyCode === "C".charCodeAt(0)) ||
  //     (e.ctrlKey && e.shiftKey && e.keyCode === "J".charCodeAt(0)) ||
  //     (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
  //   ) {
  //     e.preventDefault();
  //   }
  // };
  const [updateCartData, setUpdateCartData] = useState(0);
  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const style = {
    marginBottom: "6.5rem",
  };
  const Layout = ({ children }) => {
    const location = useLocation();
    const isDashboard = location.pathname === "/dashboard";
    const isSpecialPage = location.pathname === "/";
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, [pathname]);

    return (
      <>
        {isDashboard ? null : <Navbar updateCartData={updateCartData} />}
        {children}
        {isDashboard ? null : isSpecialPage && width < 768 ? (
          <Footer style={style} />
        ) : (
          <Footer />
        )}
      </>
    );
  };

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<LandingPage updateCartData={setUpdateCartData} />}
            />
            <Route path="/profile" element={<BuyerProfilePage />} />

            <Route
              path="/cart"
              element={<Cart updateCartData={setUpdateCartData} />}
            />
            <Route path="/successful" element={<PaymentSuccess />} />
            <Route
              path="/checkout"
              element={<CheckOut updateCartData={setUpdateCartData} />}
            />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/agb" element={<AgbPage />} />
            <Route path="/imprint" element={<Imprint />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/auth/reset-password/:token"
              element={<ResetForms />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
