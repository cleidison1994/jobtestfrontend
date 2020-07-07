import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { Container, ToastContainer } from './styles';

function Toast() {
  return (
    <Container>
      <ToastContainer>
        <FiAlertCircle size={20} />
        <div>
          <strong>Ocorreu um erro</strong>
          <p>Não foi possivel efetuar login</p>
        </div>
        <button type="button">
          <FiXCircle size={20} />
        </button>
      </ToastContainer>
      <ToastContainer type="success">
        <FiAlertCircle size={20} />
        <div>
          <strong>Ocorreu um erro</strong>
          <p>Não foi possivel efetuar login</p>
        </div>
        <button type="button">
          <FiXCircle size={20} />
        </button>
      </ToastContainer>
      <ToastContainer type="error">
        <FiAlertCircle size={20} />
        <div>
          <strong>Ocorreu um erro</strong>
          <p>Não foi possivel efetuar login</p>
        </div>
        <button type="button">
          <FiXCircle size={20} />
        </button>
      </ToastContainer>
    </Container>
  );
}

export default Toast;
