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
} from "@mui/material";
import axios from "axios";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [editId, setEditId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get("/api/genres");
      const sortedGenres = response.data.sort((a, b) => a.id - b.id); // Urutkan berdasarkan ID
      setGenres(sortedGenres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const handleSubmit = async () => {
    if (!genreName) {
      alert("Please fill in the genre name.");
      return;
    }

    try {
      if (editId) {
        await axios.put(`/api/genres/${editId}`, { name: genreName });

        setGenres((prevGenres) =>
          prevGenres
            .map((genre) =>
              genre.id === editId ? { ...genre, name: genreName } : genre
            )
            .sort((a, b) => a.id - b.id)
        );
        setEditId(null);
      } else {
        const response = await axios.post("/api/genres", { name: genreName });

        setGenres((prevGenres) =>
          [...prevGenres, response.data].sort((a, b) => a.id - b.id)
        );
      }

      setGenreName("");
      setOpenDialog(false);
    } catch (error) {
      console.error("Error submitting genre:", error);
    }
  };

  const handleEdit = (genre) => {
    setEditId(genre.id);
    setGenreName(genre.name);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this genre?")) {
      try {
        await axios.delete(`/api/genres/${id}`);
        setGenres((prevGenres) =>
          prevGenres.filter((genre) => genre.id !== id)
        );
      } catch (error) {
        console.error("Error deleting genre:", error);
      }
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditId(null);
    setGenreName("");
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Manage Genres
      </Typography>

      {/* Search Field and Add Genre Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          width: "80%",
          mx: "auto",
        }}
      >
        <TextField
          label="Search Genre"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            input: { color: "white" },
            label: { color: "#fff" },
            backgroundColor: "#2c2c2c",
            width: 300,
          }}
        />
        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          sx={{
            bgcolor: "#1E90FF",
            "&:hover": { bgcolor: "#00BFFF" },
            fontWeight: "bold",
          }}
        >
          Add Genre
        </Button>
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
              Genre
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
          {genres
            .filter((genre) =>
              genre.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((genre) => (
              <TableRow key={genre.id}>
                <TableCell
                  align="left"
                  sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
                >
                  {genre.id}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
                >
                  {genre.name}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "#FF69B4",
                    bgcolor: "#2a2a2a",
                    fontSize: "1rem",
                  }}
                >
                  <Button
                    onClick={() => handleEdit(genre)}
                    sx={{ color: "#FF69B4", fontSize: "0.9rem" }}
                  >
                    Edit
                  </Button>{" "}
                  |{" "}
                  <Button
                    onClick={() => handleDelete(genre.id)}
                    sx={{ color: "#FF69B4", fontSize: "0.9rem" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Dialog for Edit/Add Genre */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        PaperProps={{
          sx: { bgcolor: "#121212", color: "white" },
        }}
      >
        <DialogTitle
          sx={{ color: "#1E90FF", textAlign: "center", fontWeight: "bold" }}
        >
          {editId ? "Edit Genre" : "Add Genre"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Genre"
            variant="outlined"
            value={genreName}
            onChange={(e) => setGenreName(e.target.value)}
            fullWidth
            sx={{
              mt: 2,
              input: { color: "white" },
              label: { color: "#fff" },
              backgroundColor: "#2c2c2c",
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleDialogClose} sx={{ color: "#FF69B4" }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{ bgcolor: "#1E90FF", color: "white" }}
          >
            {editId ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Genres;
