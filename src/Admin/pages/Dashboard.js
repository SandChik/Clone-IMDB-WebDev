import React from "react";
import { Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to the admin dashboard. Here you can manage Dramas, Countries,
        Awards, and more.
      </Typography>
    </div>
  );
};

export default Dashboard;
