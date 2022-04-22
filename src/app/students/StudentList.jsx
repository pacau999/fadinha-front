import { Datagrid, List, SimpleList, TextField, TextInput } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import { trimTo } from 'utils/format';

const StudentList = props => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const studentFilters = [<TextInput source="q" label="Search" alwaysOn />];
  return (
    <List
      {...props}
      filters={studentFilters}
      bulkActionButtons={false}
      sort={{ field: 'name', order: 'ASC' }}
    >
      {isSmall ? (
        <SimpleList
          primaryText={record => trimTo(record.name, 30)}
          secondaryText={record =>
            (record.liable && 'Liable: ' + trimTo(record.liable, 40)) ||
            record.address.street
          }
          tertiaryText={record =>
            record.whatsapp || record['phone-alternative']
          }
          linkType="show"
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="name" />
          <TextField source="whatsapp" />
          <TextField source="liable" />
          <TextField label="Street" source="address.street" />
        </Datagrid>
      )}
    </List>
  );
};
export default StudentList;
