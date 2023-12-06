import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid } from "@mui/material";
import Mycard from "./Mycard"; // Import your existing card component

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const TeamDetailsPage = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState({ title: "", users: [] });

  const fetchTeamDetails = async () => {
    try {
      const response = await axiosInstance.get(`/team/${teamId}`);
      setTeam(response.data);
    } catch (error) {
      console.error("Error fetching team details:", error.message);
    }
  };

  useEffect(() => {
    const a = async () => {
      await fetchTeamDetails();
    };
    a();
  }, [teamId]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
        {team.title}
      </Typography>
      <Grid container spacing={2}>
        {team.users.map((user) => (
          <Grid key={user._id} item xs={12} sm={6} md={3}>
            <Mycard user={user} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TeamDetailsPage;
