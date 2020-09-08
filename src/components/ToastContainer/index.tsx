import React from 'react';
import { useTransition } from 'react-spring';

import { ToastMessage } from '../../hooks/ToastContext';

import Toast from './Toast';
import { Container } from './styles';

interface ToastProps {
  toasts: ToastMessage[];
}

const ToastContainer: React.FC<ToastProps> = ({ toasts }) => {
  const toastsWithTransitions = useTransition(toasts, toast => toast.id, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  });

  return (
    <Container>
      {toastsWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} toastData={item} styled={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
