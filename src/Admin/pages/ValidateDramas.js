import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const ValidateDramas = () => {
  const [open, setOpen] = useState(false);

  // Function to open/close modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Sample data
  const dramaData = [
    {
      id: 1,
      title: "[2024] Japan - Eye Love You",
      actors: "Takuya Kimura, Takeuchi Yuko, Neinen Reina",
      genres: "Romance, Adventures, Comedy",
      synopsis:
        "I love this drama. It taught me a lot about money and finance. Love is not everything.",
      status: "Unapproved",
    },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Validate Dramas
      </Typography>

      <Table
        sx={{
          bgcolor: "#1c1c1c",
          borderRadius: "10px",
          width: "80%",
          margin: "0 auto",
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
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dramaData.map((drama) => (
            <TableRow key={drama.id}>
              <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                {drama.title}
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
                <Button onClick={handleOpen} sx={{ color: "#FF69B4" }}>
                  Approve
                </Button>{" "}
                | <Button sx={{ color: "#FF69B4" }}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for Approve */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Approve Drama
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Are you sure you want to approve this drama?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleClose} variant="contained" color="primary">
              Approve
            </Button>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ValidateDramas;
    