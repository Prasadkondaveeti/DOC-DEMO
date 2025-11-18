import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import Otp from './Otp'
import { useAuth } from "./AuthContext";

const Login = () => {
  const { setIsLoggedIn } = useAuth();

  const [mobile, setMobile] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [interestedId, setInterestedId] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState('');
  const [serverMessage, setServerMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const mobileInputRef = useRef();

  const images = [
    "/slide1-28ef5fa6.png",
    "/slide2-07af1764.png",
    "/slide3-41cdd860.png"
  ];

  const [current, setCurrent] = useState(0);

  // Auto slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Autofocus on mobile input
  useEffect(() => {
    mobileInputRef.current?.focus();
  }, []);

  // ✅ FIX: Move login update into useEffect (not inside render)
  useEffect(() => {
    if (showOtp) {
      setIsLoggedIn(true);
    }
  }, [showOtp]);

  const validateMobile = (n) => /^[6-9]\d{9}$/.test(n);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setServerMessage("");

    const trimmed = mobile.trim();
    if (!validateMobile(trimmed)) {
      setError("Enter a valid mobile number");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://svcdev.whitecoats.com/WhiteCoatsCore/doctor/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ countryCode: 91, mobileNo: Number(trimmed) })
        }
      );

      const data = await response.text();
      console.log(data);
      const parsed = data ? JSON.parse(data) : null;

      const serviceResp = parsed?.serviceResponse;
      const doctorInfo = parsed?.doctor?.[0];

      const status = serviceResp?.status?.toUpperCase();
      const message = serviceResp?.message;
      const token = doctorInfo?.otpToken;
      const dId = doctorInfo?.doctorId;

      if (status === 'Y') {

        const now = Date.now();
  const sessionValidityMs = 120000; // 2 minutes

  localStorage.setItem("sessionToken", token);
  localStorage.setItem("sessionStart", now);
  localStorage.setItem("sessionExpiry", now + sessionValidityMs);

  // Refresh cookie with new login timestamp
  document.cookie = `session_start=${now}; path=/;`;
  
        setMobile(trimmed);         // ✅ FIXED
        setOtpToken(token);
        setDoctorId(dId);
        setShowOtp(true);
        setInterestedId('');
        setServerMessage(message || 'OTP sent successfully!');
      } else {
        setServerMessage(message || 'No account found with this mobile number.');
      }
    } catch (err) {
      setServerMessage("Something went wrong. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Only render OTP screen, do NOT update state here
  if (showOtp) {
    return <Otp mobile={mobile} otpToken={otpToken} doctorId={doctorId} interestedId={interestedId} />;
  }

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

      {/* HERO */}
      <div className="bodydiv">
      <section className="hero-section">

        {/* LEFT */}
        <div className="left-side">
          <div className="left-inner">
            <div className="dots">
              {images.map((_, i) => (
                <span key={i} className={current === i ? "dot active" : "dot"}></span>
              ))}
            </div>

            <p className="hero-heading">
              Learn, revise and excel – the ultimate learning platform for<br />your medical journey
            </p>

            <img src={images[current]} className="hero-illustration" alt="illustration" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="right-side">
          <div className="login-card">
            <h3>Let's Get Started</h3>

            <form onSubmit={handleSubmit}>
              <div className="input-row">
                <div className="country-code">🇮🇳 +91</div>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  ref={mobileInputRef}
                  disabled={loading}
                />
              </div>

              {error && <p className="error-text">{error}</p>}
              {serverMessage && <p className="server-text">{serverMessage}</p>}

              <button disabled={loading}>
                {loading ? "Please wait..." : "Verify"}
              </button>
            </form>

            <p className="policy">Privacy Policy | T&amp;C</p>
          </div>
        </div>

      </section></div>
    </div>
  );
};

export default Login;
