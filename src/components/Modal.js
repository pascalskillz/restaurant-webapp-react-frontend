import React, { Component } from 'react';
import ReactModal from 'react-modal';

const styles = {
  children: {
    cursor: 'pointer',
  },
  modal: {
    overlay: {
      backgroundColor: 'rgba(10, 10, 10, .5)',
      zIndex: '500'
    },
    content: {
      position: 'absolute',
      height: 600,
      width: 675,
      margin: 'auto'
    }
  },
  modalDiv: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
    width: '100%',
    gridRowGap: 15,
  },
  modalTitle: {
    marginBottom: 10,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'underline'
  },
  modalText: {
    // fontSize: '1.5rem'
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    width: '100%',
    height: '100%',
    marginTop: 20,
    bottom: 0
  },
  closeButton: {
    fontSize: '1.5rem',
    color: '#FA2535',
    cursor: 'pointer'
  },
  saveButton: {
    fontSize: '1.5rem',
    color: '#FA2535',
    cursor: 'pointer'
  }
};

ReactModal.setAppElement('#root');

class Modal extends Component {
  state = {
    isModalOpen: false
  };

  handleModalOpen = event => {
    this.setState({ isModalOpen: true });
  };

  handleModalClose = event => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <div>
        <div
          style={styles.children}
          className={this.props.className}
          onClick={this.handleModalOpen}>
          {this.props.children}
        </div>
        <ReactModal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.handleModalClose}
          style={styles.modal}>
          <div className='modalDiv' style={styles.modalDiv}>
            <div style={styles.modalTitle}>{this.props.title}</div>
            <div style={styles.modalText}>{this.props.text}</div>
            <div style={styles.modalContent}>{this.props.content}</div>
            <div style={styles.modalButtons}>
              <span style={styles.closeButton} onClick={this.handleModalClose}>
                {this.props.buttonClose}
              </span>
              <span style={styles.saveButton} onClick={this.handleModalClose}>
                {this.props.buttonSave}
              </span>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default Modal;
