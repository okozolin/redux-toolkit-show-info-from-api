import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./components/Home";
import Event from "./components/Event";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:artist/events/:id" component={Event} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
