
const Button = ({
  Button_text,
  Button_style,
  Button_onclick,
  Button_icon
}) => {

  return(
    <button
      onClick={Button_onclick}
      className={Button_style}
    >
      {Button_text} 
    </button>
  )
};

export default Button;