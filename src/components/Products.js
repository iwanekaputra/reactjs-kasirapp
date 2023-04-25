import { Col, Card, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Products = ({product, goToCarts}) => {
  return (
    <Col md={4} xs={6} className="mt-3">
      <Card className="shadow" onClick={goToCarts.bind(this, product)}>
        <Card.Img variant="top" src={`assets/images/${product.category.name.toLowerCase()}/${product.image}`} />
        <Card.Body>
          <Card.Title>{product.name} <strong>({product.code})</strong></Card.Title>
          <Card.Text>
            Rp. {numberWithCommas(product.price)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}


export default Products;