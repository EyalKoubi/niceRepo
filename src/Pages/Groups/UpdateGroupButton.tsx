interface Group {
  _id: string;
  group_name: string;
}

interface UpdateGroupButtonProps {
  setUpdatingGroupId: React.Dispatch<React.SetStateAction<string | null>>;
  updatingGroupId: string | null;
  setUpdatedGroupName: React.Dispatch<React.SetStateAction<string>>;
  updatedGroupName: string;
  group: Group;
}

const UpdateGroupButton = (props: UpdateGroupButtonProps) => {
  const handleStartUpdateGroup = (_id: string, groupName: string) => {
    props.setUpdatingGroupId(_id);
    props.setUpdatedGroupName(groupName);
  };

  return (
    <button
      className="update-group-button"
      onClick={() =>
        handleStartUpdateGroup(props.group._id, props.group.group_name)
      }
    >
      Update
    </button>
  );
};

export default UpdateGroupButton;
