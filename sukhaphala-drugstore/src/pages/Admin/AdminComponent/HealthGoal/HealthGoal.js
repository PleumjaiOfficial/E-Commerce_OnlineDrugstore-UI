import axios from 'axios';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import classes from './HealthGoal.module.css'

const HealthGoal = (props) => {
  const [healthGoals, setHealthGoals] = useState([]);

  useEffect(() => {
    const fetchHealthGoals = async () => {
      const response = await axios.get('http://localhost:5000/healthgoals/');
      setHealthGoals(response.data);
    };
    fetchHealthGoals();
  }, []);

  const healthGoalsList = healthGoals.map(health => {
    return <option key={health._id}> {health.name} </option>
  })
  console.log(healthGoalsList);

  return (
    <>
      <div className={classes["select-goal-container"]}>
        <select onChange={props.onChange}>
          {healthGoalsList}
        </select>
      </div>
      


    </>
  )
};

export default HealthGoal;