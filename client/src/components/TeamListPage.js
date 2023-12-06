import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useHistory } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const TeamListPage = () => {
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const teamsPerPage = 10; // Adjust as needed
  const history = useHistory();

  const fetchTeams = async () => {
    try {
      const response = await axiosInstance.get(
        `/team?page=${currentPage}&limit=${teamsPerPage}`
      );
      if (response.data != null) setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error.message);
    }
  };

  const fetchTotalPages = async () => {
    try {
      const response = await axiosInstance.get("/team/count");
      const totalTeams = response.data.numberOfTeams;
      const calculatedTotalPages = Math.ceil(totalTeams / teamsPerPage);
      setTotalPages(calculatedTotalPages || 1); // Ensure it's at least 1
    } catch (error) {
      console.error("Error fetching total pages:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTotalPages();
      await fetchTeams();
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleTeamClick = (teamId) => {
    history.push(`/team/${teamId}`);
  };

  return (
    <div style={{ display: "inline-block", margin: "5rem" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team._id}>
                <TableCell>{team._id}</TableCell>
                <TableCell>{team.title}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleTeamClick(team._id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        style={{ marginTop: "16px", marginLeft: "auto", marginBottom: "16px" }}
      />
    </div>
  );
};

export default TeamListPage;
