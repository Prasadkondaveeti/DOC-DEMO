import React, { useState, useEffect, useRef } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Otp = ({ mobile, otpToken, doctorId }) => {

  /* ====== OTP STATE (4 BOXES) ====== */
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = useRef([]);

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ====== SLIDER ====== */
  const images = [
    "/slide1-28ef5fa6.png",
    "/slide2-07af1764.png",
    "/slide3-41cdd860.png"
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  /* ====== AUTO FOCUS FIRST OTP BOX ====== */
  useEffect(() => {
    otpRefs.current[0]?.focus();
  }, []);

  /* ====== RESEND TIMER ====== */
  const [timer, setTimer] = useState(25);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = (type) => {
    alert(`OTP resent via ${type.toUpperCase()}`);
    setTimer(25);
    setCanResend(false);
  };

  /* ====== HANDLE OTP DIGIT CHANGE ====== */
  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move forward
    if (value && index < 3) otpRefs.current[index + 1].focus();

    // Auto move backward on delete
    if (!value && index > 0) otpRefs.current[index - 1].focus();
  };

  /* ====== VERIFY OTP ====== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError1("");
    setError2("");

    const cleanedOtp = otp.join(""); // combine 4 boxes

    if (!cleanedOtp) {
      setError1("Enter OTP");
      return;
    }

    if (!/^\d{4,6}$/.test(cleanedOtp)) {
      setError1("OTP should be 4–6 digits");
      return;
    }

    if (!mobile || !otpToken || !doctorId) {
      setError2("Missing data. Cannot verify OTP.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://svcdev.whitecoats.com/WhiteCoatsCore/doctor/verifyOTP",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            doctorId,
            countryCode: 91,
            mobileNo: Number(mobile),
            otp: Number(cleanedOtp),
            otpToken,
          }),
        }
      );

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      const status = data?.serviceResponse?.status;
      const message = data?.serviceResponse?.message;
      const doctorInfo = data?.doctor?.[0];

      if (status === "Y" && doctorInfo) {
        const { sessionToken, doctorId, firstName, lastName, emailStr, mobileNo } = doctorInfo;

        if (sessionToken) localStorage.setItem("sessionToken", sessionToken);
        if (doctorId) localStorage.setItem("doctorId", doctorId);
        if (firstName) localStorage.setItem("firstName", firstName);
        if (lastName) localStorage.setItem("lastName", lastName);
        if (emailStr) localStorage.setItem("emailStr", emailStr);
        if (mobileNo) localStorage.setItem("mobileNo", mobileNo);

        navigate("/dashboard", { replace: true });
      } else {
        setError2(message || "Invalid OTP");
      }
    } catch (err) {
      setError2("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      {/* HEADER */}
      <header className="navbar">
        <img src="/header-logo.svg" className="nav-logo" alt="logo" />

        <nav className="nav-right">
          <a href="###">About Us</a>
          <a href="###">Faculty</a>
          <a href="###">Plans</a>
          <a href="###">Contact Us</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">

        {/* LEFT SIDE */}
        <div className="left-side">
          <div className="left-inner">

            <div className="dots">
              {images.map((_, i) => (
                <span key={i} className={current === i ? "dot active" : "dot"}></span>
              ))}
            </div>

            <p className="hero-heading">
              Learn, revise and excel – the ultimate learning platform for<br />
              your medical journey
            </p>

            <img src={images[current]} className="hero-illustration" alt="illustration" />
          </div>
        </div>

        {/* RIGHT SIDE (OTP CARD) */}
        <div className="right-side">
          <div className="login-card">
            <h2>Verify Mobile Number </h2><br />
            <p>A 4-digits Otp send to</p><br />
            <p className="otp-phone-pill" >+91 - {mobile} <p onClick={() => navigate("/")}>🖋️</p></p><br /><br />
            <p>Enter OTP</p>

            <form onSubmit={handleSubmit}>

              {/* ====== 4 BOX OTP INPUT UI ====== */}
              <div className="otp-box-container">
                {Array(4).fill(0).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    className="otp-line-box"
                    value={otp[i] || ""}
                    onChange={(e) => handleOtpChange(e, i)}
                    ref={(el) => (otpRefs.current[i] = el)}
                  />
                ))}
              </div>

              {error1 && <p className="error-text">{error1}</p>}
              {error2 && <p className="error-text">{error2}</p>}

              {/* RESEND AREA */}
              <div className="resend-area">
                {!canResend ? (
                  <p className="resend-timer">Didn’t receive OTP? Resend in {timer}s</p>
                ) : (
                  <>
                    <p className="resend-ready">Didn’t receive OTP? Resend now:</p>

                    <div className="resend-buttons">
                      <button
                        type="button"
                        className="resend-btn sms-btn"
                        onClick={() => handleResend("sms")}
                      >
                        🔁 Resend SMS
                      </button>

                      <button
                        type="button"
                        className="resend-btn whatsapp-btn"
                        onClick={() => handleResend("whatsapp")}
                      >
                        💬 WhatsApp
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* VERIFY BUTTON */}
              <button disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              {loading && <div className="spinner" />}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Otp;
