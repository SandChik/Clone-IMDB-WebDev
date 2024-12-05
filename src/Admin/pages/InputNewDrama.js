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
    genres: [],
    actors: [],
    linkTrailer: "",
    posterUrl: "",
    rating: "",
    duration: "",
  });

  const [countries, setCountries] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch countries, genres, and actors from the server
    const fetchData = async () => {
      try {
        const countryResponse = await axios.get(
          "http://localhost:7001/api/countries"
        );
        const genreResponse = await axios.get(
          "http://localhost:7001/api/genres"
        );
        const actorResponse = await axios.get(
          "http://localhost:7001/api/actors"
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

  const validateFields = () => {
    const validationErrors = {};
    if (!dramaData.title.trim()) validationErrors.title = "Title is required.";
    if (!dramaData.year || isNaN(dramaData.year)) {
      validationErrors.year = "Year is required and must be a number.";
    } else if (parseInt(dramaData.year) > new Date().getFullYear()) {
      validationErrors.year = `Year cannot exceed ${new Date().getFullYear()}.`;
    }
    if (!dramaData.country) validationErrors.country = "Country is required.";
    if (!dramaData.synopsis.trim())
      validationErrors.synopsis = "Synopsis is required.";
    if (dramaData.genres.length === 0)
      validationErrors.genres = "At least one genre is required.";
    if (dramaData.actors.length === 0)
      validationErrors.actors = "At least one actor is required.";
    if (dramaData.genres.length > 10) {
      validationErrors.genres = "You can select up to 10 genres only.";
    }
    if (dramaData.actors.length > 10) {
      validationErrors.actors = "You can select up to 10 actors only.";
    }
    if (!dramaData.linkTrailer.trim())
      validationErrors.linkTrailer = "Trailer link is required.";
    if (!dramaData.posterUrl.trim())
      validationErrors.posterUrl = "Poster URL is required.";
    if (!dramaData.rating || isNaN(dramaData.rating))
      validationErrors.rating =
        "Rating is required and must be a number between 1 and 10.";
    else if (dramaData.rating < 1 || dramaData.rating > 10)
      validationErrors.rating = "Rating must be between 1 and 10.";
    if (!dramaData.duration || isNaN(dramaData.duration))
      validationErrors.duration = "Duration is required and must be a number.";

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return; // Jangan submit jika ada error validasi
    }

    try {
      await axios.post("http://localhost:7001/api/dramas", {
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
        {/* Title */}
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          name="title"
          value={dramaData.title}
          onChange={handleInputChange}
          placeholder="Example: My Drama Title"
          error={!!errors.title}
          helperText={errors.title}
          {...textFieldStyles}
        />

        {/* Alternative Title */}
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

        {/* Year */}
        <TextField
          label="Year"
          variant="outlined"
          fullWidth
          name="year"
          value={dramaData.year}
          onChange={handleInputChange}
          placeholder="Example: 2022"
          error={!!errors.year}
          helperText={errors.year}
          {...textFieldStyles}
        />

        {/* Country */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel sx={{ color: "#fff" }}>Country</InputLabel>
          <Select
            name="country"
            value={dramaData.country}
            onChange={handleInputChange}
            input={<OutlinedInput label="Country" />}
            error={!!errors.country}
            sx={{ color: "white", backgroundColor: "#2c2c2c" }}
          >
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
          {errors.country && (
            <Typography variant="caption" color="error">
              {errors.country}
            </Typography>
          )}
        </FormControl>

        {/* Synopsis */}
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
          error={!!errors.synopsis}
          helperText={errors.synopsis}
          {...textFieldStyles}
        />

        {/* Genres */}
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
            error={!!errors.genres}
            sx={{ color: "white", backgroundColor: "#2c2c2c" }}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                <Checkbox checked={dramaData.genres.includes(genre.id)} />
                <ListItemText primary={genre.name} />
              </MenuItem>
            ))}
          </Select>
          {errors.genres && (
            <Typography variant="caption" color="error">
              {errors.genres}
            </Typography>
          )}
        </FormControl>

        {/* Actors */}
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
            error={!!errors.actors}
            sx={{ color: "white", backgroundColor: "#2c2c2c" }}
          >
            {actors.map((actor) => (
              <MenuItem key={actor.id} value={actor.id}>
                <Checkbox checked={dramaData.actors.includes(actor.id)} />
                <ListItemText primary={actor.name} />
              </MenuItem>
            ))}
          </Select>
          {errors.actors && (
            <Typography variant="caption" color="error">
              {errors.actors}
            </Typography>
          )}
        </FormControl>

        {/* Trailer Link */}
        <TextField
          label="Trailer Link"
          variant="outlined"
          fullWidth
          name="linkTrailer"
          value={dramaData.linkTrailer}
          onChange={handleInputChange}
          placeholder="Example: https://trailerlink.com"
          error={!!errors.linkTrailer}
          helperText={errors.linkTrailer}
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

        {/* Poster URL */}
        <TextField
          label="Poster URL"
          variant="outlined"
          fullWidth
          name="posterUrl"
          value={dramaData.posterUrl}
          onChange={handleInputChange}
          placeholder="Example: https://posterurl.com/poster.jpg"
          error={!!errors.posterUrl}
          helperText={errors.posterUrl}
          {...textFieldStyles}
        />

        {/* Rating */}
        <TextField
          label="Rating (1-10)"
          variant="outlined"
          fullWidth
          name="rating"
          value={dramaData.rating}
          onChange={handleInputChange}
          placeholder="Example: 8.5"
          error={!!errors.rating}
          helperText={errors.rating}
          {...textFieldStyles}
        />

        {/* Duration */}
        <TextField
          label="Duration (minutes)"
          variant="outlined"
          fullWidth
          name="duration"
          value={dramaData.duration}
          onChange={handleInputChange}
          placeholder="Example: 120"
          error={!!errors.duration}
          helperText={errors.duration}
          {...textFieldStyles}
        />

        {/* Submit Button */}
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
