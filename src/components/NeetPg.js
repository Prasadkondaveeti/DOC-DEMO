import React, { useState } from "react";
import Fotter from "./Fotter";
import Header1 from "./Header1";
import { useNavigate } from "react-router-dom";
import "./NeetSS.css";
import { FaUser, FaEnvelope, FaPhoneAlt, FaPen, FaUniversity } from "react-icons/fa";

function NeetPg() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    rank: "",
    course: "",
    specialization: "",
    state: "",
    category: "",
  });
  
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
 
 
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [apiMessage, setApiMessage] = useState("");

  const navigate = useNavigate();
  const handle = () => {
    navigate("/NeetSS", { replace: true });
  };
 
  const callPredictionApi = async () => {
  try {
    const response = await fetch("https://svcp.doctutorials.com/studentv2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        serreqid: "/predictSeatNEETPG",
        appversion: "1.0.0.0",
        channelid: "Web",
      },
      body: JSON.stringify({
        gatewayRequest: {
          request: {
            name: formData.name,
            mobileNo: formData.mobile,
            email: formData.email,
            rank: formData.rank,
            course: formData.course,
            specialization: formData.specialization,
            state: formData.state,
            category: formData.category,
          },
        },
      }),
    });

    const data = await response.json();

    const rows = data?.gatewayResponse?.response?.seatPredictor || [];
    const msg = data?.gatewayResponse?.status?.message || "";

    if (rows.length === 0) {
      setApiMessage(msg);     // ⭐ DISPLAY API ERROR
      return [];
    }

    setApiMessage("");        // ⭐ CLEAR error if seats exist
    return rows;

  } catch (error) {
    console.error("API Error:", error);
    setApiMessage("Network error");
    return [];
  }
};


  // VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) newErrors.email = "Please enter email";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter valid email";

    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter valid 10-digit mobile number";

    if (!formData.rank.trim()) newErrors.rank = "Please enter rank";
    if (!formData.course) newErrors.course = "Please select course";
    if (!formData.specialization) newErrors.specialization = "Please select specialization";
    if (!formData.state) newErrors.state = "Please select state";
    if (!formData.category) newErrors.category = "Please select category";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ⭐⭐⭐ FIXED submit handler
   const handleSubmit = async (e) => {
  e.preventDefault();

  if (validate()) {
    setApiMessage("");
    setTableData([]); // clear old results

    const rows = await callPredictionApi(); // ⭐ FIXED: wait for API response
    setTableData(rows); // ⭐ FIXED: display API data in table
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="body">
      <div className="body1">
        <div className="seat-page">
          <Header1 />

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

          {/* Form */}
          <div className="form-container">
            <h2 className="form-title">Check Your NEET PG Seat Allotment</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">

                {/* NAME */}
                <div className="form-field">
                  <label>Full Name *</label>
                  <div className="input-box">
                    <FaUser className="input-icon" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
                  </div>
                  {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                {/* MOBILE */}
                <div className="form-field">
                  <label>Mobile Number *</label>
                  <div className="input-box">
                    <FaPhoneAlt className="input-icon" />
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" />
                  </div>
                  {errors.mobile && <p className="error-text">{errors.mobile}</p>}
                </div>

                {/* EMAIL */}
                <div className="form-field">
                  <label>Email *</label>
                  <div className="input-box">
                    <FaEnvelope className="input-icon" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                  </div>
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                {/* RANK */}
                <div className="form-field">
                  <label>NEET PG 2025 Rank *</label>
                  <div className="input-box">
                    <FaPen className="input-icon" />
                    <input type="number" name="rank" value={formData.rank} onChange={handleChange} placeholder="Rank" />
                  </div>
                  {errors.rank && <p className="error-text">{errors.rank}</p>}
                </div>

                {/* COURSE */}
                <div className="form-field">
                  <label>Select Course *</label>
                  <div className="input-box">
                    <FaUniversity className="input-icon" />
                    <select name="course" value={formData.course} onChange={handleChange}>
                      <option value="">Select Course</option>
                      <option value="MD/MS">MD/MS</option>
                      <option value="DNB">DNB</option>
                    </select>
                  </div>
                  {errors.course && <p className="error-text">{errors.course}</p>}
                </div>

                {/* STATE */}
                <div className="form-field">
                  <label>Select State *</label>
                  <div className="input-box">
                    <FaUniversity className="input-icon" />
                    <select name="state" value={formData.state} onChange={handleChange}>
                      <option value="">Select State</option>
                      {[
                        "All India","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
                        "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
                        "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
                        "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu",
                        "Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
                      ].map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  {errors.state && <p className="error-text">{errors.state}</p>}
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
      required
      disabled={!formData.course}     // ⬅ disables when course not selected
    >
      <option value="">-- Select --</option>
 
      {/* Only show when course selected */}
      {formData.course &&
        specializations[formData.course].map((sp, idx) => (
          <option key={idx} value={sp}>{sp}</option>
        ))
      }
    </select>
  </div>
</div>
 

                {/* CATEGORY */}
                <div className="form-field">
                  <label>Select Category *</label>
                  <div className="input-box">
                    <FaUniversity className="input-icon" />
                    <select name="category" value={formData.category} onChange={handleChange}>
                      <option value="">Select Category</option>
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
                  </div>
                  {errors.category && <p className="error-text">{errors.category}</p>}
                </div>
              </div>

              <div className="btns">
                <button type="submit" className="submit-btn">Submit</button>
                <button className="submit-btn1" onClick={handle}>Go TO NEETSS</button>
              </div>
              {apiMessage && (
                <p style={{ color: "black", fontWeight: "bold", marginTop: "10px", textAlign: "center", backgroundColor: "lightpink", padding: "10px" }}>
                  {apiMessage}
                </p>
              )}
            </form>
          </div>

          {/* TABLE */}
          {tableData.length > 0 && (
            <div className="form-container" style={{ marginTop: "20px" }}>
              <h2 className="form-title">Your Seat Prediction</h2>

              <table className="seat-table">
                <thead>
                  <tr>
                    <th>Sr. No</th>
                    <th>Rank</th>
                    <th>Alloted Quota</th>
                    <th>Alloted Institute</th>
                    <th>State</th>
                    <th>Course</th>
                    <th>Alloted Category</th>
                  </tr>
                </thead>

                <tbody>
                  {tableData.map((row, index) => (
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
      </div>

      <Fotter />
    </div>
  );
}

export default NeetPg;
