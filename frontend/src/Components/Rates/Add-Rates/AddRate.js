import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import "./AddRate.css";

function AddRate() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    rating: null,
    comment: "",
  });

  const handleChange = (event, newValue) => {
    setInputs((prevState) => ({
      ...prevState,
      rating: newValue,
    }));
  };

  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.rating || !inputs.comment || !inputs.username || !inputs.email) {
      alert("Please provide all required information.");
      return;
    }
    console.log(inputs);
    await sendRequest();
    showAlert();
    navigate("/ratedetails");
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8080/rates", {
      username: inputs.username,
      email: inputs.email,
      rates: inputs.rating,
      comment: inputs.comment,
    });
  };

  const showAlert = () => {
    alert("Rate added successfully!");
  };

  return (
    <div>
      <div>
        <div className="rate-full-box">
          <div>
            <h1 className="rate-topic">
              Add <span className="rate-us">Rate</span>{" "}
            </h1>
            <form onSubmit={handleSubmit} className="rate-full-box-form">
              <label className="rate-full-box-label">Username</label>
              <input
                type="text"
                name="username"
                value={inputs.username}
                onChange={handleCommentChange}
                className="rate-full-box-input"
                required
              />
              <br />
              <label className="rate-full-box-label">Email</label>
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleCommentChange}
                className="rate-full-box-input"
                required
              />
              <br />
              <label className="rate-full-box-label">Rating</label>
              <Rating
                name="rating"
                size="large"
                value={inputs.rating}
                onChange={handleChange}
                precision={1}
                icon={<StarIcon fontSize="inherit" />}
                required
              />
              <br />
              <label className="rate-full-box-label">Comment</label>
              <textarea
                className="rate-full-box-input rate-text"
                name="comment"
                value={inputs.comment}
                onChange={handleCommentChange}
                required
              />
              <br />
              <button type="submit" className="rate-add-btn">
                Add Rate
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRate;
