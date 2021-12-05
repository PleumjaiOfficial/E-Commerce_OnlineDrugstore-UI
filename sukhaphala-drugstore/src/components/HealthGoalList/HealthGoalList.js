import classes from './HealthGoalList.module.css'

const HealthGoalsList = (props) => {
  const healthGoalsList = props.healthGoals.map(health => {
    return <p> {health} </p>
  })
  
  return (
    <div className={classes["select-goal-container"]}>
        {healthGoalsList}
    </div>
  )
};

export default HealthGoalsList;