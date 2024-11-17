// ValidateDramas.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import PreviewValidate from "./PreviewValidate";
import EditDramaModal from "./EditDramaModal";

const ValidateDramas = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [shows, setShows] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [dramaData, setDramaData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedDrama, setSelectedDrama] = useState(null);

  const fetchDramas = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dramas");
      const data = await response.json();
      setDramaData(data.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error("Error fetching dramas:", error);
    }
  };

  useEffect(() => {
    fetchDramas();
  }, []);

  const handleStatusFilterChange = (event) =>
    setStatusFilter(event.target.value);
  const handleShowsChange = (event) => setShows(event.target.value);
  const handleSearchChange = (event) =>
    setSearchTerm(event.target.value.toLowerCase());

  const filteredDramaData = dramaData
    .filter(
      (drama) =>
        statusFilter === "All" || drama.status === parseInt(statusFilter, 10)
    )
    .filter(
      (drama) =>
        drama.title.toLowerCase().includes(searchTerm) ||
        drama.actors.some((actorObj) =>
          actorObj.actor.name.toLowerCase().includes(searchTerm)
        )
    );

  const handleOpenModal = (drama) => {
    setSelectedDrama(drama);
    setOpenModal(true);
  };

  const handleOpenEditModal = (drama) => {
    setSelectedDrama(drama);
    setOpenEditModal(true);
  };

  const handleToggleApproval = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      const response = await fetch(
        `http://localhost:5000/api/dramas/${id}/approve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (response.ok) {
        fetchDramas(); // Refresh data after update
        setOpenModal(false); // Close modal after approval/unapproval
      } else {
        console.error("Failed to update approval status");
      }
    } catch (error) {
      console.error("Error approving/unapproving drama:", error);
    }
  };

  const handleDeleteDrama = async (id) => {
    await fetch(`http://localhost:5000/api/dramas/${id}`, { method: "DELETE" });
    fetchDramas();
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Validate Dramas
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel sx={{ color: "#fff" }}>Filtered by:</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              sx={{ color: "#fff", bgcolor: "#1c1c1c" }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value={1}>Approved</MenuItem>
              <MenuItem value={0}>Unapproved</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Search"
            variant="outlined"
            onChange={handleSearchChange}
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{ bgcolor: "#1c1c1c", input: { color: "#fff" } }}
          />
        </Box>

        <FormControl sx={{ minWidth: 80 }}>
          <InputLabel sx={{ color: "#fff" }}>Shows</InputLabel>
          <Select
            value={shows}
            onChange={handleShowsChange}
            sx={{ color: "#fff", bgcolor: "#1c1c1c" }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Table
        sx={{
          bgcolor: "#1c1c1c",
          borderRadius: "10px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <TableHead>
          <TableRow>
            {[
              "ID",
              "Drama",
              "Actors",
              "Genres",
              "Country",
              "Awards",
              "Synopsis",
              "Poster",
              "Status",
              "Action",
            ].map((header) => (
              <TableCell
                key={header}
                sx={{ color: "#fff", bgcolor: "#1E90FF", fontWeight: "bold" }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredDramaData
            .slice(0, shows === "All" ? filteredDramaData.length : shows)
            .map((drama) => (
              <TableRow key={drama.id}>
                <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                  {drama.id}
                </TableCell>
                <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                  {drama.title}
                </TableCell>
                <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                  {drama.actors
                    .map((actorObj) => actorObj.actor.name)
                    .join(", ")}
                </TableCell>
                <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                  {drama.genres
                    .map((genreObj) => genreObj.genre.name)
                    .join(", ")}
                </TableCell>
                <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                  {drama.country?.name || "N/A"}
                </TableCell>
                <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                  {drama.awards.map((award) => award.name).join(", ") || "N/A"}
                </TableCell>
                <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                  {drama.synopsis}
                </TableCell>
                <TableCell sx={{ bgcolor: "#2a2a2a" }}>
                  <img
                    src={
                      drama.posterUrl || "https://via.placeholder.com/100x150"
                    }
                    alt="Poster"
                    style={{
                      width: "100px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: "#FF69B4", bgcolor: "#2a2a2a" }}>
                  <Button
                    onClick={() => handleOpenModal(drama)}
                    sx={{ color: "#FF69B4", textTransform: "none" }}
                  >
                    {drama.status === 1 ? "Approved" : "Unapproved"}
                  </Button>
                </TableCell>
                <TableCell sx={{ color: "#FF69B4", bgcolor: "#2a2a2a" }}>
                  <Button
                    sx={{ color: "#FF69B4" }}
                    onClick={() => handleOpenEditModal(drama)}
                  >
                    Edit
                  </Button>{" "}
                  |{" "}
                  <Button
                    sx={{ color: "#FF69B4" }}
                    onClick={() => handleDeleteDrama(drama.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {selectedDrama && (
        <EditDramaModal
          open={openEditModal}
          handleClose={() => setOpenEditModal(false)}
          drama={selectedDrama}
          refreshData={fetchDramas}
        />
      )}

      {selectedDrama && (
        <PreviewValidate
          open={openModal}
          handleClose={() => setOpenModal(false)}
          drama={selectedDrama}
          onApprove={() =>
            handleToggleApproval(selectedDrama.id, selectedDrama.status)
          }
        />
      )}
    </Box>
  );
};

export default ValidateDramas;
