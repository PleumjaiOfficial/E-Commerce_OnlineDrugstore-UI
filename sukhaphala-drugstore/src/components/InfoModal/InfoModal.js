import Modal from '@mui/material/Modal';
import classes from './InfoModal.module.css';

const InfoModal = (props) => {
  const status = props.status;

  let styleStatus;
  if (status === 'FAIL'){
    styleStatus = classes.fail;
  } else if (status === 'SUCCESS') {
    styleStatus = classes.success;
  } else {
    styleStatus = classes.normal;
  }

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={classes.modal}>
        <h2 className={styleStatus}> {props.title} </h2>
        <p className={classes.detail}>
          {props.detail}
        </p>
        <div className={classes.footer}>
          <button onClick={props.buttonAction}> {props.buttonText} </button>
        </div>
      </div>
    </Modal>
  )
};
export default InfoModal;