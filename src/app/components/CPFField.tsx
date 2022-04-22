import { FunctionField, Labeled } from 'react-admin';
import { formatCPF } from 'utils/format';
import * as React from 'react';

const CPFField = props => {
  const { source, label, ...rest } = props;

  return (
    <Labeled label={label}>
      <FunctionField
        render={record => record[source] && formatCPF(record[source])}
        {...rest}
      />
    </Labeled>
  );
};
export default CPFField;
