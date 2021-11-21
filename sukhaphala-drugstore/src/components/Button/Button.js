
const Button = (props) => {
  return(
    <button
      onClick={props.Button_onclick}
      className={props.Button_style}
    >
      {props.Button_text} 
    </button>
  )
};

export default Button;