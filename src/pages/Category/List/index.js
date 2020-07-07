import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdSearch, MdAdd } from 'react-icons/md';
import { loadCategoriesRequest } from '../../../store/modules/category/actions';

import { OptionsCategory } from '../../../components/ActionsMenu';
import history from '../../../services/history';

import {
  Container,
  Content,
  ContentHeader,
  ContentList,
  TableLoading,
} from './styles';

export default function ListCategories() {
  const [textsearch, setTextSearch] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  useEffect(() => {
    dispatch(loadCategoriesRequest(textsearch));
  }, [dispatch, textsearch]);

  return (
    <>
      <Container>
        <Content>
          <span>Gerenciando categorias</span>
          <ContentHeader>
            <form>
              <MdSearch size={25} color="#333" />
              <input
                placeholder="Buscar por categoria"
                value={textsearch}
                onChange={(e) => setTextSearch(e.target.value)}
              />
            </form>
            <button type="button" onClick={() => history.push('/category-new')}>
              <MdAdd size={20} color="#fff" />
              <span>CADASTRAR</span>
            </button>
          </ContentHeader>
          <ContentList>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories ? (
                categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>
                      <OptionsCategory category={category} />
                    </td>
                  </tr>
                ))
              ) : (
                <span>Não ha produtos por aqui</span>
              )}
            </tbody>
          </ContentList>
        </Content>
      </Container>
    </>
  );
}
