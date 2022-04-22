import PhoneField from 'app/components/PhoneField';
import WhatsAppField from 'app/components/WhatsAppField';
import {
  DateField,
  SimpleShowLayout,
  TextField,
  Labeled,
  EmailField,
} from 'react-admin';

import CPFField from 'app/components/CPFField';
import React from 'react';
const MarginLeft = props => {
  const { children, basePath, ...rest } = props;
  return (
    <div style={{ marginLeft: '1em' }}>
      {React.Children.map(children, child => {
        return (
          <div style={{ width: '100%' }}>
            {child && child.props.label ? (
              <Labeled label={child.props.label} {...rest}>
                {React.cloneElement(child, {
                  fullWidth: true,
                  basePath,
                  ...rest,
                })}
              </Labeled>
            ) : (
              child && React.cloneElement(child, rest)
            )}
          </div>
        );
      })}
    </div>
  );
};
const StudentShowContent = ({ record, ...props }) => (
  <SimpleShowLayout {...props} record={record}>
    <TextField source="name" />
    {record && record.liable && <TextField source="liable" />}
    <WhatsAppField source="whatsapp" />
    {record && record['phone-alternative'] && (
      <PhoneField source="phone-alternative" label="Alternative Phone" />
    )}
    <EmailField source="email" />
    <DateField source="birth" />
    <CPFField label="CPF" source="cpf" />
    <Labeled label="Address"></Labeled>
    <MarginLeft>
      <TextField label="ZIP" source="address.zip" />
      <TextField label="Street" source="address.street" />
      <TextField label="Number" source="address.number" />
      {record && record.address && record.address.complement && (
        <TextField label="Complement" source="address.complement" />
      )}
      <TextField label="Neighborhood" source="address.neighborhood" />
      <TextField label="City" source="address.city" />
    </MarginLeft>
  </SimpleShowLayout>
);
export default StudentShowContent;
