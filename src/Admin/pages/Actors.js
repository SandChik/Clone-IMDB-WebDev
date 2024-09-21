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
import { useDropzone } from "react-dropzone";

// Reusable styles
const tableCellStyle = {
  color: "#fff",
  bgcolor: "#2a2a2a",
  fontSize: "1rem",
};

const headerCellStyle = {
  color: "#fff",
  bgcolor: "#1E90FF",
  fontWeight: "bold",
  fontSize: "1.1rem",
};

const Actors = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Dropzone logic
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setSelectedFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  // Data for the table
  const actors = [
    {
      id: 1,
      country: "Japan",
      name: "Takuya Kimura",
      birthDate: "19 Desember 1975",
      photo: "img1.jpg",
    },
    {
      id: 2,
      country: "Japan",
      name: "Yuko Takeuchi",
      birthDate: "19 Oktober 1977",
      photo: "img2.jpg",
    },
  ];

  const tableHeaders = [
    "ID",
    "Country",
    "Actor Name",
    "Birth Date",
    "Photos",
    "Actions",
  ];

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Manage Actors
      </Typography>

      {/* Input Fields dan Tombol Submit */}
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
          label="Country"
          variant="outlined"
          sx={textFieldStyle(200)}
        />
        <TextField
          label="Actor Name"
          variant="outlined"
          sx={textFieldStyle(250)}
        />
        <TextField
          label="Birth Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          sx={textFieldStyle(200)}
        />

        {/* Drag-and-Drop Area for File Upload */}
        <Box {...getRootProps()} sx={dropzoneStyle}>
          <input {...getInputProps()} />
          <Typography variant="body2">
            {selectedFile
              ? "File Selected: " + selectedFile.name
              : "Drag 'n' drop file here"}
          </Typography>
        </Box>

        <Button variant="contained" sx={submitButtonStyle}>
          Submit
        </Button>
      </Box>

      {/* Preview the selected image */}
      {selectedFile && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <img
            src={selectedFile.preview}
            alt="Preview"
            style={{ maxWidth: "300px", borderRadius: "5px" }}
          />
        </Box>
      )}

      {/* Tabel untuk Actors */}
      <Table sx={tableStyle}>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableCell key={header} align="left" sx={headerCellStyle}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {actors.map((actor) => (
            <TableRow key={actor.id}>
              <TableCell align="left" sx={tableCellStyle}>
                {actor.id}
              </TableCell>
              <TableCell align="left" sx={tableCellStyle}>
                {actor.country}
              </TableCell>
              <TableCell align="left" sx={tableCellStyle}>
                {actor.name}
              </TableCell>
              <TableCell align="left" sx={tableCellStyle}>
                {actor.birthDate}
              </TableCell>
              <TableCell align="left" sx={tableCellStyle}>
                <Box
                  component="img"
                  src={actor.photo}
                  alt={actor.name}
                  sx={{ width: 50, height: 50, borderRadius: "5px" }}
                />
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "#FF69B4", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                <Button sx={actionButtonStyle}>Edit</Button> |{" "}
                <Button sx={actionButtonStyle}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

// Styling helpers
const textFieldStyle = (width) => ({
  input: { color: "white" },
  label: { color: "#fff" },
  backgroundColor: "#2c2c2c",
  borderColor: "#00BFFF",
  width,
});

const dropzoneStyle = {
  border: "2px dashed #1E90FF",
  borderRadius: "5px",
  bgcolor: "#2c2c2c",
  color: "#fff",
  padding: "10px",
  width: 200,
  textAlign: "center",
  cursor: "pointer",
};

const submitButtonStyle = {
  bgcolor: "#1E90FF",
  "&:hover": { bgcolor: "#00BFFF" },
  fontWeight: "bold",
  height: "fit-content",
};

const tableStyle = {
  bgcolor: "#1c1c1c",
  borderRadius: "10px",
  width: "90%",
  margin: "0 auto",
  mt: 2,
};

const actionButtonStyle = { color: "#FF69B4", fontSize: "0.9rem" };

export default Actors;
