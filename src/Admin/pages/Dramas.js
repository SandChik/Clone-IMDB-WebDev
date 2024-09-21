import React, { useState } from "react";
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

const Dramas = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDrama, setSelectedDrama] = useState(null);

  const dramaList = [
    {
      id: 1,
      drama: "[2024] Japan - Eye Love You",
      actors: "Takuya Kimura, Takeuchi Yuko, Neinen Reina",
      genres: "Romance, Adventures, Comedy",
      synopsis:
        "I love this drama. It taught me a lot about money and finance...",
      status: "Unapproved",
    },
    // Add more drama data as needed
  ];

  const handleOpenModal = (drama) => {
    setSelectedDrama(drama);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDrama(null);
  };

  // Utility Component for Text Fields
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
      {/* Drama Table */}
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
                {drama.drama}
              </TableCell>
              <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                {drama.actors}
              </TableCell>
              <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                {drama.genres}
              </TableCell>
              <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                {drama.synopsis}
              </TableCell>
              <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                {drama.status}
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

      {/* Modal for Editing Drama */}
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
              <DramaTextField label="Drama Title" value={selectedDrama.drama} />
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
