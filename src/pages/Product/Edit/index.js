import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { MdDone, MdArrowForward } from 'react-icons/md';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Input from '../../../components/Input';

import history from '../../../services/history';
import api from '../../../services/api';

import {
  Container,
  ContentHeader,
  ContentForm,
  ProductDescription,
  ProductValue,
  ContainerSelect,
  SelectInput,
} from './styles';

export default function ProductEdit() {
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [category, setDropCategory] = useState('');
  const [mark, setDropMark] = useState('');

  const productEditing = useSelector((state) => state.product.productEdit);

  async function dropDowMark(inputValue, callback) {
    const response = await api.get('/marks');

    const data = response.data.map((m) => ({
      value: m._id,
      label: m.name,
    }));

    setTimeout(() => {
      callback(data, 1000);
    }, 1000);
  }
  async function dropDowCategory(inputValue, callback) {
    const response = await api.get('/categories');

    const data = response.data.map((c) => ({
      value: c._id,
      label: c.name,
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

  async function handleEditProduct({ _id, name, description, price, ammount }) {
    try {
      const data = Object.assign(
        category ? { category } : {},
        mark ? { mark } : {},
        { name, description, ammount, price }
      );
      ref.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatorio'),
        description: Yup.string().required('Descrição obrigatorio'),
        ammount: Yup.string().required('Estoque obrigatorio'),
        price: Yup.string().required('Preço obrigatorio'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      setLoading(true);
      const response = await api.put(`/products/${_id}`, data);
      if (response.data) {
        history.push('/products');
        toast.success('Registro salvo');
      }
      setLoading(false);
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
      <Form ref={ref} onSubmit={handleEditProduct} initialData={productEditing}>
        <ContentHeader>
          <div>
            <span>Edição de produtos</span>
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
              <Input hidden name="_id" />
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
                cacheOptions
                placeholder={
                  productEditing.category
                    ? productEditing.category.name
                    : 'Busque uma categoria'
                }
                noOptionsMessage={() => 'Nenhuma categoria encntrada'}
                loadOptions={dropDowCategory}
                onChange={(option) => getSelectCategory(option)}
              />
            </div>
            <div>
              <span>Marca</span>
              <SelectInput
                cacheOptions
                placeholder={
                  productEditing ? productEditing.mark.name : 'Busque uma marca'
                }
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
