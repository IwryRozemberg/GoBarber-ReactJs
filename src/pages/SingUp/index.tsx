import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationsErrors from '../../utils/getValidationsErrors';
import logoImg from '../../assets/logo.svg';
import { Container, Background, Content, AnimationContainer } from './styles';
import api from '../../services/api';
import { useToastContext } from '../../hooks/ToastContext';

interface SingUpData {
  name: string;
  email: string;
  password: string;
}

const SingUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToastContext();
  const history = useHistory();

  const handleCreateUser = useCallback(
    async (data: SingUpData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('E-mail inválido')
            .required('E-mail obrigatório'),
          password: Yup.string().min(6, 'Mínimo de 6 dígitos.'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode realizar o login.',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const formErrors = getValidationsErrors(error);
          formRef.current?.setErrors(formErrors);
          return;
        }

        const { status } = error.response;

        if (status && status === 406) {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description:
              'E-mail já está cadastrado, utilize outro ou tente recuperar sua senha.',
          });
        } else {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: 'Não foi possível realizar cadastro, tente novamente.',
          });
        }
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleCreateUser}>
            <h1>Faça seu cadastro</h1>
            <Input name="name" type="text" icon={FiUser} placeholder="Nome" />
            <Input
              name="email"
              type="text"
              icon={FiMail}
              placeholder="E-mail"
            />
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft size={20} />
            Voltar para o login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SingUp;
