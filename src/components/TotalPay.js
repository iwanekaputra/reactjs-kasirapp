import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Row, Col, Button} from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { API_URL } from '../utils/constant'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const TotalPay = ({carts}) => {
  let navigate = useNavigate();

  const totalPay = carts.reduce((result, item) => {
    return result += item.total_price
  }, 0)

  const submitTotalPay = () => {
    const orders = {
      total_pay : totalPay,
      products : carts
    }

    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post(`${API_URL}orders`, orders).then(response => {
      navigate('/success')
    })
  }

  return (
    <>
    {/* web */}
    <div className="fixed-bottom d-none d-md-block">
      <Row>
        <Col md={{ span : 3, offset : 9 }} className="px-4">
          <h4>Total Harga : <strong className='float-right mr-2'>Rp. {numberWithCommas(totalPay)}</strong></h4>
          <Button variant='primary' className='w-100 mb-2 mt-2' size="lg" onClick={() => submitTotalPay(totalPay)}> 
            <FontAwesomeIcon icon={faShoppingCart} /> Bayar Sekarang
          </Button>
        </Col>
      </Row>
    </div>

    {/* mobile */}
    <div className="d-sm-block d-md-none">
    <Row>
      <Col md={{ span : 3, offset : 9 }} className="px-4">
        <h4>Total Harga : <strong className='float-right mr-2'>Rp. {numberWithCommas(totalPay)}</strong></h4>
        <Button variant='primary' className='w-100 mb-2 mt-2' size="lg" onClick={() => submitTotalPay(totalPay)}> 
          <FontAwesomeIcon icon={faShoppingCart} /> Bayar Sekarang
        </Button>
      </Col>
    </Row>
  </div>
  </>
  )
}

export default TotalPay;  