import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import axios from "../utils/axiosConfig"; // Gunakan axiosConfig

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    countryId: "",
    urlPhoto: "",
  });
  const [editId, setEditId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchActors();
    fetchCountries();
  }, []);

  const fetchActors = async () => {
    try {
      const response = await axios.get("/api/actors"); // Gunakan axiosConfig
      const sortedActors = response.data.sort((a, b) => a.id - b.id); // Urutkan ascending berdasarkan id
      setActors(sortedActors);
    } catch (error) {
      console.error("Error fetching actors:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get("/api/countries"); // Gunakan axiosConfig
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.countryId || !formData.urlPhoto) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (editId) {
        await axios.put(`/api/actors/${editId}`, formData); // Gunakan axiosConfig
        setActors((prevActors) =>
          prevActors.map((actor) =>
            actor.id === editId ? { ...actor, ...formData } : actor
          )
        );
      } else {
        const response = await axios.post("/api/actors", formData); // Gunakan axiosConfig
        setActors((prevActors) =>
          [...prevActors, response.data].sort((a, b) => a.id - b.id)
        ); // Urutkan setelah menambahkan
      }
      setFormData({ name: "", countryId: "", urlPhoto: "" });
      setEditId(null);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error submitting actor:", error);
    }
  };

  const handleEdit = (actor) => {
    setEditId(actor.id);
    setFormData({
      name: actor.name,
      countryId: actor.countryId,
      urlPhoto: actor.urlPhoto,
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this actor?")) {
      try {
        await axios.delete(`/api/actors/${id}`); // Gunakan axiosConfig
        setActors((prevActors) =>
          prevActors.filter((actor) => actor.id !== id)
        );
      } catch (error) {
        console.error("Error deleting actor:", error);
      }
    }
  };


  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormData({ name: "", countryId: "", urlPhoto: "" });
    setEditId(null);
  };

  const filteredActors = actors.filter((actor) =>
    actor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Manage Actors
      </Typography>

      {/* Search Field and Add Button */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          justifyContent: "space-between",
          maxWidth: "90%",
          mx: "auto",
        }}
      >
        <TextField
          label="Search Actor"
          variant="outlined"
          sx={{ ...textFieldStyle, width: "300px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          sx={submitButtonStyle}
        >
          Add Actor
        </Button>
      </Box>

      {/* Actor Table */}
      <Table sx={tableStyle}>
        <TableHead>
          <TableRow>
            {["ID", "Country", "Actor Name", "Photo", "Actions"].map(
              (header) => (
                <TableCell key={header} align="center" sx={headerCellStyle}>
                  {header}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredActors.map((actor) => (
            <TableRow key={actor.id}>
              <TableCell align="center" sx={tableCellStyle}>
                {actor.id}
              </TableCell>
              <TableCell
                align="center"
                sx={{ ...tableCellStyle, fontWeight: "bold" }}
              >
                {countries.find((country) => country.id === actor.countryId)
                  ?.name || "Unknown"}
              </TableCell>
              <TableCell align="center" sx={tableCellStyle}>
                {actor.name}
              </TableCell>
              <TableCell align="center" sx={tableCellStyle}>
                <Box
                  component="img"
                  src={actor.urlPhoto}
                  alt={actor.name}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "5px",
                    objectFit: "cover",
                  }}
                />
              </TableCell>
              <TableCell align="center" sx={tableCellStyle}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <Button
                    onClick={() => handleEdit(actor)}
                    sx={{ ...actionButtonStyle, fontSize: "0.8rem" }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(actor.id)}
                    sx={{ ...actionButtonStyle, fontSize: "0.8rem" }}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog for Add/Edit */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            bgcolor: "#121212",
            color: "white",
            width: "400px",
            mx: "auto",
            p: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#1E90FF",
            textAlign: "center",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          {editId ? "Edit Actor" : "Add Actor"}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Actor Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            sx={{
              backgroundColor: "#2c2c2c",
              input: { color: "white" },
              label: { color: "#fff" },
            }}
          />
          <TextField
            select
            label="Country"
            value={formData.countryId}
            onChange={(e) =>
              setFormData({ ...formData, countryId: e.target.value })
            }
            fullWidth
            sx={{
              backgroundColor: "#2c2c2c",
              label: { color: "#fff" },
              input: { color: "white" },
            }}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    bgcolor: "#2c2c2c",
                    "& .MuiMenuItem-root": { color: "white" },
                  },
                },
              },
            }}
          >
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Photo URL"
            value={formData.urlPhoto}
            onChange={(e) =>
              setFormData({ ...formData, urlPhoto: e.target.value })
            }
            fullWidth
            sx={{
              backgroundColor: "#2c2c2c",
              input: { color: "white" },
              label: { color: "#fff" },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
          <Button onClick={handleDialogClose} sx={{ color: "#FF69B4" }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{ bgcolor: "#1E90FF", color: "white", fontWeight: "bold" }}
          >
            {editId ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Styles
const textFieldStyle = {
  input: { color: "white" },
  label: { color: "#fff" },
  backgroundColor: "#2c2c2c",
  width: 300,
};
const submitButtonStyle = {
  bgcolor: "#1E90FF",
  "&:hover": { bgcolor: "#00BFFF" },
  fontWeight: "bold",
};
const tableStyle = {
  bgcolor: "#1c1c1c",
  borderRadius: "10px",
  width: "90%",
  margin: "0 auto",
  mt: 2,
};
const headerCellStyle = {
  color: "#fff",
  bgcolor: "#1E90FF",
  fontWeight: "bold",
  fontSize: "1.1rem",
};
const tableCellStyle = { color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" };
const actionButtonStyle = { color: "#FF69B4", fontSize: "0.9rem" };

export default Actors;
