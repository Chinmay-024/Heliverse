// AddUserForm.js
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const AddUserForm = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    avatar: "",
    domain: "",
    available: false,
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/users", userData);
      history.push("/");
      // Optionally, you can redirect or show a success message
    } catch (error) {
      setError(true);
      console.error("Error adding user:", error.message);
      // Handle the error, show a message, etc.
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            maxWidth: "400px", // Optional: Limit the width of the form
            margin: "auto", // Center the form horizontally
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <TextField
              label="First Name"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Last Name"
              name="last_name"
              value={userData.last_name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
            {/* Use Select for "Available" field */}
            <Select
              label="Available"
              name="available"
              value={userData.available}
              onChange={handleChange}
              autoWidth
              required
            >
              <MenuItem value={true}>Available</MenuItem>
              <MenuItem value={false}>Not Available</MenuItem>
            </Select>
          </div>
          {/* Group "Gender" and "Domain" in one column */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <TextField
              label="Gender"
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              required
            />
            <TextField
              label="Domain"
              name="domain"
              value={userData.domain}
              onChange={handleChange}
              required
            />
            {/* Rest of the fields in another column */}
            <TextField
              label="Avatar URL"
              name="avatar"
              value={userData.avatar}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: "auto", display: "block", marginTop: "2rem" }}
        >
          Add User
        </Button>
        {error && (
          <Alert
            style={{ margin: "auto", marginTop: "2rem", width: "50%" }}
            severity="error"
          >
            Form Submission Failed
          </Alert>
        )}
      </form>
    </Container>
  );
};

export default AddUserForm;
