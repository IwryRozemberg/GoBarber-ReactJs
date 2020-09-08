import React, { createContext, useContext, useCallback, useState } from 'react';

import api from '../services/api';

interface AuthContextData {
  user: User;
  isAuthenticated: boolean;
  singIn(credentials: SingInCredentials): Promise<void>;
  singOut(): void;
}

interface AuthData {
  user: User;
  token: string;
}

interface User {
  name: string;
  avatar: string;
  email: string;
}

interface SingInCredentials {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function setHeaderAuthorization(token: string): void {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthData>(() => {
    const user = localStorage.getItem('@GoBarber:user');
    const token = localStorage.getItem('@GoBarber:token');

    if (user && token) {
      setHeaderAuthorization(token);
      return { user: JSON.parse(user), token };
    }

    return {} as AuthData;
  });

  const singIn = useCallback(async ({ email, password }: SingInCredentials) => {
    const response = await api.post('sessions', { email, password });
    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    localStorage.setItem('@GoBarber:token', token);

    setHeaderAuthorization(token);

    setData({ token, user });
  }, []);

  const singOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:user');
    localStorage.removeItem('@GoBarber:token');
    setData({} as AuthData);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!data.user, singIn, singOut, user: data.user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('AuthContext deve ser utilizado dentro do AuthProvider.');
  }

  return context;
};

export default AuthProvider;
