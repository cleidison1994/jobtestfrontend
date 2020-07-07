import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDone, MdArrowForward } from 'react-icons/md';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';
import { addNewProductRequest } from '../../../store/modules/product/actions';

import Input from '../../../components/Input';
import {
  Container,
  ContentHeader,
  ContentForm,
  ProductDescription,
  ProductValue,
  ContainerSelect,
  SelectInput,
} from './styles';

export default function ProductNew() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [category_id, setDropCategory] = useState('');
  const [mark_id, setDropMark] = useState('');
  const loading = useSelector((state) => state.product.loading);

  async function dropDowMark(inputValue, callback) {
    const response = await api.get('/marks');

    const data = response.data.map((mark) => ({
      value: mark._id,
      label: mark.name,
    }));

    setTimeout(() => {
      callback(data, 1000);
    }, 1000);
  }
  async function dropDowCategory(inputValue, callback) {
    const response = await api.get('/categories');

    const data = response.data.map((category) => ({
      value: category._id,
      label: category.name,
    }));
    setTimeout(() => {
      callback(data, 1000);
    }, 1000);
  }
  function getSelectCategory({ value }) {
    setDropCategory(value);
  }
  function getSelectMark({ value }) {
    setDropMark(value);
  }

  async function handleAddDeliveryMan({ name, description, ammount, price }) {
    try {
      const data = { name, description, ammount, price, category_id, mark_id };
      ref.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatorio'),
        description: Yup.string().required('Descrição obrigatorio'),
        ammount: Yup.string().required('Estoque obrigatorio'),
        price: Yup.string().required('Preço obrigatorio'),
        category_id: Yup.string().required(),
        mark_id: Yup.string().required(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(addNewProductRequest(data));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        ref.current.setErrors(validationErrors);
      }
      toast.error('Ocorreu um erro');
    }
  }

  return (
    <Container>
      <Form ref={ref} onSubmit={handleAddDeliveryMan}>
        <ContentHeader>
          <div>
            <span>Cadastro de produtos</span>
          </div>
          <div>
            <button type="button" onClick={() => history.push('/products')}>
              <MdArrowForward size={20} color="#FFF" />
              <span>VOLTAR</span>
            </button>
            <button type="submit">
              <MdDone size={20} color="#FFF" />
              {loading ? <span>SALVANDO...</span> : <span>SALVAR</span>}
            </button>
          </div>
        </ContentHeader>
        <ContentForm>
          <ProductDescription>
            <div>
              <span>Nome</span>
              <Input name="name" placeholder="Nome do produto" />
            </div>
            <div>
              <span>Descrição</span>
              <Input name="description" placeholder="Descrição do produto" />
            </div>
          </ProductDescription>
          <ProductValue>
            <div>
              <span>Preço</span>
              <Input
                name="price"
                type="number"
                placeholder="Valor do produto"
              />
            </div>
            <div>
              <span>Estoque</span>
              <Input
                name="ammount"
                type="number"
                placeholder="Estoque do produto"
              />
            </div>
          </ProductValue>
          <ContainerSelect>
            <div>
              <span>Categoria</span>
              <SelectInput
                name="category_id"
                cacheOptions
                placeholder="Busque uma categoria"
                noOptionsMessage={() => 'Nenhuma categoria encntrada'}
                loadOptions={dropDowCategory}
                onChange={(option) => getSelectCategory(option)}
              />
            </div>
            <div>
              <span>Marca</span>
              <SelectInput
                name="mark_id"
                cacheOptions
                placeholder="Busque uma marca"
                noOptionsMessage={() => 'Nenhuma marca encntrada'}
                loadOptions={dropDowMark}
                onChange={(option) => getSelectMark(option)}
              />
            </div>
          </ContainerSelect>
        </ContentForm>
      </Form>
    </Container>
  );
}
