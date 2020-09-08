import React, { createContext, useContext, useCallback, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  title: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  description?: string;
  timer?: number;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ title, type, description, timer }: Omit<ToastMessage, 'id'>) => {
      const id = uuidV4();

      setToasts(prevState => [
        ...prevState,
        {
          id,
          title,
          description,
          timer,
          type,
        },
      ]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToasts(prevState => prevState.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = (): ToastContextData => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      'useToastContext deve ser utilizado dentro de um ToastProvider.',
    );
  }

  return context;
};

export default ToastProvider;
