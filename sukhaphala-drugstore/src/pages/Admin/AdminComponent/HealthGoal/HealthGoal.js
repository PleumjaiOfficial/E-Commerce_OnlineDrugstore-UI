import axios from 'axios';
import { useEffect, useState } from 'react';

const HealthGoal = (props) => {
  const [healthGoals, setHealthGoals] = useState([]);

  useEffect(() => {
    const fetchHealthGoals = async () => {
      const response = await axios.get('http://localhost:5000/healthgoals/');
      setHealthGoals(response.data);
    };
    fetchHealthGoals();
  }, []);

  const healthGoalsList =  healthGoals.map(health => {
    return <option key={health._id}> {health.name} </option>
  })

  return (
    <>
      <select  onChange={props.onChange}>
          {/* <option> {healthGoalsList[0]} </option> */}
          {healthGoalsList}
          {console.log(healthGoals)}
      </select> 
    </>
  )
};

export default HealthGoal;