import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import axios from "axios";

const InputNewDrama = () => {
  const [dramaData, setDramaData] = useState({
    title: "",
    altTitle: "",
    year: "",
    country: "",
    synopsis: "",
    availability: "",
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
    // Fetch countries, genres, and actors from the server
    const fetchData = async () => {
      try {
        const countryResponse = await axios.get(
          "http://localhost:5000/api/countries"
        );
        const genreResponse = await axios.get(
          "http://localhost:5000/api/genres"
        );
        const actorResponse = await axios.get(
          "http://localhost:5000/api/actors"
        );

        setCountries(countryResponse.data);
        setGenres(genreResponse.data);
        setActors(actorResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "year" && !/^\d{0,4}$/.test(value)) return; // Only allow up to 4 digits
    if (name === "rating" && (value < 1 || value > 10)) return; // Only allow 1-10 for rating
    if (name === "duration" && !/^\d*$/.test(value)) return; // Only allow numbers for duration

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

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/dramas", {
        ...dramaData,
        rating: parseFloat(dramaData.rating),
        duration: parseInt(dramaData.duration),
      });
      alert("Drama successfully added!");
    } catch (error) {
      console.error("Error adding drama:", error);
      alert("Error adding drama.");
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh", color: "white" }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
      >
        Input New Drama
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          name="title"
          value={dramaData.title}
          onChange={handleInputChange}
          placeholder="Example: My Drama Title"
          {...textFieldStyles}
        />

        <TextField
          label="Alternative Title"
          variant="outlined"
          fullWidth
          name="altTitle"
          value={dramaData.altTitle}
          onChange={handleInputChange}
          placeholder="Example: Alternative Title"
          {...textFieldStyles}
        />

        <TextField
          label="Year"
          variant="outlined"
          fullWidth
          name="year"
          value={dramaData.year}
          onChange={handleInputChange}
          placeholder="Example: 2022"
          {...textFieldStyles}
        />

        {/* Dropdown for Country */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel sx={{ color: "#fff" }}>Country</InputLabel>
          <Select
            name="country"
            value={dramaData.country}
            onChange={handleInputChange}
            input={<OutlinedInput label="Country" />}
            sx={{ color: "white", backgroundColor: "#2c2c2c" }}
          >
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.name}>
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
          placeholder="Brief summary of the drama"
          {...textFieldStyles}
        />

        {/* Dropdown for Genres */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel sx={{ color: "#fff" }}>Genres</InputLabel>
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
            sx={{ color: "white", backgroundColor: "#2c2c2c" }}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                <Checkbox checked={dramaData.genres.includes(genre.id)} />
                <ListItemText primary={genre.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Dropdown for Actors */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel sx={{ color: "#fff" }}>Actors</InputLabel>
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
            sx={{ color: "white", backgroundColor: "#2c2c2c" }}
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
          placeholder="Example: https://trailerlink.com"
          {...textFieldStyles}
        />

        <TextField
          label="Award"
          variant="outlined"
          fullWidth
          name="award"
          value={dramaData.award}
          onChange={handleInputChange}
          placeholder="Example: Best Drama"
          {...textFieldStyles}
        />

        <TextField
          label="Poster URL"
          variant="outlined"
          fullWidth
          name="posterUrl"
          value={dramaData.posterUrl}
          onChange={handleInputChange}
          placeholder="Example: https://posterurl.com/poster.jpg"
          {...textFieldStyles}
        />

        <TextField
          label="Rating (1-10)"
          variant="outlined"
          fullWidth
          name="rating"
          value={dramaData.rating}
          onChange={handleInputChange}
          placeholder="Example: 8.5"
          {...textFieldStyles}
        />

        <TextField
          label="Duration (minutes)"
          variant="outlined"
          fullWidth
          name="duration"
          value={dramaData.duration}
          onChange={handleInputChange}
          placeholder="Example: 120"
          {...textFieldStyles}
        />

        <Button
          variant="contained"
          sx={styles.submitButton}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default InputNewDrama;

const styles = {
  submitButton: {
    bgcolor: "#1E90FF",
    fontWeight: "bold",
    "&:hover": { bgcolor: "#00BFFF" },
  },
};

const textFieldStyles = {
  InputLabelProps: { style: { color: "#fff" } },
  InputProps: { style: { color: "white", backgroundColor: "#2c2c2c" } },
};
