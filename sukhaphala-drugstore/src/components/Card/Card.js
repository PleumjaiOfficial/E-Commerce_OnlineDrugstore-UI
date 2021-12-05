import classes from './Card.module.css';

const Card = (props) => {
  let textDesc

  //truncate string to not longer than 50 characters
  if(props.desc.length > 50){
    textDesc = props.desc.substring(0,50);
    textDesc  = textDesc + "..."
  } else{
    textDesc = props.desc
  }

  return (
    <div className={classes["card"]}>

      <div className={classes["card-image"]}>
        <img src={props.img} />
      </div>

      <div className={classes["card-price"]}>
        <p>{props.title}</p>
        <p>{props.price} Bath </p>
      </div>

      <div className={classes["overlay"]}>
        <div className={classes["card-content"]}>
          <h2 className={classes["card-title"]}>
            <span>{props.title}</span>
          </h2>

          <p className={classes["card-desc"]}>
            {textDesc}
          </p>

          <h3> {props.button} </h3>
      </div>
      </div>
    </div>
  )
}

export default Card
