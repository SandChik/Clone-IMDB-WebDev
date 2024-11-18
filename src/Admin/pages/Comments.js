import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Typography,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import axios from "../utils/axiosConfig";

const Comments = () => {
  const [filter, setFilter] = useState("None");
  const [showCount, setShowCount] = useState(10);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComments, setSelectedComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get("/api/reviews");
      const fetchedComments = response.data.map((review) => ({
        id: review.id,
        username: review.user.username,
        author: review.author, // Tambahkan properti author di sini
        rate: review.rating / 2,
        drama: `[${review.drama.year}] ${review.drama.country} - ${review.drama.title}`,
        comment: review.content,
        status: review.status ? "Approved" : "Unapproved",
      }));
      setComments(fetchedComments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchComments();
  }, []);

  const handleSelectAll = (e) =>
    setSelectedComments(e.target.checked ? comments.map((c) => c.id) : []);

  const handleSelectComment = (id) =>
    setSelectedComments((prev) =>
      prev.includes(id)
        ? prev.filter((commentId) => commentId !== id)
        : [...prev, id]
    );

  const handleApprove = async () => {
    try {
      await axios.put("/api/reviews/approve", {
        ids: selectedComments,
      });
      fetchComments();
      setSelectedComments([]);
    } catch (error) {
      console.error("Error approving comments:", error);
    }
  };

  const handleUnapprove = async () => {
    try {
      await axios.put("/api/reviews/unapprove", {
        ids: selectedComments,
      });
      fetchComments();
      setSelectedComments([]);
    } catch (error) {
      console.error("Error unapproving comments:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete selected comments?")) {
      try {
        await axios.delete("/api/reviews", {
          data: { ids: selectedComments },
        });
        fetchComments();
        setSelectedComments([]);
      } catch (error) {
        console.error("Error deleting comments:", error);
      }
    }
  };


  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Manage Comments
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <>
          {/* Filter and Show Controls */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 3,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography sx={{ color: "white" }}>Filtered by:</Typography>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{ color: "white", bgcolor: "#2c2c2c", width: 150 }}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Unapproved">Unapproved</MenuItem>
            </Select>
            <Typography sx={{ color: "white" }}>Shows</Typography>
            <Select
              value={showCount}
              onChange={(e) => setShowCount(e.target.value)}
              sx={{ color: "white", bgcolor: "#2c2c2c", width: 100 }}
            >
              {[5, 10, 15].map((count) => (
                <MenuItem key={count} value={count}>
                  {count}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Comments Table */}
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
                {[
                  "",
                  "Username",
                  "Author",
                  "Rate",
                  "Drama",
                  "Comments",
                  "Status",
                ].map((head) => (
                  <TableCell
                    key={head}
                    align={head === "" ? "left" : "left"}
                    sx={{
                      color: "#fff",
                      bgcolor: "#1E90FF",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    {head === "" ? (
                      <Checkbox
                        onChange={handleSelectAll}
                        checked={selectedComments.length === comments.length}
                        sx={{ color: "#fff" }}
                      />
                    ) : (
                      head
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {comments
                .filter((comment) =>
                  filter === "None" ? true : comment.status === filter
                )
                .slice(0, showCount)
                .map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                      <Checkbox
                        checked={selectedComments.includes(comment.id)}
                        onChange={() => handleSelectComment(comment.id)}
                        sx={{ color: "#fff" }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                      {comment.username}
                    </TableCell>
                    <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                      {comment.author}
                    </TableCell>
                    <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                      {comment.rate} / 5
                    </TableCell>
                    <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                      {comment.drama}
                    </TableCell>
                    <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                      {comment.comment}
                    </TableCell>
                    <TableCell sx={{ color: "#fff", bgcolor: "#2a2a2a" }}>
                      {comment.status}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleApprove}
              sx={{
                bgcolor: "#1976d2",
                "&:hover": { bgcolor: "#DC143C" },
                mr: 2,
              }}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              onClick={handleUnapprove}
              sx={{
                bgcolor: "#1976d2",
                "&:hover": { bgcolor: "#DC143C" },
                mr: 2,
              }}
            >
              Unapprove
            </Button>
            <Button
              variant="contained"
              onClick={handleDelete}
              sx={{ bgcolor: "#DC143C", "&:hover": { bgcolor: "#FF4500" } }}
            >
              Delete
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Comments;
