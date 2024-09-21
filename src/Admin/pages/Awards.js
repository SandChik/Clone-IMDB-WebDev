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

const Awards = () => {
  // Array untuk header tabel
  const tableHeaders = ["ID", "Country", "Year", "Award", "Actions"];

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Manage Awards
      </Typography>

      {/* Input Fields dan Tombol Submit */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, justifyContent: "center" }}>
        <TextField
          label="Country"
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
          label="Year"
          variant="outlined"
          sx={{
            input: { color: "white" },
            label: { color: "#fff" },
            backgroundColor: "#2c2c2c",
            borderColor: "#00BFFF",
            width: 150,
          }}
        />
        <TextField
          label="Award"
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

      {/* Tabel untuk Awards */}
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
            {tableHeaders.map((header) => (
              <TableCell
                key={header}
                align="left"
                sx={{
                  color: "#fff",
                  bgcolor: "#1E90FF",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[
            {
              id: 1,
              country: "Japan",
              year: "2024",
              award: "Japanese Drama Awards Spring 2024",
            },
            {
              id: 2,
              country: "Korea",
              year: "2024",
              award: "Korean Drama Awards Spring 2024",
            },
            {
              id: 3,
              country: "China",
              year: "2024",
              award: "Chinese Drama Awards Spring 2024",
            },
          ].map((award) => (
            <TableRow key={award.id}>
              <TableCell
                align="left"
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {award.id}
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {award.country}
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {award.year}
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {award.award}
              </TableCell>
              <TableCell
                align="left"
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

export default Awards;
