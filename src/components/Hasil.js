import { useState } from "react";
import { Col, ListGroup, Row, Badge, Card } from "react-bootstrap";
import { API_URL } from "../utils/constant";
import { numberWithCommas } from "../utils/utils";
import ModalCart from "./ModelCart";
import TotalPay from "./TotalPay";
import axios from 'axios';
import swal from "sweetalert";

const Hasil = ({carts, updateCarts}) => {

  const [showModal, setShowModal] = useState(false);
  const [cartDetail, setCartDetail] = useState([]);
  const [amount, setAmount] = useState(0);
  const [information, setInformation] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)

  const handleClose = () => setShowModal(false);
  const handleShow = (cart) => {
    setAmount(cart.amount)
    setCartDetail(cart);
    setTotalPrice(cart.total_price)
    setShowModal(true)
  };

  const changeHandle = (event) => {
    setInformation(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(false)
    const data = {
      amount : amount,
      total_price : totalPrice
    }
    
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post(`${API_URL}carts/${cartDetail.id}`, data).then(response => {
      updateCarts()
      swal({
        title: "Sukses Update Pesanan",
        text: "Sukses Update Pesanan " + cartDetail.product.name,
        icon: "success",
        button: false,
      }).catch(error => {
        console.log(error)
      });
    })  
  }
  
  const deleteOrder = async() => {
    setShowModal(false)
    const data = {
      cart : cartDetail.id
    }
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';    
    await axios.post(`${API_URL}carts/delete`, data).then(res => {
      updateCarts()

      swal({
        title: "Pesanan telah dihapus",
        text: "Pesanan telah dihapus " + cartDetail.product.name,
        icon: "success",
        button: false,
      });
    })
  }

  return (
    <Col md={3} mt={3}>
      <h4><strong>Hasil</strong></h4>
      <hr />
      <div className="overflow-auto hasil">
      {carts.length ? carts.map(cart => {
        return (
          <Card  key={cart.id}>
          <ListGroup variant="flush" onClick={() => handleShow(cart)}>
            <ListGroup.Item>
              <Row>
                <Col md={2}>
                <h4>
                <Badge pill variant="primary" className="text-white">
                  {cart.amount}
                </Badge>
                </h4>
                </Col>
                <Col md={8}>
                  <h5>{cart.product.name}</h5>
                  <p>{numberWithCommas(cart.product.price)}</p>
                </Col>
                <Col md={2}>
                  <strong className="float-right">{numberWithCommas(cart.total_price)}</strong>
                </Col>
              </Row>
            </ListGroup.Item>            
          </ListGroup>
        </Card>
        )
      }) : (
        <h1>tidak ada belanja</h1>
        )}
      <TotalPay carts={carts} />
     {showModal && (
       <ModalCart showModal={showModal} handleClose={handleClose} cartDetail={cartDetail} amount={amount} setAmount={setAmount} handleSubmit={handleSubmit} changeHandle={changeHandle} setTotalPrice={setTotalPrice} totalPrice={totalPrice} deleteOrder={deleteOrder} />
       
       )}
       </div>
    </Col>
  )
}

export default Hasil;