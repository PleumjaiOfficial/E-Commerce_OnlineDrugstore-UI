import axios from 'axios';
import { useEffect, useState } from 'react';
import classes from './HealthGoal.module.css'

const HealthGoal = (props) => {
  const [healthGoals, setHealthGoals] = useState([]);

  //get all health goals from database
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

  return (
    <div className={classes["select-goal-container"]}>
      <select onChange={props.onChange}>
        {healthGoalsList}
      </select>
    </div>
  )
};

export default HealthGoal;