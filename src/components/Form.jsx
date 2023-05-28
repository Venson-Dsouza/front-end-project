import React, { useEffect, useState } from "react";
import "../css/form.css";
import loader from "../images/loader.gif";
import { useNavigate } from "react-router-dom";
export function RegForm() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const isValid = /^\d{10}$/.test(mobile);

    if (!isValid) {
      alert("Invalid Form, mobile number is not proper");
      return;
    }
    navigate("/card");
  };
  if (loading === true) {
    return (
      <div className="loader">
        <img
          src={loader}
          alt="Loading"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    );
  }

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <h2>Enter Registration Details</h2>
        <lable>Name:</lable>
        <input
          className="inputstyle"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <lable>City:</lable>
        <input
          className="inputstyle"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <lable>Email ID:</lable>
        <input
          className="inputstyle"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <lable>Mobile:</lable>
        <input
          className="inputstyle"
          type="tel"
          placeholder="Phone no"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          className="inputstyle"
          type="checkbox"
          checked={agreeTerms}
          required
          onChange={() => setAgreeTerms(!agreeTerms)}
        />
        <label>I agree Terms and Conditions</label>
        <input type="submit" />
      </form>
    </div>
  );
}
