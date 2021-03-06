import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  Button,
  Drawer,
  Toolbar,
  IconButton,
  Divider,
  Badge,
} from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HomeIcon from "@material-ui/icons/Home";
import { NavLink } from "react-router-dom";

import Favorites from "../features/favorites/Favorites";
import { selectTotalFavorites } from "../features/favorites/favoritesSlice";
import { DRAWER_WIDTH } from "../constants";
import { DrawerContext } from "./context";
import { searchCleared } from "../features/home/searchSlice";
import { initEvents } from "../features/events/eventsSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontFamily: "'Verdana', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
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
  tabButton: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      borderRadius: "30px",
    },
    padding: "17px 8px",
    marginRight: "10px",
    width: "180px",
    color: "white",
    fontWeight: "bold",
    borderRadius: "30px 0 30px 0 ",
  },
  tabHome: {
    background:
      "linear-gradient(to right,rgba(51,153,204,1) 0,rgba(59,201,205,1) 100%)",
    "&:hover": {
      background:
        "linear-gradient(to right,rgba(34,25,99,1) 0,rgba(206,40,93,1) 100%)",
    },
  },
  tabFavorites: {
    background:
      "linear-gradient(to right,rgba(34,25,99,1) 0,rgba(206,40,93,1) 100%)",
    "&:hover": {
      background:
        "linear-gradient(to right,rgba(59,201,205,1) 0,rgba(51,153,204,1) 100%)",
    },
  },
  mobileButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    color: "#ce285d",
  },
  badgeDesktop: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const totalFavorites = useSelector(selectTotalFavorites);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleClick = () => {
    dispatch(searchCleared());
    dispatch(initEvents());
  };

  return (
    <>
      <Toolbar disableGutters>
        <Box flexGrow={1} />
        <Button
          onClick={handleClick}
          className={`${classes.tabButton} ${classes.tabHome}`}
          startIcon={<HomeIcon />}
          component={NavLink}
          to="/"
        >
          Home
        </Button>
        <IconButton
          onClick={handleClick}
          color="inherit"
          aria-label="Home"
          edge="start"
          component={NavLink}
          to="/"
          className={classes.mobileButton}
        >
          <HomeIcon fontSize="large" />
        </IconButton>
        <Badge
          badgeContent={totalFavorites}
          color="primary"
          overlap="circle"
          classes={{ root: classes.badgeDesktop }}
        >
          <Button
            className={`${classes.tabButton} ${classes.tabFavorites}`}
            onClick={handleDrawerToggle}
            startIcon={<StarsIcon />}
          >
            Favorites
          </Button>
        </Badge>

        <IconButton
          color="inherit"
          aria-label="Favorites"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.mobileButton}
        >
          <Badge badgeContent={totalFavorites} color="primary">
            <StarsIcon fontSize="large" />
          </Badge>
        </IconButton>
      </Toolbar>

      <Drawer
        square="true"
        variant="persistent"
        anchor="right"
        open={open}
        className={classes.drawer}
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
        <DrawerContext.Provider value={{ open, setOpen }}>
          <Favorites />
        </DrawerContext.Provider>
      </Drawer>
    </>
  );
};

export default Navbar;
