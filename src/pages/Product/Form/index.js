import React, { useState, useRef, useMemo, useEffect } from 'react';
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
  const [category, setDropCategory] = useState([]);
  const [mark, setDropMark] = useState([]);
  const [category_id, setCategory_id] = useState(null);
  const [mark_id, setMark_id] = useState(null);
  const loading = useSelector((state) => state.product.loading);

  useEffect(() => {
    async function loadData() {
      try {
        const [categoryResponse, markResponse] = await Promise.all([
          api.get('/marks'),
          api.get('/categories'),
        ]);
        setDropCategory(categoryResponse.data);
        setDropMark(markResponse.data);
      } catch (error) {
        toast.error(`Ocorreu um erro ${error}`);
      }
    }
    loadData();
  }, []);
  const categoryOption = useMemo(() => {
    return category.map((categories) => ({
      value: categories._id,
      label: categories.name,
    }));
  }, [category]);

  const markOption = useMemo(() => {
    return mark.map((marks) => ({
      value: marks._id,
      label: marks.name,
    }));
  }, [mark]);
  function getChangeCategory(selectedOption) {
    const { value } = selectedOption;
    setCategory_id(value);
  }
  function getChangeMark(selectedOption) {
    const { value } = selectedOption;
    setMark_id(value);
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
                isSearchable={false}
                name="category_id"
                cacheOptions
                placeholder="Selecione uma categoria"
                noOptionsMessage={() => 'Nenhuma categoria encntrada'}
                options={categoryOption}
                onChange={getChangeCategory}
                defaultOptions={
                  category
                    ? {
                        label: category.name,
                        value: category._id,
                      }
                    : undefined
                }
              />
            </div>
            <div>
              <span>Marca</span>
              <SelectInput
                name="mark_id"
                isSearchable={false}
                cacheOptions
                placeholder="Selecione uma marca"
                noOptionsMessage={() => 'Nenhuma marca encntrada'}
                options={markOption}
                onChange={getChangeMark}
                defaultOptions={
                  mark
                    ? {
                        label: mark.name,
                        value: mark._id,
                      }
                    : undefined
                }
              />
            </div>
          </ContainerSelect>
        </ContentForm>
      </Form>
    </Container>
  );
}
