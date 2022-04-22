import { useEffect } from 'react';
import { useForm } from 'react-final-form';
import * as React from 'react';
const FormCatcher = props => {
  const form = useForm();
  useEffect(() => {
    props.set(form);
  }, []);
  return <></>;
};
export default FormCatcher;
