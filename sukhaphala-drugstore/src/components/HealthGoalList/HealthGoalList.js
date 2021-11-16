import axios from 'axios';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import classes from './HealthGoalList.module.css'

const HealthGoalsList = (props) => {
  const healthGoalsList = props.healthGoals.map(health => {
    return <p> {health} </p>
  })
  console.log(healthGoalsList);

  return (
    <>
      <div className={classes["select-goal-container"]}>
          {healthGoalsList}
      </div>
    </>
  )
};

export default HealthGoalsList;