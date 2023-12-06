// TeamCreation.js
import React, { useState } from "react";
import { Container, Typography, Chip, Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const TeamCreation = () => {
  const selectedUsers = useSelector((state) => state.selectedUsers);
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [teamTitle, setTeamTitle] = useState("");

  const handleClearSelectedUsers = () => {
    dispatch({ type: "CLEAR_SELECTED_USERS" });
    setError(false);
  };

  const handleRemoveUser = (userId) => {
    dispatch({ type: "REMOVE_USER_FROM_TEAM", payload: userId });
    setError(false);
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();

    try {
      if (!teamTitle.trim()) {
        setError(true);
        return;
      }

      await axiosInstance.post("/team", {
        title: teamTitle,
        users: selectedUsers,
      });
      dispatch({ type: "CLEAR_SELECTED_USERS" });
      history.push("/");
    } catch (error) {
      setError(true);
      console.error("Error Creating user:", error.message);
    }
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Create Team
      </Typography>
      <TextField
        label="Team Title"
        variant="outlined"
        fullWidth
        value={teamTitle}
        onChange={(e) => setTeamTitle(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />
      <Typography variant="subtitle1" gutterBottom>
        Selected Users:
      </Typography>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {selectedUsers.map((user) => (
          <Chip
            key={user._id}
            label={user.email}
            onDelete={() => handleRemoveUser(user._id)}
            deleteIcon={<ClearIcon />}
          />
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateTeam}
        style={{ marginTop: "2rem", marginRight: "1rem" }}
      >
        Create Team
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClearSelectedUsers}
        style={{ marginTop: "2rem", marginLeft: "1rem" }}
      >
        Clear Selected Users
      </Button>
      {error && (
        <Typography variant="body2" color="error" style={{ marginTop: "1rem" }}>
          Form Couldnt be submitted
        </Typography>
      )}
    </Container>
  );
};

export default TeamCreation;
