import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { AiFillCloseCircle } from 'react-icons/ai';

import { Backdrop, Content, ButtonClose } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onToggleModal, children }) {
  useEffect(() => {
    const handleEscKeyDown = e => {
      if (e.code === 'Escape') onToggleModal();
    };
    window.addEventListener('keydown', handleEscKeyDown);
    return () => {
      window.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [onToggleModal]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) onToggleModal();
  };

  const handleOnCloseButton = () => onToggleModal();

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <Content>
        <ButtonClose type="button" onClick={handleOnCloseButton}>
          <AiFillCloseCircle />
        </ButtonClose>
        {children}
      </Content>
    </Backdrop>,
    modalRoot
  );
}

Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};
