import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAddShoppingCart } from 'react-icons/md';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Input from '../../components/Input';

import { addNewUserRequest } from '../../store/modules/auth/actions';

import { Container, ContentLogo } from './styles';

export default function Register() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector((state) => state.auth.loading);

  async function handleAddUser(data) {
    try {
      ref.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email('Digite um email valido').required(),
        password: Yup.string()
          .min(6, 'Senha deve conter no minimo 6')
          .required('Senha e obrigatorio'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(addNewUserRequest(data));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        ref.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <Container>
      <ContentLogo>
        <span>MyStore</span>
        <MdAddShoppingCart size={50} color="#00A5FE" />
      </ContentLogo>
      <Form ref={ref} onSubmit={handleAddUser}>
        <span>Nome*</span>
        <Input
          name="name"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span>Email*</span>
        <Input
          name="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>Senha*</span>
        <Input
          name="password"
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {loading ? <span>Salvando...</span> : <span>Registrar</span>}
        </button>
      </Form>
      <Link to="/">Já possuo login </Link>
    </Container>
  );
}
