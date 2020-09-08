import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuthContext } from '../../hooks/AuthContext';
import getValidationsErrors from '../../utils/getValidationsErrors';

import { Container, Content, AnimationContainer, Background } from './styles';
import { useToastContext } from '../../hooks/ToastContext';

interface SingInFormData {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: Yup.string().min(6, 'No mínimo 6 dígitos'),
});

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { singIn } = useAuthContext();
  const { addToast } = useToastContext();
  const history = useHistory();

  const handleSingIn = useCallback(
    async (data: SingInFormData) => {
      try {
        formRef.current?.setErrors({});

        await schema.validate(data, { abortEarly: false });

        await singIn({ email: data.email, password: data.password });

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Login realizado',
          description: `Bem vindo`,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const formErrors = getValidationsErrors(error);
          formRef.current?.setErrors(formErrors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [singIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSingIn}>
            <h1>Faça seu login</h1>

            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
              validateSchema={schema}
              formRef={formRef}
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
              validateSchema={schema}
              formRef={formRef}
            />
            <Button
              type="submit"
              // className={formRef.current?.getErrors() ? 'disable' : 'show'}
            >
              Entrar
            </Button>
            <Link to="/">Esqueci minha senha</Link>
          </Form>
          <Link to="/sing-up">
            <FiLogIn size={19} />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SingIn;
