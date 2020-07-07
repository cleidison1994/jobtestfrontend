import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdSearch, MdAdd } from 'react-icons/md';

import history from '../../../services/history';

import {
  loadProductRequest,
  loadCategoryFilterResquest,
  loadMarkFilterResquest,
} from '../../../store/modules/product/actions';
import { OptionsProduct } from '../../../components/ActionsMenu';

import {
  Container,
  Content,
  ContentHeader,
  ContentList,
  TableLoading,
  Filters,
  ButtonFilterCategory,
  ButtonFilterMark,
  ButtonMark,
} from './styles';

export default function List() {
  //
  const dispatch = useDispatch();
  //
  const [textsearch, setTextsearch] = useState('');
  const [category, setCategoryFilter] = useState('');
  const [mark, setMarkFilter] = useState('');
  //
  const products = useSelector((state) => state.product.products);
  const filterCategory = useSelector((state) => state.product.filterCategory);
  const filterMark = useSelector((state) => state.product.filterMark);

  useEffect(() => {
    dispatch(loadProductRequest(textsearch, category, mark));
    dispatch(loadCategoryFilterResquest());
    dispatch(loadMarkFilterResquest());
  }, [dispatch, textsearch, category, mark]);

  function handleFitlerCategory(_id) {
    setCategoryFilter(_id);
  }
  function handleFitlerMark(_id) {
    if (mark === _id) {
      setMarkFilter('');
    }
    setMarkFilter(_id);
  }
  function handleClearFilterMark() {
    setMarkFilter('');
  }
  function handleClearFilterCategory() {
    setCategoryFilter('');
  }
  return (
    <>
      <Container>
        <Content>
          <span>Gerenciando produtos</span>
          <ContentHeader>
            <form>
              <MdSearch size={25} color="#333" />
              <input
                placeholder="Buscar por produto"
                onChange={(e) => setTextsearch(e.target.value)}
              />
            </form>
            <button type="button" onClick={() => history.push('/product-new')}>
              <MdAdd size={20} color="#fff" />
              <span>CADASTRAR</span>
            </button>
          </ContentHeader>
          <Filters>
            <ButtonFilterCategory>
              <span>Categorias</span>
              <div>
                {filterCategory ? (
                  <button type="button" onClick={handleClearFilterCategory}>
                    Limpar filtros
                  </button>
                ) : (
                  ''
                )}
                {filterCategory ? (
                  filterCategory.map((filter) => (
                    <button
                      type="button"
                      onClick={() => handleFitlerCategory(filter._id)}
                    >
                      {filter.name}
                    </button>
                  ))
                ) : (
                  <span>sem filtros</span>
                )}
              </div>
            </ButtonFilterCategory>
            <ButtonFilterMark>
              <span>Marcas</span>
              <div>
                {filterMark ? (
                  filterMark.map((filter) => (
                    <ButtonMark
                      type="button"
                      onClick={() => handleFitlerMark(filter._id)}
                    >
                      {filter.name}
                    </ButtonMark>
                  ))
                ) : (
                  <span>sem filtros</span>
                )}
                {filterMark ? (
                  <button type="button" onClick={handleClearFilterMark}>
                    Limpar filtros
                  </button>
                ) : (
                  ''
                )}
              </div>
            </ButtonFilterMark>
          </Filters>
          <ContentList>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Categoria</th>
                <th>Marca</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.ammount}</td>
                    <td>{product.category.name}</td>
                    <td>{product.mark.name}</td>
                    <td>
                      <OptionsProduct product={product} />
                    </td>
                  </tr>
                ))
              ) : (
                <TableLoading>
                  <span>Carregando...</span>
                </TableLoading>
              )}
            </tbody>
          </ContentList>
        </Content>
      </Container>
    </>
  );
}
