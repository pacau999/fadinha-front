import { InputHelperText, useInput } from 'react-admin';
import InputMask from 'react-input-mask';
import { TextField as MaterialTextField } from '@material-ui/core';
import * as React from 'react';

const MaskedInput = function (props) {
  const {
    input: { name, value, onChange, ...rest },
    meta: { touched, error },
    isRequired,
  } = useInput(props);
  const { variant, helperText, mask } = props;

  return (
    <InputMask
      maskPlaceholder={null}
      mask={mask}
      value={value}
      onChange={onChange}
      {...rest}
    >
      <MaterialTextField
        name={name}
        label={props.label}
        error={!!(touched && error)}
        helperText={
          <InputHelperText
            touched={touched}
            error={error}
            helperText={helperText}
          />
        }
        required={isRequired}
        variant={variant}
      />
    </InputMask>
  );
};
export default MaskedInput;
