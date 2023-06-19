import axios from "axios";

interface Group {
  _id: string;
  group_name: string;
}

interface RemoveGroupButtonProps {
  group: Group;
  groupsList: Group[];
  setGroupsList: React.Dispatch<React.SetStateAction<Group[]>>;
}

const RemoveGroupButton = (props: RemoveGroupButtonProps) => {
  const handleRemoveGroup = (_id: string) => {
    axios
      .delete(`http://localhost:9000/groups/delete/${_id}`)
      .then(() => {
        props.setGroupsList((prevGroups) =>
          prevGroups.filter((group) => group._id !== _id)
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <button
        onClick={() => handleRemoveGroup(props.group._id)}
        className="remove-group-button"
      >
        X
      </button>
    </>
  );
};

export default RemoveGroupButton;
