import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField, FormHandles } from '@unform/core';
import { ObjectSchema } from 'yup';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  validateSchema?: ObjectSchema;
  formRef?: React.RefObject<FormHandles>;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  validateSchema,
  formRef,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    fieldName,
    defaultValue,
    registerField,
    error,
    clearError,
  } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });

    setIsFilled(!!inputRef.current?.value);
  }, [fieldName, registerField]);

  const handleInputBlur = useCallback(async () => {
    setIsFocused(false);

    if (validateSchema) {
      try {
        await validateSchema.validate({ [fieldName]: inputRef.current?.value });
        clearError();
      } catch (err) {
        if (formRef) {
          const currentErrors = formRef.current?.getErrors();
          const errors = {
            [fieldName]: err.message,
            ...currentErrors,
          };
          formRef.current?.setErrors(errors);
        }
      }
    }

    setIsFilled(!!inputRef.current?.value);
  }, [validateSchema, fieldName, formRef, clearError]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Container
      className="InputGroup"
      isFocused={isFocused}
      isFilled={isFilled}
      hasError={!!error}
    >
      {Icon && <Icon size={20} />}
      <input
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle size={20} color="#c53030" />
        </Error>
      )}
    </Container>
  );
};

export default Input;
