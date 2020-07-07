import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDone, MdArrowForward, MdRefresh } from 'react-icons/md';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Input from '../../../components/Input';

import history from '../../../services/history';
import { addNewMarkRequest } from '../../../store/modules/mark/actions';

import { Container, ContentHeader, ContentForm } from './styles';

export default function NewMark() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const loading = useSelector((state) => state.mark.loading);

  async function handleAddMark(data) {
    try {
      ref.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatorio'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(addNewMarkRequest(data));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        ref.current.setErrors(validationErrors);
      }
      toast.error('Ocoreu um erro');
    }
  }

  return (
    <Container>
      <Form ref={ref} onSubmit={handleAddMark}>
        <ContentHeader>
          <div>
            <span>Cadastro de marcas</span>
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
            <span>Nome</span>
            <Input
              name="name"
              type="text"
              placeholder="Digite um nome"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        </ContentForm>
      </Form>
    </Container>
  );
}
