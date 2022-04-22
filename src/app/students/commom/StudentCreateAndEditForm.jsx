import CPFInput from 'app/components/CPFInput';
import NonInput from 'app/components/NonInput';
import PhoneInput from 'app/components/PhoneInput';
import {
  DateInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';
import { Typography } from '@material-ui/core';
import MaskedInput from 'app/components/MaskedInput';
import { useForm } from 'react-final-form';

const FormAwareZipInput = props => {
  const form = useForm();
  //console.log(form);
  const getAddressFromApi = async zip =>
    await (await fetch(`https://viacep.com.br/ws/${zip}/json/`)).json();
  const autoFillAdressFieldsFromZip = async zip => {
    try {
      const addressData = await getAddressFromApi(zip);
      if (addressData.erro) throw new Error('inválid zip code');
      const {
        logradouro: street,
        complemento: complement,
        bairro: neighborhood,
        localidade: city,
        uf: state,
      } = addressData;
      const newAdressData = { street, complement, neighborhood, city, state };
      //const formState = form.getState();
      //const addressFormState = formState.values.address;
      //console.log(addressFormState)
      form.change('address', { zip, ...newAdressData });
    } catch (err) {
      console.log("error, can't get address from zip code: ", err);
    }
  };
  const handleZipChange = ({ target: { value } }) => {
    //console.log(value)
    if (value.length === 9) {
      const fieldState = form.getFieldState('address.zip');
      //console.log(fieldState)
      if (!fieldState.pristine) autoFillAdressFieldsFromZip(fieldState.value);
    }
  };
  const parse = val => val.replace('-', '');
  return (
    <MaskedInput
      mask="99999-999"
      parse={parse}
      source="address.zip"
      label="ZIP Code"
      onChange={handleZipChange}
      {...props}
    />
  );
};
const statesArray = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
];
const choices = statesArray.map(uf => ({ id: uf, name: uf }));
const fullName = name =>
  name.trim().split(' ').length > 1 ? null : 'Please insert the Full Name';
const validPhone = ({ length }) =>
  length === 11 || length === 10 ? null : 'Phone must have 10 or 11 digits';
const StudentCreateAndEditForm = props => {
  return (
    <SimpleForm {...props}>
      <TextInput source="name" validate={[required(), fullName]} />
      <DateInput source="birth" validate={required()} />
      <TextInput
        source="liable"
        validate={liable => (liable ? fullName(liable) : null)}
      />
      <PhoneInput
        source="whatsapp"
        label="Whatsapp"
        variant="filled"
        initialValue="37"
        validate={[required(), validPhone]}
        //validate={[minLength(10, 'Insira um número válido')]}
      />
      <PhoneInput
        source="phone-alternative"
        label="Alternative Phone"
        variant="filled"
        validate={phone => (phone ? validPhone(phone) : null)}
      />
      <TextInput source="email" />
      <CPFInput source="cpf" label="CPF" variant="filled" />
      <NonInput>
        <Typography variant="subtitle1" gutterBottom>
          Address
        </Typography>
      </NonInput>
      <FormAwareZipInput
        variant="filled"
        validate={zip =>
          zip ? (zip.length === 8 ? null : 'Invalid Zip Code') : null
        }
      />
      <TextInput source="address.street" label="Street" />
      <TextInput source="address.number" label="Number" />
      <TextInput source="address.complement" label="Complement" />
      <TextInput source="address.neighborhood" label="Neighborhood" />
      <TextInput source="address.city" label="City" initialValue="Curvelo" />
      <SelectInput
        source="address.state"
        choices={choices}
        label="State"
        initialValue="MG"
      />
      {props.enrollments ? (
        <NonInput>
          <Typography variant="caption" gutterBottom>
            This student is on {props.enrollments} enrollment
            {props.enrollments > 1 && 's'}
          </Typography>
        </NonInput>
      ) : null}
    </SimpleForm>
  );
};
export default StudentCreateAndEditForm;
