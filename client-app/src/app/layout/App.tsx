import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../model/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid'


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setselectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
      console.log(response.data);
    });
  }, []);

  function selectActivity_Listener(id: string) {
    setselectedActivity(activities.find(a => a.id === id));
  };

  function cancelActivity_Listerner() {
    setselectedActivity(undefined);
  }

  function openForm_Listerner(id?: string) {
    id ? selectActivity_Listener(id) : cancelActivity_Listerner();
    setEditMode(true);
  }

  function closeForm_Listerner() {
    setEditMode(false);
  }

  function onCreateOrUpdateActivity_Listerner(activity: Activity) {
    activity.id ?
      setActivities([...activities.filter(a => a.id !== activity.id), activity])
      : setActivities([...activities, { ...activity, id: uuid() }]);

    setEditMode(false);
    setselectedActivity(activity);
  }

  function onDeleteActivity_Listerner(id: string){
setActivities([...activities.filter(a=>a.id!==id)]);
  }

  return (
    <>
      <NavBar openForm={openForm_Listerner} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities}
          selectedActivity={selectedActivity}
          selectedActivityListener={selectActivity_Listener}
          cancelActivityListener={cancelActivity_Listerner}
          editMode={editMode}
          openForm={openForm_Listerner}
          closeForm={closeForm_Listerner}
          saveActivity={onCreateOrUpdateActivity_Listerner}
          deleteActivity_Listener={onDeleteActivity_Listerner}
        />
      </Container>

    </>
  );
}

export default App;
