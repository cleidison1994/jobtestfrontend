import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { MdDone, MdArrowForward } from 'react-icons/md';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Input from '../../../components/Input';

import history from '../../../services/history';
import api from '../../../services/api';

import { Container, ContentHeader, ContentForm } from './styles';

export default function MarkEdit() {
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const markEditing = useSelector((state) => state.mark.markEdit);

  async function handleEditMark(data) {
    const { _id, name } = data;
    try {
      ref.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatorio'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      setLoading(true);
      const response = await api.put(`/marks/${_id}`, { name });
      setLoading(false);
      if (response.data) {
        history.push('/marks');
        toast.success('Registro salvo');
      }
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
      <Form ref={ref} initialData={markEditing} onSubmit={handleEditMark}>
        <ContentHeader>
          <div>
            <span>Edição de marcas</span>
          </div>
          <div>
            <button type="button" onClick={() => history.push('/marks')}>
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
          </div>
        </ContentForm>
      </Form>
    </Container>
  );
}
