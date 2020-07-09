import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MdMoreHoriz, MdCreate, MdDeleteForever } from 'react-icons/md';
import { Container, MoreOptions, Badge } from './styles';
import history from '../../services/history';

import {
  loadEditCategoryRequest,
  deleteCategoryRequest,
} from '../../store/modules/category/actions';

import {
  loadEditProductRequest,
  deleteProductRequest,
} from '../../store/modules/product/actions';

import {
  loadEditMarkRequest,
  deleteMarkRequest,
} from '../../store/modules/mark/actions';

export function OptionsCategory({ category }) {
  const { _id } = category;
  const [visibility, setVisible] = useState(false);
  const dispatch = useDispatch();

  function handleToogleVisible() {
    setVisible(!visibility);
  }

  function handleLoadEdit() {
    dispatch(loadEditCategoryRequest(_id));
    history.push('/category-edit');
  }
  function handleDelete() {
    const confir = window.confirm('Deseja realmente deletar');
    if (confir) {
      dispatch(deleteCategoryRequest(_id));
    }
  }

  return (
    <Container>
      <Badge onClick={handleToogleVisible}>
        <MdMoreHoriz color="#333" size={26} />
      </Badge>
      <MoreOptions visibility={visibility}>
        <div>
          <button type="button" onClick={handleLoadEdit}>
            <MdCreate size={16} color="#4D85EE" />
            <span>Editar</span>
          </button>
        </div>
        <div>
          <button type="button" onClick={handleDelete}>
            <MdDeleteForever size={16} color="#DE3B3B" />
            <span>Excluir</span>
          </button>
        </div>
      </MoreOptions>
    </Container>
  );
}
export function OptionsMark({ mark }) {
  const { _id } = mark;
  const [visibility, setVisible] = useState(false);
  const dispatch = useDispatch();

  function handleToogleVisible() {
    setVisible(!visibility);
  }

  function handleLoadEdit() {
    dispatch(loadEditMarkRequest(_id));
    history.push('/mark-edit');
  }
  function handleDelete() {
    const confirm = window.confirm('Deseja realmente deletar');
    if (confirm) {
      dispatch(deleteMarkRequest(_id));
    }
  }

  return (
    <Container>
      <Badge onClick={handleToogleVisible}>
        <MdMoreHoriz color="#333" size={26} />
      </Badge>
      <MoreOptions visibility={visibility}>
        <div>
          <button type="button" onClick={handleLoadEdit}>
            <MdCreate size={16} color="#4D85EE" />
            <span>Editar</span>
          </button>
        </div>
        <div>
          <button type="button" onClick={handleDelete}>
            <MdDeleteForever size={16} color="#DE3B3B" />
            <span>Excluir</span>
          </button>
        </div>
      </MoreOptions>
    </Container>
  );
}
export function OptionsProduct({ product }) {
  const { _id } = product;
  const [visibility, setVisible] = useState(false);
  const dispatc = useDispatch();

  function handleToogleVisible() {
    setVisible(!visibility);
  }
  function handleLoadEdit() {
    dispatc(loadEditProductRequest(_id));
    history.push('product-edit');
  }
  function handleDelete() {
    const confir = window.confirm('Deseja realmente deletar');

    if (confir) {
      dispatc(deleteProductRequest(_id));
    }
  }

  return (
    <Container>
      <Badge onClick={handleToogleVisible}>
        <MdMoreHoriz color="#333" size={26} />
      </Badge>
      <MoreOptions visibility={visibility}>
        <div>
          <button type="button" onClick={handleLoadEdit}>
            <MdCreate size={16} color="#4D85EE" />
            <span>Editar</span>
          </button>
        </div>
        <div>
          <button type="button" onClick={handleDelete}>
            <MdDeleteForever size={16} color="#DE3B3B" />
            <span>Excluir</span>
          </button>
        </div>
      </MoreOptions>
    </Container>
  );
}
OptionsCategory.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
OptionsMark.propTypes = {
  mark: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
OptionsProduct.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
