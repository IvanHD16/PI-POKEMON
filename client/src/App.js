import './App.css';
import {Route, BrowserRouter,Switch} from "react-router-dom";
import Home from './views/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Create from './views/Create/Create'
import Landing from './views/Landing/Landing';
import Detail from './views/Detail/Detail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Route path={'*'} component={Navbar}/>
        <Switch>
          <Route exact path={"/"} component={Landing}/>
          <Route path={'/home'} component={Home}/>
          <Route path={'/create'} component={Create}/>
          <Route path={'/detail/:id'} component={Detail}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
