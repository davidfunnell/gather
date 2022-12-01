import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendForm from './AttendForm';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';



function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path='conferences' >
            <Route path='new' element={<ConferenceForm/>}/>
          </Route>

          <Route path='locations'>
            <Route path='new' element={<LocationForm/>}/>
          </Route>

          <Route path='attendees' element={<AttendeesList attendees={props.attendees} />}>
            <Route path='new' element={<AttendForm/>}/>
          </Route>
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
