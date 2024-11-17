import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("None");
  const [showCount, setShowCount] = useState(10);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      const sortedUsers = response.data.sort((a, b) => a.id - b.id);
      setUsers(sortedUsers);
      setLoading(false);
      console.log("Fetched Users:", sortedUsers); // Debugging Console
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenEditDialog = (user) => {
    setEditUser(user);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setEditUser(null);
    setOpenEditDialog(false);
  };

  const handleEditUser = async () => {
    if (!editUser) return;

    try {
      await axios.put(`http://localhost:5000/api/users/${editUser.id}`, {
        username: editUser.username,
        email: editUser.email,
        role: editUser.role,
      });
      fetchUsers();
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Manage Users
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 2,
              mb: 3,
              width: "80%",
              margin: "0 auto",
            }}
          >
            <Typography sx={{ color: "white" }}>Filtered by Role:</Typography>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{ color: "white", bgcolor: "#2c2c2c", width: 150 }}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="WRITER">Writer</MenuItem>
              <MenuItem value="USER">User</MenuItem>
            </Select>
            <Typography sx={{ color: "white" }}>Shows</Typography>
            <Select
              value={showCount}
              onChange={(e) => setShowCount(e.target.value)}
              sx={{ color: "white", bgcolor: "#2c2c2c", width: 100 }}
            >
              {[5, 10, 15].map((count) => (
                <MenuItem key={count} value={count}>
                  {count}
                </MenuItem>
              ))}
            </Select>
          </Box>

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
                {["ID", "Username", "Email", "Role", "Actions"].map((head) => (
                  <TableCell
                    key={head}
                    align="left"
                    sx={{
                      color: "#fff",
                      bgcolor: "#1E90FF",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter((user) =>
                  filter === "None" ? true : user.role === filter
                )
                .slice(0, showCount)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                      {user.id}
                    </TableCell>
                    <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                      {user.username}
                    </TableCell>
                    <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                      {user.email}
                    </TableCell>
                    <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                      {user.role}
                    </TableCell>
                    <TableCell sx={{ color: "#FF69B4", bgcolor: "#2a2a2a" }}>
                      <Button
                        onClick={() => handleOpenEditDialog(user)}
                        sx={{ color: "#FF69B4" }}
                      >
                        Edit
                      </Button>{" "}
                      |{" "}
                      <Button
                        onClick={() => handleDeleteUser(user.id)}
                        sx={{ color: "#FF69B4" }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      )}

      {/* Edit User Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        PaperProps={{
          sx: { bgcolor: "#1c1c1c", color: "#e0e0e0" },
        }}
      >
        <DialogTitle sx={{ color: "#4da8da" }}>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            variant="outlined"
            value={editUser?.username || ""}
            onChange={(e) =>
              setEditUser((prev) => ({ ...prev, username: e.target.value }))
            }
            fullWidth
            sx={{
              mt: 2,
              mb: 2,
              input: { color: "white" },
              label: { color: "#4da8da" },
              bgcolor: "#2c2c2c",
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={editUser?.email || ""}
            onChange={(e) =>
              setEditUser((prev) => ({ ...prev, email: e.target.value }))
            }
            fullWidth
            sx={{
              mb: 2,
              input: { color: "white" },
              label: { color: "#4da8da" },
              bgcolor: "#2c2c2c",
            }}
          />
          <Select
            value={editUser?.role || ""}
            onChange={(e) =>
              setEditUser((prev) => ({ ...prev, role: e.target.value }))
            }
            fullWidth
            sx={{
              color: "white",
              bgcolor: "#2c2c2c",
              mb: 2,
              ".MuiSelect-icon": { color: "white" },
            }}
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="WRITER">Writer</MenuItem>
            <MenuItem value="USER">User</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} sx={{ color: "#FF69B4" }}>
            Cancel
          </Button>
          <Button onClick={handleEditUser} sx={{ color: "#4da8da" }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
