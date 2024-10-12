import React, { useState } from "react";
import { Box, TextField, Button, Typography, Checkbox } from "@mui/material";
import axios from "axios";

const genresList = [
  "Action",
  "Adventures",
  "Romance",
  "Drama",
  "Slice of Life",
];

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
    photoUrl: "",
    rating: "",
    duration: "",
  });

  const handleInputChange = (e) => {
    setDramaData({ ...dramaData, [e.target.name]: e.target.value });
  };

  const handleGenreChange = (genre) => {
    setDramaData((prevState) => ({
      ...prevState,
      genres: prevState.genres.includes(genre)
        ? prevState.genres.filter((g) => g !== genre)
        : [...prevState.genres, genre],
    }));
  };

  const handleAddActor = (e) => {
    if (e.key === "Enter" && e.target.value && dramaData.actors.length < 9) {
      setDramaData((prevState) => ({
        ...prevState,
        actors: [...prevState.actors, e.target.value],
      }));
      e.target.value = "";
    }
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
      console.error(error);
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

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          {[
            "title",
            "altTitle",
            "year",
            "country",
            "synopsis",
            "availability",
            "posterUrl",
            "photoUrl",
            "rating",
            "duration",
            "linkTrailer",
            "award",
          ].map((field) => (
            <Box sx={{ mb: 2 }} key={field}>
              <TextField
                label={field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                variant="outlined"
                fullWidth
                name={field}
                value={dramaData[field]}
                onChange={handleInputChange}
                multiline={field === "synopsis"}
                rows={field === "synopsis" ? 4 : 1}
                {...textFieldStyles}
              />
            </Box>
          ))}

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Add Genres
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {genresList.map((genre) => (
                <Box key={genre} sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    checked={dramaData.genres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                    sx={{ color: "#00BFFF" }}
                  />
                  <Typography sx={{ color: "white" }}>{genre}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Add Actors (Up to 9)
            </Typography>
            <TextField
              label="Search Actor Names"
              variant="outlined"
              fullWidth
              onKeyDown={handleAddActor}
              {...textFieldStyles}
            />
            <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
              {dramaData.actors.map((actor, index) => (
                <Box key={index} sx={styles.actorBox}>
                  <Typography>{actor}</Typography>
                  <Button
                    sx={styles.removeButton}
                    onClick={() =>
                      setDramaData((prevState) => ({
                        ...prevState,
                        actors: prevState.actors.filter((a) => a !== actor),
                      }))
                    }
                  >
                    X
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>

          <Button
            variant="contained"
            sx={styles.submitButton}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default InputNewDrama;

const styles = {
  actorBox: {
    width: 55,
    height: 71,
    bgcolor: "#444",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    position: "relative",
  },
  removeButton: { position: "absolute", top: -5, right: -5, color: "#FF69B4" },
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
