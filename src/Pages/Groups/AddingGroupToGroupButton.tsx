interface Group {
  _id: string;
  group_name: string;
}

interface AddingGroupToGroupButtonProps {
  addingBigGroupId: string | null;
  setAddingBigGroupId: React.Dispatch<React.SetStateAction<string | null>>;
  group: Group;
}

const AddingGroupToGroupButton = (props: AddingGroupToGroupButtonProps) => {
  const handleStartAddGroupToGroup = (group: Group) => {
    props.setAddingBigGroupId(group._id);
  };

  return (
    <button
      className="add-group-to-group-button"
      onClick={() => handleStartAddGroupToGroup(props.group)}
    >
      Add Group
    </button>
  );
};

export default AddingGroupToGroupButton;
