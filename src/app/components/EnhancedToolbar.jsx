import { DeleteButton, SaveButton, Toolbar } from 'react-admin';

const EnhancedToolbar = ({
  basePath,
  handleSubmit,
  handleSubmitWithRedirect,
  invalid,
  mutationMode,
  pristine,
  record,
  redirect,
  resource,
  saving,
  submitOnEnter,
  undoable,
  validating,
  disableDeleteButtonIfHaveRelatedRecords,
  total = 1,
  loaded,
}) => {
  const filteredProps = {
    basePath,
    handleSubmit,
    handleSubmitWithRedirect,
    invalid,
    mutationMode,
    pristine,
    record,
    redirect,
    resource,
    saving,
    submitOnEnter,
    undoable,
    validating,
  };

  return (
    <Toolbar {...filteredProps}>
      <SaveButton disabled={pristine} />
      {((loaded && !isNaN(Number(total)) && total === 0) ||
        !disableDeleteButtonIfHaveRelatedRecords) && (
        <DeleteButton style={{ marginLeft: 'auto' }} />
      )}
    </Toolbar>
  );
};
export default EnhancedToolbar;
