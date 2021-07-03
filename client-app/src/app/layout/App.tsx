import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../model/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid'
import agent from '../api/agent';
import LoadingComponents from './LoadingComponents';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setselectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setsubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });

      setActivities(activities);
      setLoading(false);
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
    setsubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(a => a.id !== activity.id), activity]);
        setselectedActivity(activity);
        setsubmitting(false);
        setEditMode(false);
      })
    } else {
      activity.id=uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setsubmitting(false);
        setselectedActivity(activity);
      })
    }

  }

  function onDeleteActivity_Listerner(id: string) {
    setsubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(a => a.id !== id)]);
      setsubmitting(false);
    });
    
  }

  if (loading) return <LoadingComponents content='Loading App' />

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
          submitting={submitting}
        />
      </Container>

    </>
  );
}

export default App;
