import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserGrid from "./components/UserGrid";
import CreateTeam from "./components/CreateTeam";
import AddUserForm from "./components/AddUserForm";
import store from "./store/store";
import { Provider } from "react-redux";
import TeamListPage from "./components/TeamListPage";
import TeamDetailsPage from "./components/TeamDetailsPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Nav />
        <div>
          <Route path="/" exact component={UserGrid} />
          <Route path="/adduser" exact component={AddUserForm} />
          <Route path="/teamlist" exact component={TeamListPage} />
          <Route path="/createteam" exact component={CreateTeam} />
          <Route path="/team/:teamId" component={TeamDetailsPage} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
