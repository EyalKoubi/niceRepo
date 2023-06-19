import axios from "axios";
import { useState } from "react";

interface AddPersonButtonPressedProps {
  isAddingPerson: boolean;
  setIsAddingPerson: (value: React.SetStateAction<boolean>) => void;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const AddPersonButtonPressed = (props: AddPersonButtonPressedProps) => {
  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonAge, setNewPersonAge] = useState("");

  const handleFinishToAdd = (event: any) => {
    props.setIsAddingPerson(false);
    props.setError(false);
  };

  const handlePersonNameChange = (event: any) => {
    setNewPersonName(event.target.value);
  };

  const handlePersonAgeChange = (event: any) => {
    setNewPersonAge(event.target.value);
  };
  const isValidAgeInput = (str: string) => {
    if (str.length === 0) {
      props.setError(true);
      props.setErrorMessage("The age string is empty:)");
      return false;
    }

    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) < "0" || str.charAt(i) > "9") {
        props.setError(true);
        props.setErrorMessage(
          "All the string in the age field needs to be digits:)"
        );
        return false;
      }
    }

    if (parseInt(str, 10) < 0 || parseInt(str, 10) > 120) {
      props.setError(true);
      props.setErrorMessage("Age needs to be between 0 to 120 bro:)");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (newPersonName.trim().split(" ").length !== 2) {
      props.setError(true);
      props.setErrorMessage(
        "That not full name bro.. please look the example :)"
      );
      return;
    }
    if (!isValidAgeInput(newPersonAge)) return;
    const body = {
      first_name: newPersonName.trim().split(" ")[0],
      last_name: newPersonName.trim().split(" ")[1],
      age: parseInt(newPersonAge, 10),
    };
    axios
      .post(`http://localhost:9000/persons/create`, body)
      .then((response) => {
        if (response.data === "Person with this name is already exists!") {
          props.setError(true);
          props.setErrorMessage(response.data);
        } else props.setError(false);
      })
      .catch((error) => console.error(error));
  };
  return (
    <li className="add-person-item">
      <input
        type="text"
        className="person-name-input"
        placeholder="Enter person name ( For example: Eyal Koubi )"
        value={newPersonName}
        onChange={handlePersonNameChange}
      />
      <input
        type="text"
        className="person-name-input"
        placeholder="Enter age"
        value={newPersonAge}
        onChange={handlePersonAgeChange}
      />
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      <button className="finish-button" onClick={handleFinishToAdd}>
        Finish
      </button>
    </li>
  );
};

export default AddPersonButtonPressed;
