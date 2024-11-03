import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore, Menu as MenuIcon } from "@mui/icons-material";

const Sidebar = () => {
  const [openDramas, setOpenDramas] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(!collapsed);
  const handleMenuItemClick = () => !collapsed && toggleCollapse();

  const renderMenuItem = (title, path) => (
    <ListItem component={Link} to={path} onClick={handleMenuItemClick}>
      <Tooltip title={title} placement="right">
        <ListItemText
          primary={title}
          style={{ color: "white", display: collapsed ? "none" : "block" }}
        />
      </Tooltip>
    </ListItem>
  );

  return (
    <div
      style={{
        width: collapsed ? "60px" : "240px",
        transition: "width 0.3s ease",
        background: "#1976d2",
        minHeight: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: collapsed ? "60px" : "240px",
          background: "#1976d2",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          padding: "15px 0",
          transition: "all 0.3s ease",
        }}
      >
        <IconButton onClick={toggleCollapse} style={{ color: "white" }}>
          <MenuIcon
            style={{
              transform: collapsed ? "rotate(0deg)" : "rotate(90deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </IconButton>
      </div>

      <List style={{ width: "100%", marginTop: collapsed ? "50px" : "60px" }}>
        {!collapsed && (
          <>
            <ListItem button onClick={() => setOpenDramas(!openDramas)}>
              <Tooltip title="Dramas" placement="right">
                <ListItemText primary="Dramas" style={{ color: "white" }} />
              </Tooltip>
              {openDramas ? (
                <ExpandLess style={{ color: "white" }} />
              ) : (
                <ExpandMore style={{ color: "white" }} />
              )}
            </ListItem>
            <Collapse in={openDramas} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderMenuItem("Validate", "/admin/dramas/validate")}
                {renderMenuItem("Input New Drama", "/admin/dramas/input")}
              </List>
            </Collapse>
            {renderMenuItem("Countries", "/admin/countries")}
            {renderMenuItem("Awards", "/admin/awards")}
            {renderMenuItem("Genres", "/admin/genres")}
            {renderMenuItem("Comments", "/admin/comments")}
            {renderMenuItem("Users", "/admin/users")}
            {renderMenuItem("Actors", "/admin/actors")}
          </>
        )}
        {renderMenuItem("Logout", "/admin/logout")}
      </List>
    </div>
  );
};

export default Sidebar;
