import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Rate.css";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Filmimg from "./img/gimg.jpg";

const URL = "http://localhost:8080/rates";

const RateDetails = () => {
  const [rates, setRates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    username: "",
    email: "",
    rates: "",
    comment: "",
  });
  const [updateRating, setUpdateRating] = useState(0);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const response = await axios.get(URL);
      setRates(response.data.rate);
    } catch (error) {
      console.error("Error fetching rates:", error);
    }
  };

  const handleSearch = () => {
    const filteredRates = rates.filter((rate) =>
      Object.values(rate).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setRates(filteredRates);
    setNoResults(filteredRates.length === 0);
  };

  const handleUpdate = async (id) => {
    const selectedRate = rates.find((rate) => rate._id === id);
    if (selectedRate) {
      setUpdateData({
        id: selectedRate._id,
        username: selectedRate.username,
        email: selectedRate.email,
        rates: selectedRate.rates.toString(), // Assuming rates is a number
        comment: selectedRate.comment,
      });
      setUpdateRating(parseFloat(selectedRate.rates)); // Set the update rating
    }
  };

  const handleChange = (newValue, name) => {
    if (name === "rates") {
      setUpdateRating(newValue);
    } else {
      setUpdateData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/${updateData.id}`, {
        username: updateData.username,
        email: updateData.email,
        rates: updateRating, // Use updateRating for rates
        comment: updateData.comment,
      });
      fetchRates(); // Refresh rates after update
      setUpdateData({
        id: "",
        username: "",
        email: "",
        rates: "",
        comment: "",
      });
      setUpdateRating(0); // Reset updateRating
    } catch (error) {
      console.error("Error updating rate:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this rate?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        setRates((prevRates) => prevRates.filter((rate) => rate._id !== id));
      } catch (error) {
        console.error("Error deleting rate:", error);
      }
    }
  };
  

  return (
    <div>
      <div>
        <div className="film_box_details">
          
           
          <div className="lin"></div>
          <button
            className="add_rate"
            onClick={() => (window.location.href = "./addrate")}
          >
            Add Rate
          </button>
          <h1 className="cen_h1">Review And Ratings</h1>
          <div className="cen_box">
            <div>
              <td className="">
                <input
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  name="search"
                  className="serch_inpt"
                  placeholder="Search And Review Rateings"
                ></input>
              </td>
              <td>
                <button onClick={handleSearch} className="seachbtn">
                  Search
                </button>
              </td>
            </div>
          </div>
          {noResults ? (
            <h1>No results found.</h1>
          ) : (
            rates.map((rate) => (
              <div key={rate._id} className="boxrviv">
                <div className="right_film_rate">
                  <div className="profile-info">
                    <img
                      src={rate.profileIcon} // Add the profile icon URL here
                      alt="profile"
                      className="profile-icon"
                    />
                    <div>
                      <p className="username">{rate.username}</p>
                      <p className="email">{rate.email}</p>
                    </div>
                  </div>
                  <Rating
                    name="read-only"
                    value={parseFloat(rate.rates)} // Convert to number if necessary
                    precision={0.5} // Precision for half-star ratings
                    readOnly
                    icon={<StarIcon fontSize="inherit" />}
                  />
                  <p className="comet">{rate.comment}</p>
                  <div className="btn_set">
                    <button
                      onClick={() => handleUpdate(rate._id)}
                      className="updtbtn_rate"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(rate._id)}
                      className="dltbtn_rate"
                    >
                      Delete
                    </button>
                  </div>
                  {updateData.id === rate._id && (
                    <form onSubmit={handleSubmit} className="updt_form">
                      <Rating
                        name="update-rating"
                        value={updateRating}
                        precision={0.5}
                        onChange={(event, newValue) =>
                          handleChange(newValue, "rates")
                        }
                        icon={<StarIcon fontSize="inherit" />}
                      />
                      <br></br>
                      <textarea
                        name="comment"
                        className="rate-text_updt"
                        value={updateData.comment}
                        onChange={(e) =>
                          handleChange(e.target.value, "comment")
                        }
                        placeholder="Update Comment"
                        required
                      />
                      <br></br>
                      <button
                        type="submit"
                        className="updtbtn_rate cen_brn_save"
                      >
                        Save
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RateDetails;
