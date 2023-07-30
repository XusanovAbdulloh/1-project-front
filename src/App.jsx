import { Route, Switch } from 'react-router-dom';
import Listrooms from "./pages/list-rooms.jsx";
import RoomShow from "./pages/show-room.jsx";
import updateRoom from "./pages/update-room.jsx"
import "./App.css"
import createRooom from './pages/create-room.jsx';

function App() {
  return (
    <>
    <Switch>
      <Route exact path="/" component={Listrooms} />
      <Route exact path="/rooms/:id" component={RoomShow} />
      <Route exact path="/rooms/edit/:id" component={updateRoom} />
      <Route exact path="/rooms/create" component={createRooom} />
    </Switch>
    </>
  )
}

export default App;
