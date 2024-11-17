import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore, Menu as MenuIcon } from "@mui/icons-material";

const Sidebar = ({ setIsAuthenticated }) => {
  const [openDramas, setOpenDramas] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null); // State untuk posisi menu
  const navigate = useNavigate();

  // Fungsi untuk membuka/tutup menu
  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <>
      {/* Header dengan tombol menu dan logout */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          background: "#1976d2",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 15px", // Mengatur padding agar terlihat lebih rapi
          boxSizing: "border-box", // Pastikan elemen mengikuti aturan box-sizing
        }}
      >
        {/* Tombol Menu */}
        <IconButton
          onClick={handleMenuClick}
          style={{ color: "white" }}
          aria-controls="main-menu"
          aria-haspopup="true"
        >
          <MenuIcon />
        </IconButton>

        {/* Tombol Logout */}
        <Button
          onClick={handleLogout}
          style={{
            color: "white",
            border: "1px solid white",
            marginRight: "10px", // Tambahkan margin agar tidak terlalu mepet
          }}
        >
          Logout
        </Button>
      </div>

      {/* Dropdown Menu */}
      <Menu
        id="main-menu"
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          style: { width: "240px", background: "#1976d2", color: "white" },
        }}
      >
        <MenuItem
          onClick={() => setOpenDramas(!openDramas)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          Dramas
          {openDramas ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>
        <Collapse in={openDramas} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              component={Link}
              to="/admin/dramas/validate"
              onClick={handleMenuClose}
              style={{
                color: "white",
                paddingLeft: "30px", // Tambahkan padding kiri untuk indentasi
                fontSize: "0.9rem", // Ukuran font lebih kecil untuk submenu
              }}
            >
              <ListItemText primary="Validate" />
            </ListItem>
            <ListItem
              component={Link}
              to="/admin/dramas/input"
              onClick={handleMenuClose}
              style={{
                color: "white",
                paddingLeft: "30px", // Tambahkan padding kiri untuk indentasi
                fontSize: "0.9rem", // Ukuran font lebih kecil untuk submenu
              }}
            >
              <ListItemText primary="Input New Drama" />
            </ListItem>
          </List>
        </Collapse>

        <MenuItem
          component={Link}
          to="/admin/countries"
          onClick={handleMenuClose}
          style={{ color: "white" }}
        >
          Countries
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin/awards"
          onClick={handleMenuClose}
          style={{ color: "white" }}
        >
          Awards
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin/genres"
          onClick={handleMenuClose}
          style={{ color: "white" }}
        >
          Genres
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin/comments"
          onClick={handleMenuClose}
          style={{ color: "white" }}
        >
          Comments
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin/users"
          onClick={handleMenuClose}
          style={{ color: "white" }}
        >
          Users
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin/actors"
          onClick={handleMenuClose}
          style={{ color: "white" }}
        >
          Actors
        </MenuItem>
      </Menu>
    </>
  );
};

export default Sidebar;
