import { InputHelperText, useInput } from 'react-admin';
import InputMask from 'react-input-mask';
import { TextField as MaterialTextField } from '@material-ui/core';
import * as React from 'react';

const BoundedTextField = function (props) {
  const {
    input: { name, value, onChange, ...rest },
    meta: { touched, error },
    isRequired,
  } = useInput(props);
  const { variant, helperText } = props;
  const [mask, setMask] = React.useState(
    value.length < 11 ? '(99) 9999-99999' : '(99) 9 9999-9999',
  );
  const inputRef = React.useRef(null);

  //Checks value lenght and change Mask accordingly
  const beforeMaskedStateChange = function (params) {
    if (!params) return;
    const { nextState } = params;
    if (mask && mask === '(99) 9999-99999' && nextState.value.length === 15) {
      setMask('(99) 9 9999-9999');
    } else if (mask === '(99) 9 9999-9999' && nextState.value.length < 16) {
      setMask('(99) 9999-99999');
    }
    return nextState;
  };
  //Fix Cursor Position when Mask Change
  React.useEffect(() => {
    if (inputRef) {
      if (inputRef.current.value.length == mask.length) {
        inputRef.current.selectionStart += 1;
      } else if (
        inputRef.current.value.length < mask.length &&
        inputRef.current.selectionStart !== 14
      ) {
        inputRef.current.selectionStart -= 1;
        inputRef.current.selectionEnd -= 1;
      }
    }
  }, [mask]);
  //const maskChar = value.length ==10? null : '_'
  return (
    <InputMask
      maskPlaceholder={null}
      beforeMaskedStateChange={beforeMaskedStateChange}
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
        inputRef={inputRef}
      />
    </InputMask>
  );
};
const PhoneInput = props => {
  const parse = (str: string) =>
    str
      .replaceAll('(', '')
      .replaceAll(')', '')
      .replaceAll(' ', '')
      .replaceAll('-', '');
  return <BoundedTextField parse={parse} {...props} />;
};
export default PhoneInput;
