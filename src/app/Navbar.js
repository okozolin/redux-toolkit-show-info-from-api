import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  Button,
  Drawer,
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";
import NavLinkWrapper from "../components/NavLinkWrapper";
import Favorites from "../features/favorites/Favorites";

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
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },

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
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  return (
    <>
      <Typography component="div">
        <Box
          my={2}
          p={2}
          fontFamily="Verdana, sans-serif"
          borderRadius={30}
          border="5px solid #ef3172"
        >
          <Box
            m={4}
            display="flex"
            justifyContent="center"
            fontSize={48}
            fontWeight="bold"
          >
            Artist and Bands events info
          </Box>
          <Toolbar>
            <Button
              className={classes.tab}
              startIcon={<HomeIcon />}
              component={NavLinkWrapper}
              to="/"
            >
              Home
            </Button>
            <Button
              className={classes.tab2}
              onClick={handleDrawerOpen}
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
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
            Favorite events
          </div>
          <Divider />

          <Favorites />

          {/* <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
        </Drawer>
      </Typography>
    </>
  );
};

export default Navbar;
