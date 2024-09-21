import React, { useState } from "react";
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
} from "@mui/material";

const Comments = () => {
  const [filter, setFilter] = useState("None");
  const [showCount, setShowCount] = useState(10);
  const comments = [
    {
      id: 1,
      username: "Nara",
      rate: 5,
      drama: "[2024] Japan - Eye Love You",
      comment:
        "I love this drama. It taught me a lot about money and finance. Love is not everything. We need to face the reality too. Being stoic is the best.",
      status: "Unapproved",
    },
    {
      id: 2,
      username: "Luffy",
      rate: 2,
      drama: "[2024] Japan - Eye Love You",
      comment: "Meh",
      status: "Approved",
    },
  ];

  const [selectedComments, setSelectedComments] = useState([]);
  const handleSelectAll = (e) =>
    setSelectedComments(e.target.checked ? comments.map((c) => c.id) : []);

  const handleSelectComment = (id) =>
    setSelectedComments((prev) =>
      prev.includes(id)
        ? prev.filter((commentId) => commentId !== id)
        : [...prev, id]
    );

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Manage Comments
      </Typography>

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
            {["", "Username", "Rate", "Drama", "Comments", "Status"].map(
              (head) => (
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
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.map((comment) => (
            <TableRow key={comment.id}>
              <TableCell
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                <Checkbox
                  checked={selectedComments.includes(comment.id)}
                  onChange={() => handleSelectComment(comment.id)}
                  sx={{ color: "#fff" }}
                />
              </TableCell>
              <TableCell
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {comment.username}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {"★".repeat(comment.rate)}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {comment.drama}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {comment.comment}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", bgcolor: "#2a2a2a", fontSize: "1rem" }}
              >
                {comment.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Actions for selected comments */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          sx={{ bgcolor: "#FF4500", "&:hover": { bgcolor: "#FF6347" }, mr: 2 }}
        >
          Approve
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "#DC143C", "&:hover": { bgcolor: "#FF4500" } }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default Comments;
