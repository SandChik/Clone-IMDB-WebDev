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
import axios from "axios";

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [award, setAward] = useState("");
  const [editId, setEditId] = useState(null);

  const tableHeaders = ["ID", "Country", "Award", "Actions"];

  useEffect(() => {
    fetchAwards();
    fetchCountries();
  }, []);

const fetchAwards = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/awards");
    // Sort data berdasarkan 'id' agar urutannya tetap konsisten
    const sortedAwards = response.data.sort((a, b) => a.id - b.id);
    setAwards(sortedAwards);
  } catch (error) {
    console.error("Error fetching awards:", error);
  }
};


  const fetchCountries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/countries");
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleSubmit = async () => {
    if (!countryId || !award) {
      alert("Please fill all fields.");
      return;
    }

    try {
      if (editId) {
        // Update existing award
        await axios.put(`http://localhost:5000/api/awards/${editId}`, {
          countryId,
          name: award,
        });
        setEditId(null);
      } else {
        // Add new award
        await axios.post("http://localhost:5000/api/awards", {
          countryId,
          name: award,
        });
      }
      setCountryId("");
      setAward("");
      fetchAwards();
    } catch (error) {
      console.error("Error submitting award:", error);
    }
  };

  const handleEdit = (award) => {
    setEditId(award.id);
    setCountryId(
      award.countries && award.countries.length > 0 ? award.countries[0].id : ""
    );
    setAward(award.name);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this award?")) {
      try {
        await axios.delete(`http://localhost:5000/api/awards/${id}`);
        fetchAwards();
      } catch (error) {
        console.error("Error deleting award:", error);
      }
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Manage Awards
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, justifyContent: "center" }}>
        <TextField
          select
          label="Country"
          variant="outlined"
          value={countryId}
          onChange={(e) => setCountryId(e.target.value)}
          sx={{
            input: { color: "white" },
            label: { color: "#fff" },
            backgroundColor: "#2c2c2c",
            width: 200,
          }}
          SelectProps={{
            native: true,
          }}
        >
          <option value="" disabled>
          </option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </TextField>
        <TextField
          label="Award"
          variant="outlined"
          value={award}
          onChange={(e) => setAward(e.target.value)}
          sx={{
            input: { color: "white" },
            label: { color: "#fff" },
            backgroundColor: "#2c2c2c",
            width: 300,
          }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            bgcolor: "#1E90FF",
            "&:hover": { bgcolor: "#00BFFF" },
            fontWeight: "bold",
            height: "fit-content",
          }}
        >
          {editId ? "Update" : "Submit"}
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
          {awards.map((award) => (
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
                {award.countries && award.countries.length > 0
                  ? award.countries.map((country) => country.name).join(", ")
                  : "No Country"}
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {award.name}
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "#FF69B4", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                <Button
                  onClick={() => handleEdit(award)}
                  sx={{ color: "#FF69B4", fontSize: "0.9rem" }}
                >
                  Edit
                </Button>{" "}
                |{" "}
                <Button
                  onClick={() => handleDelete(award.id)}
                  sx={{ color: "#FF69B4", fontSize: "0.9rem" }}
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

export default Awards;
