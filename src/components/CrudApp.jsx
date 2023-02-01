import React from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import { useState } from "react";

const initialDb = [
  {
    id: 1,
    name: "Seiya",
    constelation: "Pegaso",
  },
  {
    id: 2,
    name: "Shiryu",
    constelation: "Dragon",
  },
  {
    id: 3,
    name: "Hyoga",
    constelation: "Cisme",
  },
  {
    id: 4,
    name: "Shun",
    constelation: "Andromeda",
  },
  {
    id: 5,
    name: "Ikki",
    constelation: "Fenix",
  },
];

export const CrudApp = () => {
  const [dbase, setDbase] = useState(initialDb);
  const [dataToEdit, setDataToEdit] = useState(null);

  const createData = (data) => {
    data.id = Date.now();
    //console.log(data);
    setDbase([...dbase, data])
  };

  const updateData = (data) => {
    let newData = dbase.map(el => el.id === data.id ? data : el);
    setDbase(newData);
  }

  const deleteData = (id, name) => {
    let isDelete = window.confirm(`¿Seguro que quieres eliminar a ${name} con el id ${id}?`)
    //console.log(window.confirm);
    if(isDelete){
        let newDelete = dbase.filter(element => element.id !== id)
        setDbase(newDelete)
    }else {
        return;
    }
  };

  return (
    <div>
      <h2>Crud App</h2>
      <CrudForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
      <CrudTable
        data={dbase}
        setDataToEdit={setDataToEdit}
        deleteData={deleteData}
      />
    </div>
  );
};
