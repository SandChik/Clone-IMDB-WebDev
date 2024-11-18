// EditDramaModal.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
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
  maxWidth: 900,
  width: "90%",
  borderRadius: "8px",
  maxHeight: "90vh",
  overflowY: "auto",
};

const EditDramaModal = ({ open, handleClose, drama, refreshData }) => {
  const [dramaData, setDramaData] = useState({
    title: "",
    altTitle: "",
    year: "",
    countryId: "", // Menggunakan countryId daripada name
    synopsis: "",
    genres: [],
    actors: [],
    linkTrailer: "",
    award: "",
    posterUrl: "",
    rating: "",
    duration: "",
  });

  const [countries, setCountries] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    if (drama) {
      setDramaData({
        title: drama.title,
        altTitle: drama.alternativeTitle || "",
        year: drama.year || "",
        countryId: drama.country?.id || "", // Set countryId jika ada
        synopsis: drama.synopsis || "",
        genres: drama.genres.map((g) => g.genre.id) || [],
        actors: drama.actors.map((a) => a.actor.id) || [],
        linkTrailer: drama.linkTrailer || "",
        award: drama.awards.map((award) => award.name).join(", ") || "",
        posterUrl: drama.posterUrl || "",
        rating: drama.rating || "",
        duration: drama.duration || "",
      });
    }

    const fetchData = async () => {
      try {
        const [countryResponse, genreResponse, actorResponse] =
          await Promise.all([
            axios.get("/api/countries"),
            axios.get("/api/genres"),
            axios.get("/api/actors"),
          ]);
        setCountries(countryResponse.data);
        setGenres(genreResponse.data);
        setActors(actorResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [drama]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDramaData({ ...dramaData, [name]: value });
  };

  const handleGenreChange = (event) => {
    const {
      target: { value },
    } = event;
    setDramaData({
      ...dramaData,
      genres: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleActorChange = (event) => {
    const {
      target: { value },
    } = event;
    setDramaData({
      ...dramaData,
      actors: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`/api/dramas/${drama.id}`, { ...dramaData });
      alert("Drama updated successfully!");
      handleClose();
      refreshData();
    } catch (error) {
      console.error("Error updating drama:", error);
      alert("Error updating drama.");
    }
  };


  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography
          variant="h5"
          sx={{ color: "#4da8da", textAlign: "center", mb: 3 }}
        >
          Edit Drama
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            name="title"
            value={dramaData.title}
            onChange={handleInputChange}
            sx={{ input: { color: "#e0e0e0" }, label: { color: "#4da8da" } }}
          />

          <TextField
            label="Alternative Title"
            variant="outlined"
            fullWidth
            name="altTitle"
            value={dramaData.altTitle}
            onChange={handleInputChange}
            sx={{ input: { color: "#e0e0e0" }, label: { color: "#4da8da" } }}
          />

          <TextField
            label="Year"
            variant="outlined"
            fullWidth
            name="year"
            value={dramaData.year}
            onChange={handleInputChange}
            sx={{ input: { color: "#e0e0e0" }, label: { color: "#4da8da" } }}
          />

          <FormControl fullWidth>
            <InputLabel sx={{ color: "#4da8da" }}>Country</InputLabel>
            <Select
              name="countryId"
              value={dramaData.countryId} // Menggunakan countryId daripada name
              onChange={handleInputChange}
              input={<OutlinedInput label="Country" />}
              sx={{ color: "#e0e0e0" }}
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Synopsis"
            variant="outlined"
            fullWidth
            name="synopsis"
            multiline
            rows={4}
            value={dramaData.synopsis}
            onChange={handleInputChange}
            sx={{ textarea: { color: "#e0e0e0" }, label: { color: "#4da8da" } }}
          />

          <FormControl fullWidth>
            <InputLabel sx={{ color: "#4da8da" }}>Genres</InputLabel>
            <Select
              multiple
              value={dramaData.genres}
              onChange={handleGenreChange}
              input={<OutlinedInput label="Genres" />}
              renderValue={(selected) =>
                selected
                  .map((id) => genres.find((g) => g.id === id)?.name)
                  .join(", ")
              }
              sx={{ color: "#e0e0e0" }}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  <Checkbox checked={dramaData.genres.includes(genre.id)} />
                  <ListItemText primary={genre.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel sx={{ color: "#4da8da" }}>Actors</InputLabel>
            <Select
              multiple
              value={dramaData.actors}
              onChange={handleActorChange}
              input={<OutlinedInput label="Actors" />}
              renderValue={(selected) =>
                selected
                  .map((id) => actors.find((a) => a.id === id)?.name)
                  .join(", ")
              }
              sx={{ color: "#e0e0e0" }}
            >
              {actors.map((actor) => (
                <MenuItem key={actor.id} value={actor.id}>
                  <Checkbox checked={dramaData.actors.includes(actor.id)} />
                  <ListItemText primary={actor.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Trailer Link"
            variant="outlined"
            fullWidth
            name="linkTrailer"
            value={dramaData.linkTrailer}
            onChange={handleInputChange}
            sx={{ input: { color: "#e0e0e0" }, label: { color: "#4da8da" } }}
          />

          <TextField
            label="Award"
            variant="outlined"
            fullWidth
            name="award"
            value={dramaData.award}
            onChange={handleInputChange}
            sx={{ input: { color: "#e0e0e0" }, label: { color: "#4da8da" } }}
          />

          <TextField
            label="Poster URL"
            variant="outlined"
            fullWidth
            name="posterUrl"
            value={dramaData.posterUrl}
            onChange={handleInputChange}
            sx={{ input: { color: "#e0e0e0" }, label: { color: "#4da8da" } }}
          />

          <TextField
            label="Rating (1-10)"
            variant="outlined"
            fullWidth
            name="rating"
            value={dramaData.rating}
            onChange={handleInputChange}
            sx={{ input: { color: "#e0e0e0" }, label: { color: "#4da8da" } }}
          />

          <TextField
            label="Duration (minutes)"
            variant="outlined"
            fullWidth
            name="duration"
            value={dramaData.duration}
            onChange={handleInputChange}
            sx={{ input: { color: "#e0e0e0" }, label: { color: "#4da8da" } }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            sx={{
              backgroundColor: "#4da8da",
              "&:hover": { backgroundColor: "#007bb5" },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditDramaModal;
