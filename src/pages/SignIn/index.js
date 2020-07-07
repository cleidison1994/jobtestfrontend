import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { MdAddShoppingCart } from 'react-icons/md';

import Input from '../../components/Input';
import { Container, ContentLogo } from './styles';

import { authSignInRequest } from '../../store/modules/auth/actions';

function SigIn() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  async function handleSignIn(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um email valido')
          .required('email é obrigatorio'),
        password: Yup.string()
          .min(6, 'senha deve conter no minimo 6 digitos')
          .required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(authSignInRequest(data));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        ref.current.setErrors(validationErrors);
        toast.error('Verifique seus dados');
      }
    }
  }

  return (
    <Container>
      <ContentLogo>
        <span>MyStore</span>
        <MdAddShoppingCart size={50} color="#00A5FE" />
      </ContentLogo>
      <Form ref={ref} onSubmit={handleSignIn}>
        <span>Email*</span>
        <Input name="email" placeholder="Seu email" />
        <span>Senha*</span>
        <Input name="password" type="password" placeholder="Seu senha" />
        <button type="submit">{loading ? 'Acessando...' : 'Acessar'}</button>
        <Link to="/register">Criar conta</Link>
      </Form>
    </Container>
  );
}

export default SigIn;
