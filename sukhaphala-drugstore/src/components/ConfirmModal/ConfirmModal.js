import Modal from '@mui/material/Modal';
import classes from './ConfirmModal.module.css';

const ConfirmModal = (props) => {

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={classes.modal}>
        <h2 className={classes.header}> {props.title} </h2>
        <p className={classes.detail}>
          {props.detail}
        </p>
        <div className={classes.footer}>
          <button className={classes.cancel} onClick={props.buttonCancel}> {props.buttonCancelText} </button>
          <button className={classes.confirm} onClick={props.buttonConfirm}> {props.buttonConfirmText} </button>
        </div>
      </div>
    </Modal>
  )
};
export default ConfirmModal;