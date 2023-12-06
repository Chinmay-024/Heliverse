import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Pagination } from "@mui/material";
import Mycard from "./Mycard";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const UserGrid = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Initialize with 1 to avoid division by zero
  const limitPerPage = 20; // Adjust as needed

  const fetchUsers = async () => {
    if (currentPage > totalPages) {
      setCurrentPage((prev) => totalPages);
    }
    try {
      const response = await axiosInstance.get(
        `/users?page=${currentPage}&limit=${limitPerPage}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const fetchTotalPages = async () => {
    try {
      const response = await axiosInstance.get("/users/count");
      const totalUsers = response.data.numberOfUsers;
      const calculatedTotalPages = Math.ceil(totalUsers / limitPerPage);
      setTotalPages((prev) => calculatedTotalPages || 1); // Ensure it's at least 1
    } catch (error) {
      console.error("Error fetching total pages:", error.message);
    }
  };

  useEffect(() => {
    const a = async () => {
      await fetchTotalPages();
      await fetchUsers();
    };
    a();
  }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
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
