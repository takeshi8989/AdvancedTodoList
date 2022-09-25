import Navbar from "./pages/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import { useState } from "react";
import TaskDetail from "./pages/TaskDetail";
import Edit from "./pages/Edit";

function App() {
  const [currentId, setCurrentId] = useState(1);

  return (
    <div className="App">
      <Router basename="/AdvancedTodoList">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/task">
            <Create currentId={currentId} setCurrentId={setCurrentId} />
          </Route>
          <Route path="/detail">
            <TaskDetail />
          </Route>
          <Route path="/edit:id">
            <Edit />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
