import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function AddRate() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    category: "", // Category as the first input
    name: "",
    quantity: 0,
    size: "",
    company: "",
    price: 0,
    imageUrl: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputs.category || // Check if category is empty
      !inputs.name ||
      !inputs.quantity ||
      !inputs.size ||
      !inputs.company ||
      !inputs.price ||
      !inputs.imageUrl
    ) {
      alert("Please provide all required information.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/items", inputs);
      showAlert("Item added successfully!");
      navigate("/itemdetails");
    } catch (error) {
      console.error("Error adding item:", error);
      showAlert("Error adding item. Please try again.");
    }
  };

  const showAlert = (message) => {
    alert(message);
  };

  const handleViewItems = () => {
    navigate("/itemdetails");
  };

  return (
    <div>
      <div className="rate-full-box">
        <h1 className="rate-topic">
          Add <span className="rate-us">Item</span>
        </h1>
        <form onSubmit={handleSubmit} className="rate-full-box-form">
          <label className="rate-full-box-label">Category</label>
          <select
            name="category"
            value={inputs.category}
            onChange={handleChange}
            className="rate-full-box-input"
            required
          >
            <option value="">Select Category</option>
            <option value="ball">Ball</option>
            <option value="bat">Bat</option>
            <option value="gloves">Gloves</option>
            <option value="helmets">Helmets</option>
            <option value="pads">Pads</option>
            <option value="shoes">Shoes</option>
          </select>
          <br />
          <label className="rate-full-box-label">Name</label>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            className="rate-full-box-input"
            required
          />
          <br />
          <label className="rate-full-box-label">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={inputs.quantity}
            onChange={handleChange}
            className="rate-full-box-input"
            required
          />
          <br />
          <label className="rate-full-box-label">Size</label>
          <input
            type="text"
            name="size"
            value={inputs.size}
            onChange={handleChange}
            className="rate-full-box-input"
            required
          />
          <br />
          <label className="rate-full-box-label">Company</label>
          <input
            type="text"
            name="company"
            value={inputs.company}
            onChange={handleChange}
            className="rate-full-box-input"
            required
          />
          <br />
          <label className="rate-full-box-label">Price</label>
          <input
            type="number"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            className="rate-full-box-input"
            required
          />
          <br />
          <label className="rate-full-box-label">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={inputs.imageUrl}
            onChange={handleChange}
            className="rate-full-box-input"
            required
          />
          <br />
          <button type="submit" className="rate-add-btn">
            Add Item
          </button>
        </form>
        <button type="button" className="view-items-btn" onClick={handleViewItems}>
            View Items
          </button>
      </div>
    </div>
  );
}

export default AddRate;
