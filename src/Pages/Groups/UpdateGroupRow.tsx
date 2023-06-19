import axios from "axios";

interface Group {
  _id: string;
  group_name: string;
}

interface UpdateGroupRowProps {
  setUpdatedGroupName: React.Dispatch<React.SetStateAction<string>>;
  updatedGroupName: string;
  setUpdatingGroupId: React.Dispatch<React.SetStateAction<string | null>>;
  updatingGroupId: string | null;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  group: Group;
  setNewGroupName: React.Dispatch<React.SetStateAction<string>>;
  newGroupName: string;
  setGroupsList: React.Dispatch<React.SetStateAction<Group[]>>;
  groupsList: Group[];
}

const UpdateGroupRow = (props: UpdateGroupRowProps) => {
  const handleUpdateGroupNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setUpdatedGroupName(event.target.value);
  };

  const handleCancelUpdateGroup = () => {
    props.setUpdatingGroupId(null);
    props.setUpdatedGroupName("");
    props.setError(false);
  };

  const handleUpdateGroup = (_id: string) => {
    if (props.updatedGroupName.trim() !== "") {
      axios
        .patch(`http://localhost:9000/groups/rename/${_id}`, {
          newName: props.updatedGroupName,
        })
        .then((response) => {
          if (response.data === "Group with that name already exists!") {
            props.setError(true);
            props.setErrorMessage(response.data);
          } else {
            props.setError(false);
            props.setUpdatingGroupId(null);
            props.setNewGroupName("");
          }
          props.setGroupsList((prevGroups) =>
            prevGroups.map((group) => {
              if (group._id === _id) {
                return { ...group, group_name: props.updatedGroupName };
              }
              return group;
            })
          );
        })
        .catch((error) => console.error(error));
    }
  };
  return (
    <div className="group-item-update">
      <input
        type="text"
        className="group-name-input"
        value={props.updatedGroupName}
        onChange={handleUpdateGroupNameChange}
      />
      <button
        className="cancel-update-button"
        onClick={handleCancelUpdateGroup}
      >
        Cancel
      </button>
      <button
        className="submit-update-button"
        onClick={() => handleUpdateGroup(props.group._id)}
      >
        Update
      </button>
    </div>
  );
};

export default UpdateGroupRow;
