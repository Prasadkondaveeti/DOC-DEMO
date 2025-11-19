import React, { useState } from "react";
import Fotter from "./Fotter";
import Header1 from "./Header1";
import { useNavigate } from "react-router-dom";
import "./NeetPg.css";
import { FaUser, FaEnvelope, FaPhoneAlt, FaPen, FaUniversity, FaMapMarkerAlt } from "react-icons/fa";
import NeetOtp from "./NeetOtp";

const NeetPg = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    email: "",
    rank: "",
    course: "",
    specialization: "",
    state: "",
    category: ""
  });
  
  const navigate = useNavigate();
  const handle = () => {
    navigate("/NeetSS", { replace: true });
  };
   const [apiMessage,setapiMessage]=useState("")
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [pendingResults, setPendingResults] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpError, setOtpError] = useState("");


  

  const URL = "https://svcp.doctutorials.com/studentv2";

  const specializations = {
  DNB: [
   "(NBEMS) ANAESTHESIOLOGY",
  "(NBEMS) Anatomy",
  "(NBEMS) BIOCHEMISTRY",
  "(NBEMS) Cardio Vascular and Thoracic Surgery (Direct 6 Years Course)",
  "(NBEMS) COMMUNITY MEDICINE",
  "(NBEMS) DERMATOLOGY and VENEREOLOGY and LEPROSY",
  "(NBEMS) Emergency Medicine",
  "(NBEMS) FAMILY MEDICINE",
  "(NBEMS) FORENSIC MEDICINE",
  "(NBEMS) GENERAL MEDICINE",
  "(NBEMS) GENERAL SURGERY",
  "(NBEMS) Geriatric Medicine",
  "(NBEMS) Hospital Administration",
  "(NBEMS) IMMUNO-HAEMATOLOGY AND BLOOD TRANSFUSION",
  "(NBEMS) MICROBIOLOGY",
  "(NBEMS) Neuro Surgery (Direct 6 Years Course)",
  "(NBEMS) NUCLEAR MEDICINE",
  "(NBEMS) Obstetrics and Gynaecology",
  "(NBEMS) OPHTHALMOLOGY",
  "(NBEMS) ORTHOPAEDICS",
  "(NBEMS) Otorhinolaryngology (E.N.T.)",
  "(NBEMS) Paediatric Surgery (Direct 6 Years Course)",
  "(NBEMS) PAEDIATRICS",
  "(NBEMS) Palliative Medicine",
  "(NBEMS) PATHOLOGY",
  "(NBEMS) PHARMACOLOGY",
  "(NBEMS) PHYSICAL MED. And REHABILITATION",
  "(NBEMS) PHYSIOLOGY",
  "(NBEMS) Plastic and Reconstructive Surgery (Direct 6 Years Course)",
  "(NBEMS) PSYCHIATRY",
  "(NBEMS) RADIO-DIAGNOSIS",
  "(NBEMS) Respiratory Medicine",
  "(NBEMS-DIPLOMA) ANAESTHESIOLOGY",
  "(NBEMS-DIPLOMA) FAMILY MEDICINE",
  "(NBEMS-DIPLOMA) Obstetrics and Gynaecology",
  "(NBEMS-DIPLOMA) OPHTHALMOLOGY",
  "(NBEMS-DIPLOMA) Otorhinolaryngology (E.N.T.)",
  "(NBEMS-DIPLOMA) PAEDIATRICS",
  "(NBEMS-DIPLOMA) RADIO-DIAGNOSIS",
  "(NBEMS-DIPLOMA) Tuberculosis and CHEST DISEASES"
  ],
 
  "MD/MS": [
    "M.D. (ANAESTHESIOLOGY)",
    "M.D. (BIOCHEMISTRY)",
    "M.D. (COMMUNITY HEALTH and ADMN.)",
    "M.D. (DERM., VENE. and LEPROSY)/(DERMATOLOGY)/(SKIN and VENEREAL DISEASES)/(VENEREOLOGY)",
    "M.D. (Emergency and Critical Care)/M.D. (Emergency Medicine)",
    "M.D. (FAMILY MEDICINE)",
    "M.D. (FORENSIC MEDICINE)",
    "M.D. (GENERAL MEDICINE)",
    "M.D. (Hospital Administration)",
    "M.D. (MICROBIOLOGY)",
    "M.D. (Obst. and Gynae)/MS (Obstetrics and Gynaecology)",
    "M.D. (PAEDIATRICS)",
    "M.D. (PALLIATIVE MEDICINE)",
    "M.D. (PATHOLOGY)",
    "M.D. (PHARMACOLOGY)",
    "M.D. (PHYSICAL MED. and REHABILITATION)",
    "M.D. (PHYSIOLOGY)",
    "M.D. (PREVENTIVE and SOCIAL MEDICINE)/COMMUNITY MEDICINE",
    "M.D. (PSYCHIATRY)",
    "M.D. (RADIO-DIAGNOSIS)",
    "M.D. (Radiotherapy/Radiation Oncology)",
    "M.D. (TROPICAL MEDICINE)",
    "M.D. (Tuberculosis and Respiratory diseases)/Pulmonary Medicine /M.D. (Respiratory Medicine)",
    "M.D. GERIATRICS",
    "M.D. IN NUCLEAR MEDICINE",
    "M.D. IN TRANSFUSION MEDICINE/ IMMUNO-HAEMATOLOGY and BLOOD TRANSFUSION",
    "M.D. Laboratory Medicine Course",
    "M.D. Sports Medicine",
    "M.S. (E.N.T.)",
    "M.S. (GENERAL SURGERY)",
    "M.S. (OPHTHALMOLOGY)",
    "M.S. (ORTHOPAEDICS)",
    "M.S. (Traumatology and Surgery)",
    "M.D/MS (Anatomy)",
  ],
};
const statesList = [
  "All India",           "Andaman & Nicobar", "Andhra Pradesh",
  "Arunachal Pradesh",   "Assam",              "Bihar",
  "Chandigarh",          "Chhattisgarh",       "Dadra And Nagar Haveli",
  "Delhi",               "Goa",                "Gujarat",
  "Haryana",             "Himachal Pradesh",   "Jammu And Kashmir",
  "Jharkhand",           "Karnataka",          "Kerala",
  "Madhya Pradesh",      "Maharashtra",        "Manipur",
  "Meghalaya",           "Mizoram",            "Nagaland",
  "Nagar Haveli",        "Odisha",             "Puducherry",
  "Punjab",              "Rajasthan",          "Sikkim",
  "Tamil Nadu",          "Telangana",          "Tripura",
  "Uttar Pradesh",       "Uttarakhand",        "West Bengal"
];
 

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
  setErrors({ ...errors, [e.target.name]: "" }); // clear error when typing
};


  const fetchPredictData = async () => {
    const payload = {
      gatewayRequest: {
        request: {
          name: formData.name,
          email: formData.email,
          mobileNo: formData.mobileNo,
          rank: formData.rank,
          course: formData.course,
          specialization: formData.specialization,
          state: formData.state,
          category: formData.category
        }
      }
    };

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Channelid: "Web",
        Serreqid: "/predictSeatNEETPG",
        Apiversion: "1.0.0.0",
        Appversion: "1.0.0.0"
      },
      body: JSON.stringify(payload)
    });

    return await response.json();
  };

  const verifyOtpApi = async (otp) => {
    const payload = {
      gatewayRequest: {
        request: {
          mobileNo: formData.mobileNo,
          otp: otp
        }
      }
    };

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Channelid: "Web",
        Serreqid: "/predictSeatNEETPGVerifyOTP",
        Apiversion: "1.0.0.0",
        Appversion: "1.0.0.0"
      },
      body: JSON.stringify(payload)
    });

    return await response.json();
  };
  const validate = () => {
  let newErrors = {};

  if (!formData.name.trim()) newErrors.name = "Please enter name";

  if (!formData.mobileNo.trim() || !/^\d{10}$/.test(formData.mobileNo))
      newErrors.mobileNo = "Enter valid mobile number";

  if (!String(formData.email).trim() || !/\S+@\S+\.\S+/.test(formData.email))
    newErrors.email = "Enter valid email";

  if (!String(formData.rank).trim())
    newErrors.rank = "Please enter rank";

  if (!formData.course)
    newErrors.course = "Please select course";

  if (!formData.state)
    newErrors.state = "Please select state";

  if (!formData.specialization)
    newErrors.specialization = "Please select specialization";

  if (!formData.category)
    newErrors.category = "Please select category";
// inside validate()
console.log("validate() -> newErrors:", newErrors);
setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};



  const handleSubmit = async (e) => {
     e.preventDefault();
  setapiMessage("");

  // ✅ run validation
  if (!validate()) return;

  setLoading(true);
  setResults([]);
  setPendingResults(null);

    try {
      const res = await fetchPredictData();
      const status = res?.gatewayResponse?.status;

      if (!status?.isSuccess) {
        setapiMessage(status.message);
        setLoading(false);
        return;
      }

      if (status.message === "P") {
        setShowOtp(true);
        setPendingResults(res);
        setLoading(false);
        return;
      }

      setResults(res?.gatewayResponse?.response?.seatPredictor || []);
    } catch (err) {
      setapiMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

 const handleOtpVerify = async (otp) => {
  setOtpSending(true);
  setOtpError(""); // clear previous error

  try {
    const res = await verifyOtpApi(otp);
    const status = res?.gatewayResponse?.status;

    if (!status?.isSuccess) {
      setOtpError(status.message);   // <-- save OTP API error
      return;
    }

    const finalRes = await fetchPredictData();
    setResults(finalRes?.gatewayResponse?.response?.seatPredictor || []);

    setShowOtp(false);
  } catch (err) {
    setOtpError("Something went wrong. Try again.");
  } finally {
    setOtpSending(false);
  }
};

 

  return (
    <>
      <Header1 />
      <div className="body">
        <div className="body1">
          <div className="seat-page">
            <div className="seat-header">
            <p>
              Dear aspirant,
              <br />
              As the NEET PG 2025 results are announced, you must be anxious to
              determine which college you could pursue your Post Graduation at.
            </p>
 
            <p>
              Kill the anxiety in just 2 steps! Select the relevant filters in the
              form below and enter your Rank and Email ID to see which college is
              waiting for you.
            </p>
 
            <p>We have collated this according to the seat allotment data post-NEET PG 2024.</p>
            <p>We recommend viewing this on a desktop or tablet for the best experience.</p>
          </div>

            {/* FORM SECTION */}
            {!showOtp && (
              <div className="form-container">
                <h2 className="form-title">Check Your Seat Allotment</h2>

                <form className="form-grid" onSubmit={handleSubmit}>

                  {/* NAME */}
                  <div className="form-field">
                    <label>Name*</label>
                    <div className="input-box">
                      <FaUser className="input-icon" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                      
                      />
                      
                    </div>{errors.name && <p className="error-text">{errors.name}</p>}
                  </div>

                  {/* MOBILE */}
                  <div className="form-field">
                    <label>Mobile Number*</label>
                    <div className="input-box">
                      <FaPhoneAlt className="input-icon" />
                      <input
                        type="tel"
                        name="mobileNo"
                        placeholder="Mobile No"
                        value={formData.mobileNo}
                        onChange={(e) => {
                          const onlyNums = e.target.value.replace(/\D/g, "");
                          setFormData({ ...formData, mobileNo: onlyNums });
                        }}
                        maxLength="10"
                        
                      />
                    </div>{errors.mobileNo && <p className="error-text">{errors.mobileNo}</p>}
                  </div>

                  {/* EMAIL */}
                  <div className="form-field">
                    <label>Email Id*</label>
                    <div className="input-box">
                      <FaEnvelope className="input-icon" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        
                      />
                    </div>{errors.email && <p className="error-text">{errors.email}</p>}

                  </div>

                  {/* RANK */}
                  <div className="form-field">
                    <label>NEET PG 2025 Rank*</label>
                    <div className="input-box">
                      <FaPen className="input-icon" />
                      <input
                        type="number"
                        name="rank"
                        placeholder="Rank"
                        value={formData.rank}
                        onChange={handleChange}
                        
                      />
                    </div>{errors.rank && <p className="error-text">{errors.rank}</p>}

                  </div>

                  {/* COURSE */}
                  <div className="form-field">
                    <label>Course*</label>
                    <div className="input-box">
                      <FaUniversity className="input-icon" />
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                       
                      >
                        <option value="">-- Select --</option>
                        <option value="DNB">DNB</option>
                        <option value="MD/MS">MD/MS</option>
                      </select>
                    </div>{errors.course && <p className="error-text">{errors.course}</p>}

                  </div>

                  {/* STATE */}
                  <div className="form-field">
                    <label>Select State*</label>
                    <div className="input-box">
                      <FaMapMarkerAlt className="input-icon" />
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                       
                      >
                        <option value="">Select Your State</option>
                        {statesList.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>{errors.state && <p className="error-text">{errors.state}</p>}

                  </div>

                  {/* SPECIALIZATION */}
                  <div className="form-field">
                    <label>Specialization*</label>
                    <div className="input-box">
                      <FaUniversity className="input-icon" />
                      <select
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        
                        disabled={!formData.course}
                      >
                        <option value="">-- Select --</option>
                        {formData.course &&
                          (specializations[formData.course] || []).map((sp, idx) => (
                            <option key={idx} value={sp}>{sp}</option>
                          ))}
                      </select>
                    </div>{errors.specialization && <p className="error-text">{errors.specialization}</p>}

                  </div>

                  {/* CATEGORY */}
                  <div className="form-field">
                    <label>Category*</label>
                    <div className="input-box">
                      <FaUniversity className="input-icon" />
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                       
                      >
                        <option value="">-- Select --</option>
                        <option value="EWS">EWS</option>
                        <option value="EWS PwD">EWS PwD</option>
                        <option value="OBC">OBC</option>
                        <option value="OBC PwD">OBC PwD</option>
                        <option value="Open">Open</option>
                        <option value="Open PwD">Open PwD</option>
                        <option value="SC">SC</option>
                        <option value="SC PwD">SC PwD</option>
                        <option value="ST">ST</option>
                        <option value="ST PwD">ST PwD</option>
                      </select>
                    </div>{errors.category && <p className="error-text">{errors.category}</p>}

                  </div>

                  <div className="btns1">   
            <button type="submit" className="submit-btns1" disabled={loading}>
              {loading ? "Loading…" : "Submit"}
            </button>
                <button type="button" className="submit-btns2" onClick={handle}>Go TO NEETSS</button>
              </div>
              {apiMessage && (
                <p style={{ color: "black", fontWeight: "bold", marginTop: "10px", textAlign: "center", backgroundColor: "lightpink", padding: "10px" }}>
                  {apiMessage}
                </p>
              )}
                </form>
                {results.length === 0 && !apiMessage && (
              <div className="disclaimer">
                <strong>Disclaimer: Based on</strong>
                <ul>
                  <li>NEET SS 2023 allotment list</li>
                  <li>All India Quota</li>
                  <li>Phase 1 allotment</li>
                </ul>
              </div>)}

                {results.length > 0 && (
                  <div className="form-container" style={{ marginTop: "20px" }}>
                    <h2 className="form-title">Your Seat Prediction</h2>

                    <table className="seat-table">
                      <thead>
                        <tr>
                          <th>Sno</th>
                          <th>Rank</th>
                          <th>Alloted Quota</th>
                          <th>Alloted Institute</th>
                          <th>State</th>
                          <th>Course</th>
                          <th>Alloted Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((row, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.rank}</td>
                            <td>{row.allotedQuota}</td>
                            <td>{row.allotedInstitute}</td>
                            <td>{row.state}</td>
                            <td>{row.course}</td>
                            <td>{row.allotedCategory}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {showOtp && (
  <NeetOtp
    mobile={formData.mobileNo}
    onVerified={handleOtpVerify}
    onCancel={() => setShowOtp(false)}
    otpSending={otpSending}
    otpError={otpError}    // <-- pass error here
  />
)}
          </div>
        </div>
      </div>

      <Fotter />
    </>
  );
};

export default NeetPg;
