import React, { useState } from "react";
import "../../CSS/Persons/MainPersons.css";
import AddPersonButtonPressed from "./AddPersonButtonPressed";
import RemovePersonButton from "./RemovePersonButton";
import UpdatePersonButton from "./UpdatePersonButton";
import { usePersonContext } from "../../context/PersonsContext/PersonContext";

const MainPersons = () => {
  const { persons } = usePersonContext();
  const [isAddingPerson, setIsAddingPerson] = useState(false);
  const [isUpdatePressed, setIsUpdatePressed] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatedPerson, setUpdatedPerson] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
  });

  const handleAddPerson = () => {
    setIsAddingPerson(true);
  };

  return (
    <div className="main-persons-container">
      <div className="persons-list-container">
        <ul className="persons-list">
          {persons.map((person) => (
            <li key={person._id} className="person-item">
              <div className="person-name">
                {person.first_name} {person.last_name}
              </div>
              <UpdatePersonButton
                person={person}
                updatedPerson={updatedPerson}
                isUpdatePressed={isUpdatePressed}
                setUpdatedPerson={setUpdatedPerson}
                setIsUpdatePressed={setIsUpdatePressed}
              />
              <RemovePersonButton person={person} />
            </li>
          ))}
          {isAddingPerson ? (
            <AddPersonButtonPressed
              isAddingPerson={isAddingPerson}
              setIsAddingPerson={setIsAddingPerson}
              error={error}
              setError={setError}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          ) : (
            <li className="add-person-item">
              <button className="add-person-button" onClick={handleAddPerson}>
                +
              </button>
            </li>
          )}
          {error && (
            <div className="already-exits-person-error-message">
              {errorMessage}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MainPersons;
