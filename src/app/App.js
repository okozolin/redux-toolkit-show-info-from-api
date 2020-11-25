import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "../features/home/Home";
import Event from "../features/events/Event";
import Navbar from "./Navbar";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:artist/events/:id" component={Event} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
