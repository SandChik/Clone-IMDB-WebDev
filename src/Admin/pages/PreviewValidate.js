import React from "react";
import { Box, Typography, Modal, Button, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

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

const PreviewValidate = ({ open, handleClose, drama, onApprove }) => {
  const handleApprove = async () => {
    await onApprove(drama.id);
    handleClose();
  };

  // Fungsi untuk mengkonversi link YouTube ke format embed
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          mb={3}
          sx={{ color: "#4da8da" }}
        >
          Drama Preview
        </Typography>

        {/* Poster dan Trailer */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Box display="flex" justifyContent="center" mb={2}>
            <img
              src={drama.posterUrl || "https://via.placeholder.com/300x450"}
              alt="Poster"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
            sx={{ color: "#4da8da" }}
          >
            Trailer
          </Typography>
          <Box display="flex" justifyContent="center" mb={3}>
            {drama.linkTrailer ? (
              <iframe
                width="100%"
                height="300"
                src={getEmbedUrl(drama.linkTrailer)}
                title="Drama Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: "8px", backgroundColor: "#000" }}
              ></iframe>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Trailer tidak tersedia
              </Typography>
            )}
          </Box>
        </Box>

        {/* Aktor */}
        <Box mb={3} mt={2}>
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            sx={{ color: "#4da8da" }}
          >
            Actors
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap={2}
            sx={{ maxWidth: "100%" }}
          >
            {drama.actors.map((actorObj) => (
              <Box
                key={actorObj.actor.id}
                textAlign="center"
                sx={{ width: "80px" }}
              >
                <img
                  src={
                    actorObj.actor.urlPhoto ||
                    "https://via.placeholder.com/80x120"
                  }
                  alt={actorObj.actor.name}
                  style={{
                    width: "80px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginBottom: "5px",
                  }}
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{
                    maxWidth: "80px",
                    wordWrap: "break-word",
                    fontSize: "0.75rem",
                    lineHeight: "1.1",
                    color: "#e0e0e0",
                  }}
                >
                  {actorObj.actor.name.length > 10
                    ? `${actorObj.actor.name.substring(0, 10)}...`
                    : actorObj.actor.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Detail Drama */}
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#ffffff" }}
        >
          {drama.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#ffffff" }} gutterBottom>
          <strong>Alternative Title:</strong> {drama.alternativeTitle || "-"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#ffffff" }} gutterBottom>
          <strong>Year:</strong> {drama.year}
        </Typography>
        <Typography variant="body2" sx={{ color: "#ffffff" }} paragraph>
          <strong>Synopsis:</strong> {drama.synopsis}
        </Typography>
        <Typography variant="body2" sx={{ color: "#ffffff" }} gutterBottom>
          <strong>Rating:</strong> {drama.rating || "N/A"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#ffffff" }} gutterBottom>
          <strong>Genres:</strong>{" "}
          {drama.genres.map((g) => g.genre.name).join(", ") || "N/A"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#ffffff" }} gutterBottom>
          <strong>Country:</strong> {drama.country?.name || "N/A"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#ffffff" }} gutterBottom>
          <strong>Awards:</strong>{" "}
          {drama.awards.map((award) => award.name).join(", ") || "N/A"}
        </Typography>

        {/* Tombol Approve/Unapprove dan Close */}
        <Grid container spacing={2} mt={3} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color={drama.status === 1 ? "error" : "success"}
              startIcon={<CheckCircleIcon />}
              onClick={handleApprove}
              sx={{
                backgroundColor: drama.status === 1 ? "#ff4d4d" : "#4da8da",
                "&:hover": {
                  backgroundColor: drama.status === 1 ? "#ff6666" : "#4da8d9",
                },
              }}
            >
              {drama.status === 1 ? "Unapprove" : "Approve"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleClose}
              startIcon={<CloseIcon />}
              color="inherit"
              sx={{
                color: "#4da8da",
                "&:hover": {
                  color: "#ff4d4d",
                },
              }}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default PreviewValidate;
