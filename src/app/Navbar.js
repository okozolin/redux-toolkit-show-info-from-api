import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  Button,
  Drawer,
  Toolbar,
  IconButton,
  Divider,
} from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HomeIcon from "@material-ui/icons/Home";
import { NavLink } from "react-router-dom";

import Favorites from "../features/favorites/Favorites";
import FaceIcon from "@material-ui/icons/Face";

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontFamily: "'Verdana', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
    background:
      "linear-gradient(to right,rgba(34,25,99,1) 0,rgba(206,40,93,1) 100%)",
  },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  //   transition: theme.transitions.create("margin", {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   marginRight: -drawerWidth,
  // },
  // contentShift: {
  //   transition: theme.transitions.create("margin", {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  //   marginRight: 0,
  // },

  tab: {
    padding: "17px 8px",
    marginRight: "10px",
    width: "180px",
    color: "white",
    fontWeight: "bold",
    borderRadius: "30px 30px 0 0 ",
    background:
      "linear-gradient(to right,rgba(51,153,204,1) 0,rgba(59,201,205,1) 100%)",
    "&:hover": {
      background:
        "linear-gradient(to right,rgba(34,25,99,1) 0,rgba(206,40,93,1) 100%)",
    },
  },
  tab2: {
    padding: "17px 8px",
    marginRight: "10px",
    width: "180px",
    color: "white",
    fontWeight: "bold",
    borderRadius: "30px 30px 0 0 ",
    background:
      "linear-gradient(to right,rgba(34,25,99,1) 0,rgba(206,40,93,1) 100%)",
    "&:hover": {
      background:
        "linear-gradient(to right,rgba(59,201,205,1) 0,rgba(51,153,204,1) 100%)",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box fontFamily="Verdana, sans-serif">
        <Toolbar>
          <Button
            className={classes.tab}
            startIcon={<HomeIcon />}
            component={NavLink}
            to="/"
          >
            Home
          </Button>
          <Button
            className={classes.tab2}
            onClick={handleDrawerToggle}
            startIcon={<StarsIcon />}
          >
            Favorites
          </Button>
        </Toolbar>
      </Box>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box className={classes.drawerHeader}>
          <IconButton color="secondary" onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
          Favorite events
        </Box>
        <Divider />
        <Favorites />
      </Drawer>
    </>
  );
};

export default Navbar;
