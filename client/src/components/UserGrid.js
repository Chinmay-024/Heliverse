import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Pagination,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import Mycard from "./Mycard";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const UserGrid = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limitPerPage = 20;
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    domain: "",
    gender: "",
    availability: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(
        `/users?page=${currentPage}&limit=${limitPerPage}&search=${searchQuery}&domain=${filterOptions.domain}&gender=${filterOptions.gender}&availability=${filterOptions.availability}`
      );

      const { users, totalPages, currentPage: newPage } = response.data;

      setUsers(users);
      setTotalPages(totalPages);

      if (users.length === 0 && newPage > 1) {
        setCurrentPage(newPage - 1);
      } else {
        setCurrentPage(newPage);
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const fetchTotalPages = async () => {
    try {
      const response = await axiosInstance.get("/users/count");
      const totalUsers = response.data.numberOfUsers;
      const calculatedTotalPages = Math.ceil(totalUsers / limitPerPage);
      setTotalPages(calculatedTotalPages || 1);
    } catch (error) {
      console.error("Error fetching total pages:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // await fetchTotalPages();
      await fetchUsers();
    };
    fetchData();
  }, [currentPage, searchQuery, filterOptions]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };
  const handleDomainChange = (event) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      domain: event.target.value,
    }));
  };

  const handleResetFilters = () => {
    setFilterOptions({
      domain: "",
      gender: "",
      availability: "",
    });
    setSearchQuery("");
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/users/${userId}`);

      const response = await axiosInstance.get(
        `/users?page=${currentPage}&limit=${limitPerPage}`
      );
      if (response.data.length === 0 && currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }

      await fetchTotalPages();
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    <Container>
      <div>
        <TextField
          label="Search by Name"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ margin: "1rem" }}
        />
        <TextField
          label="Search by Domain"
          value={filterOptions.domain}
          onChange={handleDomainChange}
          style={{ margin: "1rem" }}
        />
        <FormControl style={{ margin: "1rem", minWidth: 120 }}>
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            label="Gender"
            value={filterOptions.gender}
            onChange={handleFilterChange}
          >
            <MenuItem value="">null</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ margin: "1rem", minWidth: 120 }}>
          <InputLabel>Availability</InputLabel>
          <Select
            name="availability"
            label="Availability"
            value={filterOptions.availability}
            onChange={handleFilterChange}
          >
            <MenuItem value="">null</MenuItem>
            <MenuItem value="true">Available</MenuItem>
            <MenuItem value="false">Not Available</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          style={{ margin: "1rem", marginTop: "1.5rem" }}
          onClick={handleResetFilters}
        >
          Reset Filters
        </Button>
      </div>

      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid key={user._id} item xs={12} sm={6} md={3}>
            <Mycard user={user} onDelete={handleDeleteUser} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        style={{ marginTop: "2rem", marginLeft: "auto", marginBottom: "2rem" }}
      />
    </Container>
  );
};

export default UserGrid;
