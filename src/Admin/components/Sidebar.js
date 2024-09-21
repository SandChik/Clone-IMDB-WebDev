import React, { useState } from "react";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const Sidebar = () => {
  const [openDramas, setOpenDramas] = useState(false);

  // Function to handle click for Dramas
  const handleClickDramas = () => {
    setOpenDramas(!openDramas);
  };

  return (
    <div style={{ width: "240px", background: "#1976d2", height: "100vh" }}>
      <List>
        {/* Dramas with sub-menu */}
        <ListItem button onClick={handleClickDramas}>
          <ListItemText primary="Dramas" style={{ color: "white" }} />
          {openDramas ? (
            <ExpandLess style={{ color: "white" }} />
          ) : (
            <ExpandMore style={{ color: "white" }} />
          )}
        </ListItem>

        {/* Sub-menu for Dramas */}
        <Collapse in={openDramas} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Dramas List Item */}
            <ListItem
              component={Link}
              to="/admin/dramas"
              style={{ paddingLeft: "20px" }}
            >
              <ListItemText primary="Dramas" style={{ color: "white" }} />
            </ListItem>
            {/* Validate List Item */}
            <ListItem
              component={Link}
              to="/admin/dramas/validate"
              style={{ paddingLeft: "20px" }}
            >
              <ListItemText primary="Validate" style={{ color: "white" }} />
            </ListItem>
            {/* Input New Drama List Item */}
            <ListItem
              component={Link}
              to="/admin/dramas/input"
              style={{ paddingLeft: "20px" }}
            >
              <ListItemText
                primary="Input New Drama"
                style={{ color: "white" }}
              />
            </ListItem>
          </List>
        </Collapse>

        {/* Other menu items */}
        <ListItem component={Link} to="/admin/countries">
          <ListItemText primary="Countries" style={{ color: "white" }} />
        </ListItem>
        <ListItem component={Link} to="/admin/awards">
          <ListItemText primary="Awards" style={{ color: "white" }} />
        </ListItem>
        <ListItem component={Link} to="/admin/genres">
          <ListItemText primary="Genres" style={{ color: "white" }} />
        </ListItem>
        <ListItem component={Link} to="/admin/comments">
          <ListItemText primary="Comments" style={{ color: "white" }} />
        </ListItem>
        <ListItem component={Link} to="/admin/users">
          <ListItemText primary="Users" style={{ color: "white" }} />
        </ListItem>
        <ListItem component={Link} to="/admin/actors">
          <ListItemText primary="Actors" style={{ color: "white" }} />
        </ListItem>
        <ListItem component={Link} to="/admin/logout">
          <ListItemText primary="Logout" style={{ color: "white" }} />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
