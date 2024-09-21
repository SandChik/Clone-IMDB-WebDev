import React from "react";
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

const Genres = () => {
  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Manage Genres
      </Typography>

      {/* Input Fields dan Tombol Submit */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, justifyContent: "center" }}>
        <TextField
          label="Genre"
          variant="outlined"
          sx={{
            input: { color: "white" },
            label: { color: "#fff" },
            backgroundColor: "#2c2c2c",
            borderColor: "#00BFFF",
            width: 300,
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

      {/* Tabel untuk Genres */}
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
          {[
            { id: 1, genre: "Romance" },
            { id: 2, genre: "Drama" },
            { id: 3, genre: "Action" },
          ].map((genre) => (
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
                {genre.genre}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#FF69B4",
                  bgcolor: "#2a2a2a",
                  fontSize: "1rem",
                }}
              >
                <Button sx={{ color: "#FF69B4", fontSize: "0.9rem" }}>
                  Rename
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

export default Genres;
