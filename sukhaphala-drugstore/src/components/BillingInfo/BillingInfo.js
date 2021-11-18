import classes from './BillingInfo.module.css';

const BillingInfo = (props) => {
  /*
  props must be 
    - type
    - heading
    - contents
    - content
 */
  let contentLine;
  //render content depends on type
  if (props.type === 'ADDRESS') {
    //if this is address there may have multiple line
    //convert address object to array 
    const contentLines = [];
    Object.keys(props.contents).map((key, index) => {
      contentLines.push(props.contents[key]);
    });
    //then use map function with this array to display wanted styles
    contentLine = contentLines.map(content => (
      <div className={classes["content-address"]}>
        <p> { content } </p>
      </div>
    ))
  } else {
    contentLine = <p> { props.content } </p>;
  }
    

  return (
    <div className={classes['billing-info']}>
      <div className={classes['info-head']}>
        <p> { props.heading } </p>
      </div>
      <div className={classes['info-content']}>
        { contentLine }
      </div>
    </div>
  );
};

export default BillingInfo;
