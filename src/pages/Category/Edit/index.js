import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { MdDone, MdArrowForward } from 'react-icons/md';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import history from '../../../services/history';
import api from '../../../services/api';

import Input from '../../../components/Input';
import { Container, ContentHeader, ContentForm } from './styles';

export default function CategoryEdit() {
  const categoryEditing = useSelector((state) => state.category.categoryEdit);
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);

  async function handleEditCategory(data) {
    try {
      ref.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatorio'),
        description: Yup.string().required('Descrição é obrigatorio'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const { _id, name, description } = data;
      setLoading(true);
      const response = await api.put(`categories/${_id}`, {
        name,
        description,
      });
      if (response.data) {
        history.push('/categories');
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
    }
  }

  return (
    <Container>
      <Form
        ref={ref}
        initialData={categoryEditing}
        onSubmit={handleEditCategory}
      >
        <ContentHeader>
          <div>
            <span>Edição de categorias</span>
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
            <Input hidden name="_id" />
            <span>Nome</span>
            <Input name="name" type="text" placeholder="Digite um nome" />
            <span>Email</span>
            <Input
              name="description"
              type="text"
              placeholder="Digite uma descrição"
            />
          </div>
        </ContentForm>
      </Form>
    </Container>
  );
}
