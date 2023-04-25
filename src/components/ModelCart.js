import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const ModalCart = ({handleClose, showModal, cartDetail, amount, setAmount, handleSubmit, changeHandle, setTotalPrice, totalPrice, deleteOrder}) => {
  const plus = () => {
    setAmount(amount + 1)
    setTotalPrice(cartDetail.product.price * (amount + 1));
  } 

  const minus = () => {
    if(amount > 1) {
      setAmount(amount - 1)
      setTotalPrice(cartDetail.product.price * (amount - 1));
    }

  } 

  return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{cartDetail.product.name} {" "}
              <strong>(Rp. {numberWithCommas(cartDetail.product.price)})</strong>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Total Harga : </Form.Label>
                <p><strong>Rp. {numberWithCommas(totalPrice)}</strong></p>
              </Form.Group>     
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Jumlah : </Form.Label>
                <br />
                <Button className="mr-2" size="sm" onClick={() => plus()}>
                  <FontAwesomeIcon icon={faPlus}/>
                </Button>
                <strong>{amount}</strong>
                <Button className="ml-2" size="sm" onClick={() => minus()}>
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
              </Form.Group>        
              <Form.Group controlId="exampleForm.ControlTextarea1" className="mt-3">
                <Form.Label>Keterangan : </Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Contoh : Pedas, Nasi setengah" onChange={(event) => changeHandle(event)} />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-2">
                Simpan
              </Button>
            </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={deleteOrder}>
                Hapus Pesanan
              </Button>
            </Modal.Footer>
          </Modal>
  )
}

export default ModalCart;