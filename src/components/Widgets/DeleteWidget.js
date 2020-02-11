import React, { Component } from 'react';
import Modal from '../Modal';

class DeleteWidget extends Component {
  render() {
    return (
      <div>
        <Modal
          className=''
          title='Title'
          text='Inceptos lacinia pharetra dolor magna urna per montes nisl nulla dis elementum tempor morbi facilisi erat tellus platea arcu amet'
          buttonClose='CANCEL'
          buttonSave='SAVE'
          >
          CLICK
        </Modal>
      </div>
    );
  }
}

export default DeleteWidget;
