import React, { useEffect } from 'react';
import {
  FiXCircle,
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';

import { Container } from './styles';
import { useToastContext, ToastMessage } from '../../../hooks/ToastContext';

interface ToastProps {
  toastData: ToastMessage;
  styled: object;
}

const toastIcon = {
  info: <FiInfo size={20} />,
  success: <FiCheckCircle size={20} />,
  warning: <FiAlertTriangle size={20} />,
  error: <FiAlertCircle size={20} />,
};

const Toast: React.FC<ToastProps> = ({ toastData, styled }) => {
  const { removeToast } = useToastContext();
  const DEFAULT_TIMER = 3000;
  const DEFAULT_TYPE = 'info';

  useEffect(() => {
    const autoRemove = setTimeout(() => {
      removeToast(toastData.id);
    }, toastData.timer || DEFAULT_TIMER);

    return () => {
      clearTimeout(autoRemove);
    };
  }, [toastData, removeToast]);

  return (
    <Container
      type={toastData.type || DEFAULT_TYPE}
      description={toastData.description}
      style={styled}
      timer={toastData.timer || DEFAULT_TIMER}
    >
      {toastIcon[toastData.type || DEFAULT_TYPE]}
      <div>
        <strong>{toastData.title}</strong>
        {toastData.description && <p>{toastData.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(toastData.id)}>
        <FiXCircle size={20} />
      </button>
    </Container>
  );
};

export default Toast;
