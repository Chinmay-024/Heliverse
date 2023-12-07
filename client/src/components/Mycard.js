import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Mycard({ user, onDelete }) {
  const dispatch = useDispatch();
  const selectedUsers = useSelector((state) => state.selectedUsers);

  const handleAddToTeam = () => {
    dispatch({ type: "ADD_USER_TO_TEAM", payload: user });
  };

  const handleRemoveFromTeam = () => {
    dispatch({ type: "REMOVE_USER_FROM_TEAM", payload: user._id });
  };
  function isUserInList(users, userId) {
    return users.some((user) => user._id === userId);
  }
  const isUserSelected = isUserInList(selectedUsers, user._id);
  return (
    <Card sx={{ maxWidth: 250, margin: "1rem", boxShadow: 2 }}>
      <CardActionArea>
        <Avatar
          alt={user.first_name}
          src={user.avatar}
          sx={{
            width: 100,
            height: 100,
            margin: "auto",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        />
        <CardContent sx={{ position: "relative" }}>
          <Typography
            style={{ display: "inline-block" }}
            gutterBottom
            variant="h6"
            component="div"
          >
            {user.first_name}
          </Typography>
          <Typography
            style={{
              display: "inline-block",
              marginLeft: "0.2rem",
              marginTop: "1rem",
            }}
            gutterBottom
            variant="body2"
            color="text.primary"
          >
            {user.last_name}
          </Typography>
          <Typography variant="body2" color="text.primary" noWrap>
            {user.email}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ marginTop: "0.5rem" }}
          >
            {user.domain}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="body2"
              color={user.available ? "success.main" : "error.main"}
              sx={{ marginTop: "0.5rem" }}
            >
              {user.available ? "Available" : "Not Available"}
            </Typography>
            {/* Delete Icon */}
            <div>
              <IconButton
                aria-label="add-to-team"
                onClick={
                  isUserSelected ? handleRemoveFromTeam : handleAddToTeam
                }
                sx={{ position: "absolute", bottom: "0.5rem", right: "3rem" }}
              >
                {isUserSelected ? <RemoveIcon /> : <AddIcon />}
              </IconButton>
            </div>
            <div>
              <IconButton
                aria-label="delete"
                onClick={() => onDelete(user._id)}
                sx={{ position: "absolute", bottom: "0.5rem", right: "0.5rem" }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
