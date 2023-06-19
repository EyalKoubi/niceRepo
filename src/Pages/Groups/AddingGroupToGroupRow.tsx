import axios from "axios";

interface Group {
  _id: string;
  group_name: string;
}

interface AddingGroupToGroupRowProps {
  addingSmallGroupName: string;
  setAddingSmallGroupName: React.Dispatch<React.SetStateAction<string>>;
  updatingGroupId: string | null;
  setUpdatingGroupId: React.Dispatch<React.SetStateAction<string | null>>;
  addingBigGroupId: string | null;
  setAddingBigGroupId: React.Dispatch<React.SetStateAction<string | null>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  group: Group;
}

const AddingGroupToGroupRow = (props: AddingGroupToGroupRowProps) => {
  const handleAddingGroupToOtherNameChange = (event: any): void => {
    props.setAddingSmallGroupName(event.target.value);
  };

  const handleCancelAddingGroupToGroup = () => {
    props.setAddingBigGroupId(null);
    props.setUpdatingGroupId(null);
    props.setError(false);
  };

  const handleAddGroupToGroup = (
    big_group_name: string,
    small_group_name: string
  ) => {
    axios
      .post("http://localhost:9000/groups/addGroupToGroup", {
        big_group: big_group_name,
        small_group: small_group_name,
      })
      .then((response) => {
        if (
          response.data === "The big group doesn't exists!" ||
          response.data === "The small group doesn't exists!" ||
          response.data === "Group not have more than one father!" ||
          response.data === "Group can not contain itself - Rassel Parradox!" ||
          response.data === "Circles in the group graph aren't allowed!"
        ) {
          props.setError(true);
          props.setErrorMessage(response.data);
        } else {
          props.setError(false);
          props.setAddingBigGroupId(null);
        }
      });
  };

  return (
    <div className="group-item-adding-group">
      <input
        type="text"
        className="group-name-input"
        value={props.addingSmallGroupName}
        onChange={handleAddingGroupToOtherNameChange}
      />
      <button
        className="cancel-add-group-button"
        onClick={handleCancelAddingGroupToGroup}
      >
        Cancel
      </button>
      <button
        className="submit-add-group-button"
        onClick={() =>
          handleAddGroupToGroup(
            props.group.group_name,
            props.addingSmallGroupName
          )
        }
      >
        Add to {props.group.group_name}
      </button>
    </div>
  );
};

export default AddingGroupToGroupRow;
