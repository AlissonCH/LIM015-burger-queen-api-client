import Cookies from 'universal-cookie';
import { helpHttp } from '../helpers/helpHttp';

const { put } = helpHttp();
const url = 'https://bq-lab-2021.herokuapp.com/';
const cookies = new Cookies();

export const updateData = (data, setLoading, setModalMessage, path, id) => {
  const token = cookies.get('token');
  const {
    name, price, type, image,
  } = data;
  setLoading(true);
  return put(`${url}${path}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    body: {
      name,
      price: Number(price),
      type,
      image,
    },
  })
    .then((data) => {
      setLoading(false);
      console.log(data);
      setModalMessage({ title: '¡Producto actualizado exitosamente!' });
    })
    .catch((err) => console.log(err));
};

export const updateUser = (data, setLoading, setModalMessage, path, id) => {
  const token = cookies.get('token');
  setLoading(true);
  return put(`${url}${path}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  })
    .then((data) => {
      setLoading(false);
      console.log(data);
      setModalMessage({ title: '!Usuario actualizado exitosamente!' });
    }) 
    .catch((err) => console.log(err));
};

  export const updateOrder = (data, path, id, status) => {
    const token = cookies.get('token');
    console.log(id);
    console.log(typeof id);
    const {userId, client} = data;
    // setLoading(true);
    return put(`${url}${path}/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
      body: {
        userId,
        client,
        status: status,
      },
    })
      .then((data) => {
        console.log(data);
        // setLoading(false);
        //Agregar mensajes de éxito y error
      })
      .catch(err => console.log(err))
  };

