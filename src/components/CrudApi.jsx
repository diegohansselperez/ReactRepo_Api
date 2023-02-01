import { helpHttp } from "../helpers/helpHttp";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { Message } from "./Message";

let api = helpHttp();
let url = "http://localhost:3000/santos";

const CrudApi = () => {
  const [dbase, setDbase] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  

  // useEffect(() => {
  //   setLoading(true);

  //   //Error aqui
  //   api.get(url)
  //     .then((res) => {
  //       console.log(res);
  //     if (!res.err) {
  //       setDbase(res);
  //       setError(null);
  //     } else {
  //       setDbase(null);
  //       setError(res);
  //     }

  //     setLoading(false);
  //   });
  // }, [api]);

  const createData = (data) => {
    data.id = Date.now();
    console.log(data);
    let options = {
      body:data,
      header:{"Content-Type":"application/json"},
    };

    api.post(url, options).then((res) => {
      console.log(api);
      console.log(res);
      if (!res.err) {
        setDbase([...dbase, res]);
      } else {
        setError(res);
      }
    });
    setDbase([...dbase, data]);
  };

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;
    console.log(endpoint);

    let newData = dbase.map((el) => (el.id === data.id ? data : el));
    setDbase(newData);
  };

  const deleteData = (id, name) => {
    let isDelete = window.confirm(
      `¿Seguro que quieres eliminar a ${name} con el id ${id}?`
    );
    //console.log(window.confirm);
    if (isDelete) {
      let newDelete = dbase.filter((element) => element.id !== id);
      setDbase(newDelete);
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>Crud API</h2>
      <CrudForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
      {loading && <Loader />}
      {error && (
        <Message
          msg={`Error ${error.status}: ${error.statusText}`}
          bgColor="#DC3545"
        />
      )}
      {dbase && (
        <CrudTable
          data={dbase}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
      )}
    </div>
    );
  }
export default CrudApi
