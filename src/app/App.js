import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "../features/home/Home";
import Event from "../features/events/Event";
import Navbar from "./Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Artist from "../features/artist/Artist";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <Home />
        <Switch>
          <Route path="/:artist/events/:id" component={Event} />
          <Route path="/" exact component={Artist} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
