import React, { useEffect, useRef, useState } from "react";
import "./NeetOtp.css";
 
const NeetOtp = ({ mobile, onVerified, otpSending, otpError }) => {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  //  const [errorMessage, seterrorMessage] = useState("");
  const inputsRef = useRef([]);
 
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);
 
  const handleChange = (val, index) => {
    if (!/^\d?$/.test(val)) return;
 
    const temp = [...digits];
    temp[index] = val;
    setDigits(temp);
 
    if (val && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };
 
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };
 
  const submitOtp = () => {
    const otp = digits.join("");
 
    if (otp.length !== 4) {
      setError("Please enter 4-digit OTP");
      return;
    }
 
    setError("");
    onVerified(otp);
  };
 
  return (
    <div className="otp-backdrop">
      <div className="otp-wrapper">
        <h3 className="otp-title">Verify Mobile Number</h3>
 
        <div className="otp-inputs">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              className="otp-box"
              type="text"
              maxLength={1}
              inputMode="numeric"
              value={digit}
              disabled={otpSending}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
 
        {error && <div className="otp-error">{error}</div>}
 
        <button
  className="otp-submit"
  onClick={submitOtp}
  disabled={otpSending}
>
  {otpSending ? "Processing…" : "Submit"}
</button>

{/* NEW — Display API error */}
{otpError && (
  <div className="otp-error" style={{ marginTop: "10px" }}>
    {otpError}
  </div>
)}

 
      </div>
    </div>
  );
};
 
export default NeetOtp;
 