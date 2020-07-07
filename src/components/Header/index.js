import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signOutRequest } from '../../store/modules/auth/actions';

import { Container, Content } from './styles';

export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOutRequest());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/home">HOME</Link>
          <Link to="/categories">CATEGORIAS</Link>
          <Link to="/marks">MARCAS</Link>
          <Link to="/products">PRODUTOS</Link>
        </nav>
        <aside>
          <span>Bem vindo, {user ? user.name : 'Nome'}</span>
          <button type="button" onClick={handleSignOut}>
            Sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
