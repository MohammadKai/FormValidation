import React, { useState } from "react";
import axios from "axios";

function Task() {
  const [formData, setFormData] = useState({
    companyName: "",
    panNumber: "",
    gstNumber: "",
    phoneNumber: "",
    officialEmail: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const phonePattern = /^[0-9]{10}$/;
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.phoneNumber.match(phonePattern)) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }

    if (!formData.panNumber.match(panPattern)) {
      newErrors.panNumber = "Invalid PAN number format.";
    }

    if (!formData.gstNumber.match(gstPattern)) {
      newErrors.gstNumber = "Invalid GST number format.";
    }

    if (!formData.officialEmail.match(emailPattern)) {
      newErrors.officialEmail = "Enter a valid email address.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data Submitted:", formData); // Log form data to console
      axios
        .post("http://localhost:5000/submit-form", formData)
        .then((response) => {
          console.log("Form Submitted Successfully:", response.data);
          alert("Form submitted successfully!");
        })
        .catch((error) => {
          console.error("Error submitting form:", error.response ? error.response.data : error.message);
          alert("Error submitting form.");
        });
    }
  };

  return (
    <div className="container">
      <h2>Organization</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
          />
          {errors.companyName && <span className="error">{errors.companyName}</span>}
        </div>
        <div className="form-group">
          <label>PAN Number:</label>
          <input
            type="text"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            placeholder="Enter PAN number"
          />
          {errors.panNumber && <span className="error">{errors.panNumber}</span>}
        </div>
        <div className="form-group">
          <label>GST Number:</label>
          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            placeholder="Enter GST number"
          />
          {errors.gstNumber && <span className="error">{errors.gstNumber}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>
        <div className="form-group">
          <label>Official Email:</label>
          <input
            type="email"
            name="officialEmail"
            value={formData.officialEmail}
            onChange={handleChange}
            placeholder="Enter official email"
          />
          {errors.officialEmail && <span className="error">{errors.officialEmail}</span>}
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
          />
        </div>
        <div className="form-group">
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
          />
        </div>
        <div className="form-group">
          <label>Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Enter zip code"
          />
        </div>

        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Task;
