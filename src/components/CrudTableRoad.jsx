import React from "react";
import "../style/Input.css"

const CrudTableRoad = ({el, setDataToEdit, deleteData}) => {

  let {name, constelation, id} = el;
  return (
    <tr>
      <td>{name}</td>
      <td>{constelation}</td>
      <td>
        <button onClick={() => setDataToEdit(el)}>Editar</button>
        <button onClick={() => deleteData(id, name)}>Eliminar</button>
      </td>
    </tr>
  );
}

export default CrudTableRoad;
