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
  Checkbox,
} from "@mui/material";

const Countries = () => {
  // Array untuk header tabel
  const tableHeaders = ["ID", "Country", "Default", "Actions"];

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Manage Countries
      </Typography>

      {/* Input Field dan Tombol Submit */}
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

      {/* Tabel Country */}
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
            { id: 1, name: "Japan" },
            { id: 2, name: "Korea" },
            { id: 3, name: "China" },
          ].map((country) => (
            <TableRow key={country.id}>
              <TableCell
                align="left"
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {country.id}
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {country.name}
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                <Checkbox
                  sx={{
                    color: "#1E90FF",
                    '& .MuiSvgIcon-root': { fontSize: 28 }, // Adjust the checkbox size
                  }}
                />
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

export default Countries;
