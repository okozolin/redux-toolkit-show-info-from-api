import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "../features/home/Home";
import Event from "../features/events/Event";
import CssBaseline from "@material-ui/core/CssBaseline";
import Artist from "../features/artist/Artist";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Verdana",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Home />
          <Switch>
            <Route path="/:artist/events/:id" component={Event} />
            <Route path="/" exact component={Artist} />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
