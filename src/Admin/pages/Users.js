import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, username: "anita1", email: "anita@gmail.com" },
    { id: 2, username: "borang", email: "bora@yahoo.com" },
  ]);

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Manage Users
      </Typography>

      {/* Input Fields and Submit Button */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          sx={{
            input: { color: "white" },
            label: { color: "#fff" },
            backgroundColor: "#2c2c2c",
            borderColor: "#00BFFF",
            width: 200,
          }}
        />
        <TextField
          label="Email"
          variant="outlined"
          sx={{
            input: { color: "white" },
            label: { color: "#fff" },
            backgroundColor: "#2c2c2c",
            borderColor: "#00BFFF",
            width: 250,
          }}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: "#1E90FF",
            "&:hover": { bgcolor: "#00BFFF" },
            fontWeight: "bold",
            height: "fit-content",
          }}
        >
          Submit
        </Button>
      </Box>

      {/* Users Table */}
      <Table
        sx={{
          bgcolor: "#1c1c1c",
          borderRadius: "10px",
          width: "80%",
          margin: "0 auto",
          mt: 2,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              align="left"
              sx={{
                color: "#fff",
                bgcolor: "#1E90FF",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              ID
            </TableCell>
            <TableCell
              align="left"
              sx={{
                color: "#fff",
                bgcolor: "#1E90FF",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              Username
            </TableCell>
            <TableCell
              align="left"
              sx={{
                color: "#fff",
                bgcolor: "#1E90FF",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              Email
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: "#fff",
                bgcolor: "#1E90FF",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell
                align="left"
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {user.id}
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {user.username}
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {user.email}
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#FF69B4", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                <Button sx={{ color: "#FF69B4", fontSize: "0.9rem" }}>
                  Send first email
                </Button>{" "}
                |{" "}
                <Button sx={{ color: "#FF69B4", fontSize: "0.9rem" }}>
                  Edit
                </Button>{" "}
                |{" "}
                <Button sx={{ color: "#FF69B4", fontSize: "0.9rem" }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Users;
