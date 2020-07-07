import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDone, MdArrowForward } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Form } from '@unform/web';

import { addNewCategoryRequest } from '../../../store/modules/category/actions';
import history from '../../../services/history';

import Input from '../../../components/Input';
import { Container, ContentHeader, ContentForm } from './styles';

export default function NewCategory() {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDesctiption] = useState('');
  const loading = useSelector((state) => state.category.loading);

  async function handleAddCategory(data) {
    try {
      ref.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatorio'),
        description: Yup.string().required('Nome é descrição'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(addNewCategoryRequest(data));
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
      <Form ref={ref} onSubmit={handleAddCategory}>
        <ContentHeader>
          <div>
            <span>Cadastro de categorias</span>
          </div>
          <div>
            <button type="button" onClick={() => history.push('/categories')}>
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
          <div />
          <div>
            <span>Nome</span>
            <Input
              name="name"
              type="text"
              placeholder="Digite um nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span>Descrição</span>
            <Input
              name="description"
              type="text"
              placeholder="Digite uma descrição"
              value={description}
              onChange={(e) => setDesctiption(e.target.value)}
            />
          </div>
        </ContentForm>
      </Form>
    </Container>
  );
}
