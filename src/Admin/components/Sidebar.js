import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText } from "@mui/material";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "250px",
        background: "#333",
        height: "100vh",
        color: "white",
      }}
    >
      <List>
        <ListItem>
          <ListItemText primary="Admin Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/admin/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/admin/countries">
          <ListItemText primary="Countries" />
        </ListItem>
        <ListItem button component={Link} to="/admin/users">
          <ListItemText primary="Users" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
