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
import axios from "../utils/axiosConfig";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1c1c1c",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState(null);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("/api/countries");
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleAddCountry = async () => {
    if (newCountry.trim() === "") return;

    try {
      await axios.post("/api/countries", {
        name: newCountry.toUpperCase(),
      });
      setNewCountry("");
      fetchCountries();
      handleCloseAddModal();
    } catch (error) {
      console.error("Error adding country:", error);
    }
  };

  const handleDeleteCountry = async () => {
    try {
      await axios.delete(`/api/countries/${selectedCountryId}`);
      fetchCountries();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting country:", error);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenDeleteModal = (id) => {
    setSelectedCountryId(id);
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Manage Countries
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          gap: 2,
          width: "80%",
          margin: "0 auto",
        }}
      >
        {/* Search Field di Kiri */}
        <TextField
          label="Search"
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            input: { color: "white" },
            label: { color: "#fff" },
            backgroundColor: "#2c2c2c",
            borderColor: "#00BFFF",
            width: "20%",
          }}
        />

        {/* Tombol untuk Membuka Modal */}
        <Button
          variant="contained"
          onClick={handleOpenAddModal}
          sx={{
            bgcolor: "#1E90FF",
            "&:hover": { bgcolor: "#00BFFF" },
            fontWeight: "bold",
            height: 56, // Menyesuaikan tinggi tombol dengan tinggi TextField
          }}
        >
          Add Country
        </Button>
      </Box>

      {/* Modal untuk Input Country */}
      <Modal open={openAddModal} onClose={handleCloseAddModal}>
        <Box sx={modalStyle}>
          <Typography
            variant="h6"
            sx={{ color: "white", textAlign: "center", mb: 2 }}
          >
            Tambahkan Country Baru
          </Typography>
          <TextField
            label="Country"
            variant="outlined"
            value={newCountry}
            onChange={(e) => setNewCountry(e.target.value)}
            fullWidth
            sx={{
              input: { color: "white" },
              label: { color: "#fff" },
              backgroundColor: "#2c2c2c",
              mb: 2,
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddCountry}
            fullWidth
            sx={{
              bgcolor: "#1E90FF",
              "&:hover": { bgcolor: "#00BFFF" },
              fontWeight: "bold",
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      {/* Modal untuk Konfirmasi Delete */}
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={modalStyle}>
          <Typography
            variant="h6"
            sx={{ color: "white", textAlign: "center", mb: 2 }}
          >
            Yakin Mau Hapus Country?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "white", textAlign: "center", mb: 3 }}
          >
            Semua data yang terkait dengan country ini juga akan dihapus.
          </Typography>
          <Button
            variant="contained"
            onClick={handleDeleteCountry}
            fullWidth
            sx={{
              bgcolor: "#FF5733",
              "&:hover": { bgcolor: "#FF4500" },
              fontWeight: "bold",
              mb: 1,
            }}
          >
            Ya, Hapus
          </Button>
          <Button
            variant="outlined"
            onClick={handleCloseDeleteModal}
            fullWidth
            sx={{
              color: "#fff",
              borderColor: "#00BFFF",
              "&:hover": { bgcolor: "#00BFFF" },
              fontWeight: "bold",
            }}
          >
            Batal
          </Button>
        </Box>
      </Modal>

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
            <TableCell
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
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {country.id}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {country.name}
              </TableCell>
              <TableCell
                sx={{
                  color: "#FF69B4",
                  bgcolor: "#2a2a2a",
                  fontSize: "1rem",
                }}
              >
                <Button
                  onClick={() => handleOpenDeleteModal(country.id)}
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

export default Countries;
