const StudentFirstName = props => {
  return (
    <span>
      Student {props.record ? `${props.record.name.split(' ')[0]}` : ''}
    </span>
  );
};
export default StudentFirstName;
