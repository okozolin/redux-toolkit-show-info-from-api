import { HashRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import store from "./store";

import Home from "../features/home/Home";
import Clear from "../features/home/Clear";
import Event from "../features/events/Event";
import Artist from "../features/artist/Artist";
import { theme } from "./theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Home />
          <Switch>
            <Route path="/:artist/events/:id" exact>
              <Event />
            </Route>
            <Route path="/:artist" exact>
              <Artist />
            </Route>
            <Route path="/" exact>
              <Clear />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
