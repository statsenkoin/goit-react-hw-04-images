import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Backdrop, Content, ButtonClose } from './Modal.styled';
import { AiFillCloseCircle } from 'react-icons/ai';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscKeyDown);
  }

  handleEscKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  handleOnCloseButton = () => {
    this.props.onClose();
  };

  render() {
    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <Content>
          <ButtonClose type="button" onClick={this.handleOnCloseButton}>
            <AiFillCloseCircle />
          </ButtonClose>
          {this.props.children}
        </Content>
      </Backdrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
