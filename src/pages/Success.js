import { useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { API_URL } from "../utils/constant";
import axios from 'axios'

const Success = () => {
  useEffect(() => {
    axios.get(`${API_URL}carts`).then(response => {
      const carts = response.data.data
      carts.map(cart => {
        console.log(cart.id)
        return axios.delete(`${API_URL}carts/${cart.id}`).then(res => {
          console.log(res);
        }).catch(error => {
          console.log(error);
        })
      })
    })
  }, [])

  return (
    <div className="mt-4 text-center">
      <Image src="assets/images/success.png" width={500}/>
      <h2>Sukses Pesan</h2>
      <p>Terima kasih Sudah Memesan!</p>
      <Button variant="primary" as={Link} to="/">
        Kembali
      </Button>
    </div>
  )
}

export default Success;