import { usePersonContext } from "../../context/PersonsContext/PersonContext";
import { Person } from "../../context/PersonsContext/types";

interface RemovePersonButtonProps {
  person: Person;
}

const RemovePersonButton = (props: RemovePersonButtonProps) => {
  const { deletePerson } = usePersonContext();
  return (
    <button
      onClick={() => deletePerson(props.person._id)}
      className="remove-person-button"
    >
      X
    </button>
  );
};

export default RemovePersonButton;
