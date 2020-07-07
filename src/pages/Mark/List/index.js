import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdSearch, MdAdd } from 'react-icons/md';

import history from '../../../services/history';
import { loadMarkRequest } from '../../../store/modules/mark/actions';
import { OptionsMark } from '../../../components/ActionsMenu';

import { Container, Content, ContentHeader, ContentList } from './styles';

export default function List() {
  const dispatch = useDispatch();

  const [textsearch, setTextSearch] = useState('');
  const markList = useSelector((state) => state.mark.marks);

  useEffect(() => {
    dispatch(loadMarkRequest(textsearch));
  }, [dispatch, textsearch]);

  return (
    <Container>
      <Content>
        <span>Gerenciando marcas</span>
        <ContentHeader>
          <form>
            <MdSearch size={25} color="#333" />
            <input
              placeholder="Buscar por marcas"
              onChange={(e) => setTextSearch(e.target.value)}
            />
          </form>
          <button type="button" onClick={() => history.push('/mark-new')}>
            <MdAdd size={20} color="#fff" />
            <span>CADASTRAR</span>
          </button>
        </ContentHeader>
        <ContentList>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th />

              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {markList ? (
              markList.map((mark) => (
                <tr key={mark._id}>
                  <td>{mark._id}</td>
                  <td>{mark.name}</td>
                  <td />
                  <td>
                    <OptionsMark mark={mark} />
                  </td>
                </tr>
              ))
            ) : (
              <span>Nenhuma marca</span>
            )}
          </tbody>
        </ContentList>
      </Content>
    </Container>
  );
}
