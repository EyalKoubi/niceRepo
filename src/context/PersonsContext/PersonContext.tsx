import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Person } from "./types";

interface PersonContextProps {
  persons: Person[];
  setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
  deletePerson: (_id: string) => void;
  updatePerson: (
    updatedPerson: {
      id: string;
      firstName: string;
      lastName: string;
      age: string;
    },
    setIsUpdatePressed: (value: React.SetStateAction<boolean>) => void
  ) => void;
}

interface PersonProviderProps {
  children: React.ReactNode;
}

const PersonContext = createContext<PersonContextProps | null>(null);

export const PersonProvider = ({ children }: PersonProviderProps) => {
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/persons/getPersons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => console.error(error));
  }, [persons]);

  const deletePerson = (_id: string) => {
    axios
      .delete(`http://localhost:9000/persons/delete/${_id}`)
      .then((response) => {
        setPersons(persons.filter((person) => person._id !== _id));
      })
      .catch((error) => console.error(error));
  };

  const updatePerson = (
    updatedPerson: {
      id: string;
      firstName: string;
      lastName: string;
      age: string;
    },
    setIsUpdatePressed: (value: React.SetStateAction<boolean>) => void
  ) => {
    axios
      .put(`http://localhost:9000/persons/update/${updatedPerson.id}`, {
        first_name: updatedPerson.firstName,
        last_name: updatedPerson.lastName,
        age: updatedPerson.age,
      })
      .then((response) => {
        setIsUpdatePressed(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <PersonContext.Provider
      value={{
        persons,
        setPersons,
        deletePerson,
        updatePerson,
      }}
    >
      {children}
    </PersonContext.Provider>
  );
};

export const usePersonContext = () => {
  return useContext(PersonContext) as PersonContextProps;
};

export default PersonContext;
