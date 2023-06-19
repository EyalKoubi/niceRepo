import { useEffect, useState } from "react";
import axios from "axios";
import "../../CSS/Groups/MainGroups.css";
import RemoveGroupButton from "./RemoveGroupButton";
import AddGroupButton from "./AddGroupButton";
import UpdateGroupButton from "./UpdateGroupButton";
import UpdateGroupRow from "./UpdateGroupRow";
import AddingGroupToGroupRow from "./AddingGroupToGroupRow";
import AddingGroupToGroupButton from "./AddingGroupToGroupButton";

interface Group {
  _id: string;
  group_name: string;
}

const MainGroups = () => {
  const [groupsList, setGroupsList] = useState<Group[]>([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatingGroupId, setUpdatingGroupId] = useState<string | null>(null);
  const [updatedGroupName, setUpdatedGroupName] = useState("");
  const [addingBigGroupId, setAddingBigGroupId] = useState<string | null>(null);
  const [addingSmallGroupName, setAddingSmallGroupName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:9000/groups/getGroups")
      .then((response) => {
        setGroupsList(response.data);
      })
      .catch((error) => console.error(error));
  }, [groupsList]);

  return (
    <div className="main-groups-container">
      <div className="groups-title">
        <h2 className="groups-title-text">Group List</h2>
      </div>
      <div className="groups-list-container">
        <ul className="groups-list">
          {groupsList.map((group) => (
            <li key={group._id} className="group-item">
              {addingBigGroupId === group._id ? (
                <AddingGroupToGroupRow
                  addingSmallGroupName={addingSmallGroupName}
                  setAddingSmallGroupName={setAddingSmallGroupName}
                  updatingGroupId={updatingGroupId}
                  setUpdatingGroupId={setUpdatingGroupId}
                  addingBigGroupId={addingBigGroupId}
                  setAddingBigGroupId={setAddingBigGroupId}
                  error={error}
                  setError={setError}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  group={group}
                />
              ) : updatingGroupId === group._id ? (
                <UpdateGroupRow
                  setUpdatedGroupName={setUpdatedGroupName}
                  updatedGroupName={updatedGroupName}
                  setUpdatingGroupId={setUpdatingGroupId}
                  updatingGroupId={updatingGroupId}
                  setError={setError}
                  error={error}
                  setErrorMessage={setErrorMessage}
                  errorMessage={errorMessage}
                  group={group}
                  setNewGroupName={setNewGroupName}
                  newGroupName={newGroupName}
                  setGroupsList={setGroupsList}
                  groupsList={groupsList}
                />
              ) : (
                <div className="group-item-content">
                  <div className="group-name">{group.group_name}</div>
                  <AddingGroupToGroupButton
                    addingBigGroupId={addingBigGroupId}
                    setAddingBigGroupId={setAddingBigGroupId}
                    group={group}
                  />
                  <UpdateGroupButton
                    setUpdatingGroupId={setUpdatingGroupId}
                    updatingGroupId={updatingGroupId}
                    setUpdatedGroupName={setUpdatedGroupName}
                    updatedGroupName={updatedGroupName}
                    group={group}
                  />
                  <RemoveGroupButton
                    group={group}
                    groupsList={groupsList}
                    setGroupsList={setGroupsList}
                  />
                </div>
              )}
            </li>
          ))}
          <AddGroupButton
            newGroupName={newGroupName}
            setNewGroupName={setNewGroupName}
            error={error}
            setError={setError}
            groupsList={groupsList}
            setGroupsList={setGroupsList}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
          {error && (
            <div className="already-exists-group-error-message">
              {errorMessage}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MainGroups;
