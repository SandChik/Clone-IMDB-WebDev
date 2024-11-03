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
  Modal,
} from "@mui/material";
import axios from "axios";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#1a1a1a",
  color: "#e0e0e0",
  boxShadow: 24,
  p: 4,
  maxWidth: 600,
  width: "90%",
  borderRadius: "8px",
};

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [award, setAward] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const tableHeaders = ["ID", "Country", "Award", "Actions"];

  useEffect(() => {
    fetchAwards();
    fetchCountries();
  }, []);

  const fetchAwards = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/awards");
      const sortedAwards = response.data.sort((a, b) => a.id - b.id); // Sorting ascending by ID
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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditId(null);
    setCountryId("");
    setAward("");
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
      fetchAwards(); // Refresh data
      handleCloseModal(); // Close modal
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
    handleOpenModal();
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

  const filteredAwards = awards.filter((award) =>
    award.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Manage Awards
      </Typography>

      {/* Search Field and Add Award Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          width: "80%",
          mx: "auto",
        }}
      >
        <TextField
          label="Search Award"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          onClick={handleOpenModal}
          sx={{
            bgcolor: "#1E90FF",
            "&:hover": { bgcolor: "#00BFFF" },
            fontWeight: "bold",
          }}
        >
          Add Award
        </Button>
      </Box>

      {/* Tabel Award */}
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
          {filteredAwards.map((award) => (
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

      {/* Modal for Add/Edit Award */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography
            variant="h6"
            sx={{ color: "#4da8da", mb: 3, textAlign: "center" }}
          >
            {editId ? "Edit Award" : "Add Award"}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
              }}
              SelectProps={{
                native: true,
              }}
            >
              <option value="" disabled>
                Select Country
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
              }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: "#1E90FF",
                "&:hover": { bgcolor: "#00BFFF" },
                fontWeight: "bold",
              }}
            >
              {editId ? "Update Award" : "Add Award"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Awards;
