import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import {Header, List} from 'semantic-ui-react';

function App() {
  const[activities,SetActivities]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/api/activities').then(response=>{
      SetActivities(response.data);
      console.log(response.data);
    })
  },[])
  return (
    <div className="App">
      <Header as='h2' icon='users' content='Reactivities'/>
      <List>
          {activities.map((activity:any)=>(
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
      
    </div>
  );
}

export default App;
