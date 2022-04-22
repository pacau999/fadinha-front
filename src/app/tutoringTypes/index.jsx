import {
  Create,
  Datagrid,
  Edit,
  FunctionField,
  List,
  NumberField,
  NumberInput,
  RichTextField,
  Show,
  SimpleForm,
  SimpleList,
  SimpleShowLayout,
  TextField,
  TextInput,
  useGetManyReference,
  required,
} from 'react-admin';
import { useMediaQuery, InputAdornment, Typography } from '@material-ui/core';
import EnhancedToolbar from '../components/EnhancedToolbar';
import RichTextInput from 'ra-input-rich-text';
import NonInput from '../components/NonInput';
import { trimTo } from 'utils/format';

const TutoringTypeList = props => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <List {...props} bulkActionButtons={false}>
      {isSmall ? (
        <SimpleList
          primaryText={({ name }) => name}
          secondaryText={({ description }) =>
            description ? trimTo(description.replace(/<[^>]*>/g, ' '), 120) : ''
          }
          tertiaryText={({ sugestedHourValue }) =>
            sugestedHourValue ? 'R$ ' + sugestedHourValue : ''
          }
          linkType="show"
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="name" />
          <FunctionField
            source="description"
            render={(record, source) =>
              record && record[source]
                ? trimTo(record[source].replace(/<[^>]*>/g, ' '), 180)
                : ''
            }
          />
          <NumberField
            source="sugestedHourValue"
            label="Sugested Hour Value (R$)"
          />
        </Datagrid>
      )}
    </List>
  );
};
const Title = ({ record: { name } }) => <span>{name}</span>;

const TutoringTypeEdit = props => {
  const { total, loaded } = useGetManyReference(
    'enrollments',
    'tutoringTypeId',
    props.id,
    { page: 1, perPage: 1 },
    {},
    {},
    'tutoringTypes',
  );

  return (
    <Edit {...props} title={<Title />}>
      <SimpleForm
        toolbar={
          <EnhancedToolbar
            disableDeleteButtonIfHaveRelatedRecords
            loaded={loaded}
            total={total}
          />
        }
      >
        <TextInput source="name" validate={required()} />
        <RichTextInput source="description" />
        <NumberInput
          source="sugestedHourValue"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
        />
        {total && loaded ? (
          <NonInput>
            <Typography variant="caption" gutterBottom>
              This tutoring type is on {total} enrollment
              {total > 1 && 's'}
            </Typography>
          </NonInput>
        ) : null}
      </SimpleForm>
    </Edit>
  );
};
const TutoringTypeCreate = props => {
  return (
    <Create {...props} title={<Title />}>
      <SimpleForm>
        <TextInput source="name" validate={required()} />
        <RichTextInput multiline source="description" />
        <NumberInput
          source="sugestedHourValue"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
        />
      </SimpleForm>
    </Create>
  );
};
const TutoringTypeShow = props => {
  return (
    <Show {...props} title={<Title />}>
      <SimpleShowLayout>
        <TextField source="name" />
        <RichTextField source="description" />
        <FunctionField
          label="Sugested hour value"
          render={({ sugestedHourValue }) => 'R$ ' + (sugestedHourValue || '-')}
        />
      </SimpleShowLayout>
    </Show>
  );
};

export {
  TutoringTypeList,
  TutoringTypeEdit,
  TutoringTypeCreate,
  TutoringTypeShow,
};
