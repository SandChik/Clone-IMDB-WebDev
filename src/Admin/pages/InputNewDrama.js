import React, { useState } from "react";
import { Box, TextField, Button, Typography, Checkbox } from "@mui/material";
import { useDropzone } from "react-dropzone";

const InputNewDrama = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [actors, setActors] = useState([]);

  const genres = ["Action", "Adventures", "Romance", "Drama", "Slice of Life"];

  // Dropzone logic
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setSelectedFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  const handleAddActor = (actorName) => {
    if (actors.length < 9) {
      setActors((prevActors) => [...prevActors, actorName]);
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
        <Box
          {...getRootProps()}
          sx={{
            width: "150px",
            height: "200px",
            border: "2px dashed #00BFFF",
            borderRadius: "5px",
            bgcolor: "#2c2c2c",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            color: "white",
          }}
        >
          <input {...getInputProps()} />
          {selectedFile ? (
            <img
              src={selectedFile.preview}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Typography>Upload Poster</Typography>
          )}
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{
                style: { color: "white", backgroundColor: "#2c2c2c" },
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Alternative Title"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{
                style: { color: "white", backgroundColor: "#2c2c2c" },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="Year"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{
                style: { color: "white", backgroundColor: "#2c2c2c" },
              }}
            />
            <TextField
              label="Country"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{
                style: { color: "white", backgroundColor: "#2c2c2c" },
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Synopsis"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{
                style: { color: "white", backgroundColor: "#2c2c2c" },
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Availability"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{
                style: { color: "white", backgroundColor: "#2c2c2c" },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Genre Selection */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Add Genres
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {genres.map((genre) => (
            <Box key={genre} sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
                sx={{ color: "#00BFFF" }}
              />
              <Typography sx={{ color: "white" }}>{genre}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Actor Input */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Add Actors (Up to 9)
        </Typography>
        <TextField
          label="Search Actor Names"
          variant="outlined"
          fullWidth
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "white", backgroundColor: "#2c2c2c" } }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value && actors.length < 9) {
              handleAddActor(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
          {actors.map((actor, index) => (
            <Box
              key={index}
              sx={{
                width: 55,
                height: 71,
                bgcolor: "#444",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                position: "relative",
              }}
            >
              <Typography>{actor}</Typography>
              <Button
                sx={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  color: "#FF69B4",
                }}
                onClick={() => setActors(actors.filter((a) => a !== actor))}
              >
                X
              </Button>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Additional Information */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Link Trailer"
          variant="outlined"
          fullWidth
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "white", backgroundColor: "#2c2c2c" } }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Award"
          variant="outlined"
          fullWidth
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "white", backgroundColor: "#2c2c2c" } }}
        />
      </Box>

      {/* Submit Button */}
      <Button
        variant="contained"
        sx={{
          bgcolor: "#1E90FF",
          fontWeight: "bold",
          "&:hover": { bgcolor: "#00BFFF" },
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default InputNewDrama;
