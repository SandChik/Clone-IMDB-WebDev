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
} from "@mui/material";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all countries from the backend
  const fetchCountries = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/countries");
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries(); // Load countries on component mount
  }, []);

  // Handle adding a new country
  const handleAddCountry = async () => {
    if (newCountry.trim() === "") return;

    try {
      const response = await fetch("http://localhost:5000/api/countries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCountry.trim().toUpperCase() }),
      });

      if (response.ok) {
        fetchCountries(); // Refresh data after successful addition
        setNewCountry(""); // Clear input field
      } else {
        const errorData = await response.json();
        console.error("Failed to add country:", errorData.message);
      }
    } catch (error) {
      console.error("Error adding country:", error);
    }
  };

  // Handle deleting a country
  const handleDeleteCountry = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/countries/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchCountries(); // Refresh data after successful deletion
      } else {
        console.error("Failed to delete country");
      }
    } catch (error) {
      console.error("Error deleting country:", error);
    }
  };

  // Filter countries based on search term
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Manage Countries
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, justifyContent: "center" }}>
        <TextField
          label="Country"
          variant="outlined"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
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
          onClick={handleAddCountry}
          sx={{
            bgcolor: "#1E90FF",
            "&:hover": { bgcolor: "#00BFFF" },
            fontWeight: "bold",
            height: "fit-content",
          }}
        >
          Submit
        </Button>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            input: { color: "white" },
            label: { color: "#fff" },
            backgroundColor: "#2c2c2c",
            borderColor: "#00BFFF",
            width: 200,
          }}
        />
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
              Country
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
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCountries.map((country) => (
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
                sx={{
                  color: "#FF69B4",
                  bgcolor: "#2a2a2a",
                  fontSize: "1rem",
                }}
              >
                <Button
                  sx={{ color: "#FF69B4", fontSize: "0.9rem" }}
                  onClick={() => handleDeleteCountry(country.id)}
                >
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
