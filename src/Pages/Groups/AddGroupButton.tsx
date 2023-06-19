import axios from "axios";
import { useState } from "react";

interface Group {
  _id: string;
  group_name: string;
}

interface AddGroupButtonProps {
  newGroupName: string;
  setNewGroupName: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  groupsList: Group[];
  setGroupsList: React.Dispatch<React.SetStateAction<Group[]>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const AddGroupButton = (props: AddGroupButtonProps) => {
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const handleGroupNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setNewGroupName(event.target.value);
  };

  const handleSubmit = () => {
    if (props.newGroupName.trim() !== "") {
      axios
        .post(
          `http://localhost:9000/groups/create?group_name=${props.newGroupName}`
        )
        .then((response) => {
          if (response.data === "Group with that name is already exists!") {
            props.setError(true);
            props.setErrorMessage(response.data);
          } else {
            props.setError(false);
            props.setGroupsList((prevGroups) => [...prevGroups, response.data]);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const handleFinishToAdd = () => {
    setIsAddingGroup(false);
    props.setNewGroupName("");
    props.setError(false);
  };

  const handleAddGroup = () => {
    setIsAddingGroup(true);
  };

  return (
    <>
      {isAddingGroup ? (
        <li className="add-group-item">
          <input
            type="text"
            className="group-name-input"
            placeholder="Enter group name"
            value={props.newGroupName}
            onChange={handleGroupNameChange}
          />
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
          <button className="finish-button" onClick={handleFinishToAdd}>
            Finish
          </button>
        </li>
      ) : (
        <li className="add-group-item">
          <button className="add-group-button" onClick={handleAddGroup}>
            +
          </button>
        </li>
      )}
    </>
  );
};

export default AddGroupButton;
