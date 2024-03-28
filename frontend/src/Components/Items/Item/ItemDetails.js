import React, { useState, useEffect } from "react";
import axios from "axios";

const URL = "http://localhost:8080/items";

const ItemDetails = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    quantity: 0,
    size: "",
    company: "",
    price: 0,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(URL);
      setItems(response.data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSearch = () => {
    const filteredItems = items.filter((item) =>
      Object.values(item).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setItems(filteredItems);
    setNoResults(filteredItems.length === 0);
  };

  const handleUpdate = async (id) => {
    const selectedItem = items.find((item) => item._id === id);
    if (selectedItem) {
      setUpdateData({
        id: selectedItem._id,
        name: selectedItem.name,
        quantity: selectedItem.quantity,
        size: selectedItem.size,
        company: selectedItem.company,
        price: selectedItem.price,
      });
    }
  };

  const handleChange = (newValue, name) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/${updateData.id}`, updateData);
      fetchItems(); // Refresh items after update
      setUpdateData({
        id: "",
        name: "",
        quantity: 0,
        size: "",
        company: "",
        price: 0,
      });
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updatedItems = items.filter((item) => item._id !== id);
        setItems(updatedItems); // Update items after delete
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleCategoryFilter = (category) => {
    setSearchQuery(""); // Reset search query when category is selected
    if (category === "") {
      fetchItems(); // Fetch all items if no category is selected
    } else {
      const filteredItems = items.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() === category.toLowerCase()
      );
      setItems(filteredItems);
      setNoResults(filteredItems.length === 0);
    }
  };

  const handleShowAll = () => {
    setSearchQuery(""); // Reset search query
    fetchItems(); // Fetch all items
  };

  return (
    <div>
      <h1>Item Details</h1>
      <div>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Items"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <button onClick={() => handleCategoryFilter("ball")}>Ball</button>
        <button onClick={() => handleCategoryFilter("bat")}>Bat</button>
        <button onClick={() => handleCategoryFilter("gloves")}>Gloves</button>
        <button onClick={() => handleCategoryFilter("helmets")}>Helmets</button>
        <button onClick={() => handleCategoryFilter("pads")}>Pads</button>
        <button onClick={() => handleCategoryFilter("shoes")}>Shoes</button>
        <button onClick={handleShowAll}>Show All</button>
      </div>
      {noResults ? (
        <h2>No results found.</h2>
      ) : (
        items.map((item) => (
          <div key={item._id}>
            <p>Name: {item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Size: {item.size}</p>
            <p>Company: {item.company}</p>
            <p>Price: {item.price}</p>
            {item.imageUrl && <img src={item.imageUrl} alt="Item Image" />}
            <div>
              <button onClick={() => handleUpdate(item._id)}>Update</button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
            {updateData.id === item._id && (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={updateData.name}
                  onChange={(e) => handleChange(e.target.value, "name")}
                  required
                />
                <input
                  type="number"
                  name="quantity"
                  value={updateData.quantity}
                  onChange={(e) => handleChange(e.target.value, "quantity")}
                  required
                />
                <input
                  type="text"
                  name="size"
                  value={updateData.size}
                  onChange={(e) => handleChange(e.target.value, "size")}
                  required
                />
                <input
                  type="text"
                  name="company"
                  value={updateData.company}
                  onChange={(e) => handleChange(e.target.value, "company")}
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={updateData.price}
                  onChange={(e) => handleChange(e.target.value, "price")}
                  required
                />
                <button type="submit">Save</button>
              </form>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ItemDetails;
