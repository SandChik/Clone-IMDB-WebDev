import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";

const Dramas = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDrama, setSelectedDrama] = useState(null);
  const [dramaList, setDramaList] = useState([]);

  // Mengambil data drama dari backend
  useEffect(() => {
    const fetchDramas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dramas"); // Sesuaikan URL dengan server backend
        setDramaList(response.data);
      } catch (error) {
        console.error("Error fetching dramas:", error);
      }
    };

    fetchDramas();
  }, []);

  const handleOpenModal = (drama) => {
    setSelectedDrama(drama);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDrama(null);
  };

  const DramaTextField = ({ label, value, multiline = false, rows = 1 }) => (
    <TextField
      label={label}
      fullWidth
      defaultValue={value}
      multiline={multiline}
      rows={rows}
      sx={{
        mb: 2,
        input: { color: "white" },
        label: { color: "#fff" },
        backgroundColor: "#2c2c2c",
        "& .MuiInputBase-root": {
          borderRadius: "5px",
        },
      }}
    />
  );

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Table
        sx={{
          bgcolor: "#1c1c1c",
          borderRadius: "10px",
          width: "90%",
          margin: "0 auto",
          mt: 2,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ color: "#fff", bgcolor: "#1E90FF", fontWeight: "bold" }}
            >
              Drama
            </TableCell>
            <TableCell
              sx={{ color: "#fff", bgcolor: "#1E90FF", fontWeight: "bold" }}
            >
              Actors
            </TableCell>
            <TableCell
              sx={{ color: "#fff", bgcolor: "#1E90FF", fontWeight: "bold" }}
            >
              Genres
            </TableCell>
            <TableCell
              sx={{ color: "#fff", bgcolor: "#1E90FF", fontWeight: "bold" }}
            >
              Poster
            </TableCell>
            <TableCell
              sx={{ color: "#fff", bgcolor: "#1E90FF", fontWeight: "bold" }}
            >
              Photo URL
            </TableCell>
            <TableCell
              sx={{ color: "#fff", bgcolor: "#1E90FF", fontWeight: "bold" }}
            >
              Rating
            </TableCell>
            <TableCell
              sx={{ color: "#fff", bgcolor: "#1E90FF", fontWeight: "bold" }}
            >
              Duration
            </TableCell>
            <TableCell
              sx={{ color: "#fff", bgcolor: "#1E90FF", fontWeight: "bold" }}
            >
              Synopsis
            </TableCell>
            <TableCell
              sx={{ color: "#fff", bgcolor: "#1E90FF", fontWeight: "bold" }}
            >
              Status
            </TableCell>
            <TableCell
              sx={{ color: "#fff", bgcolor: "#1E90FF", fontWeight: "bold" }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dramaList.map((drama) => (
            <TableRow key={drama.id}>
              <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                {drama.title} - {drama.year}
              </TableCell>
              <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                {drama.actors}
              </TableCell>
              <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                {drama.genres}
              </TableCell>
              <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                <img
                  src={drama.posterUrl}
                  alt="Poster"
                  style={{
                    width: "100px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </TableCell>
              <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                <a
                  href={drama.photoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Photo
                </a>
              </TableCell>
              <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                {drama.rating ? `${drama.rating}/10` : "N/A"}
              </TableCell>
              <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                {drama.duration ? `${drama.duration} mins` : "N/A"}
              </TableCell>
              <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                {drama.synopsis}
              </TableCell>
              <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                {drama.status || "Unapproved"}
              </TableCell>
              <TableCell sx={{ color: "#FF69B4", bgcolor: "#2a2a2a" }}>
                <Button
                  sx={{ color: "#FF69B4" }}
                  onClick={() => handleOpenModal(drama)}
                >
                  Edit
                </Button>
                {" | "}
                <Button sx={{ color: "#FF69B4" }}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            bgcolor: "#2a2a2a",
            p: 4,
            borderRadius: "10px",
            color: "white",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Edit Drama</h2>
          {selectedDrama && (
            <>
              <DramaTextField label="Drama Title" value={selectedDrama.title} />
              <DramaTextField label="Actors" value={selectedDrama.actors} />
              <DramaTextField label="Genres" value={selectedDrama.genres} />
              <DramaTextField
                label="Synopsis"
                value={selectedDrama.synopsis}
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                sx={{ bgcolor: "#1E90FF", "&:hover": { bgcolor: "#00BFFF" } }}
              >
                Save
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Dramas;
