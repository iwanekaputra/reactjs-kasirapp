import { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import '../App.css';
import Hasil from '../components/Hasil';
import ListCategories from '../components/ListCategories';
import Products from '../components/Products';
import axios from 'axios';
import { API_URL } from '../utils/constant';
import swal from 'sweetalert';

const Home = () => {

  const [products, setProducts] = useState([]);
  const [chooseCategory, setChooseCategory] = useState('Cemilan');
  const [carts, setCarts] = useState([]);
  

  useEffect(() => {
    async function getProducts() {
      await axios.get(`${API_URL}products?category=${chooseCategory}`).then((response) => {
        setProducts(response.data.data);
      }).catch(error => {
        console.log(error);
      });
    }

    async function getCarts() {
      await axios.get(`${API_URL}carts`).then((response) => {
        setCarts(response.data.data);
      }).catch(error => {
        console.log(error);
      });
    }
    getCarts()
    getProducts();
  }, []);

  const changeProductsByCategory = (name) => {
    
    setChooseCategory(name);
    setProducts([]);
    axios.get(`${API_URL}products?category=${name}`).then((response) => {
        setProducts(response.data.data);
      }).catch(error => {
        console.log(error);
      });
    }

  const updateCarts =  () => {
   axios.get(`${API_URL}carts`).then((response) => {
      setCarts(response.data.data);
    }).catch(error => {
      console.log(error);
    });
  }

    const goToCarts = async (value) => {     
      
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      await axios.get(`${API_URL}carts?productid=${value.id}`).then(res => {
        updateCarts();

        const cart = {
          amount : 1,
          total_price : value.price,
          product_id : value.id
        }
        if(res.data.data.length === 0) {
          axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
          axios.post(`${API_URL}carts`, cart).then(res => {
            updateCarts();
            swal({
              title: "Sukses Masuk Keranjang!",
              text: "Sukses Masuk Keranjang " + value.name,
              icon: "success",
              button: false,
            });
          })

          .catch(error => {
            console.log(error);
          })

        } else {
          const updateCart = {
            amount : res.data.data[0].amount + 1,
            total_price : res.data.data[0].total_price + value.price
          }
          
          axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
          axios.post(`${API_URL}carts/${res.data.data[0].id}`, updateCart).then(res => {
            updateCarts()
            swal({
              title: "Sukses Masuk Keranjang",
              text: "Sukses Masuk Keranjang " + value.name,
              icon: "success",
              button: false,
            });
          })
          .catch(error => {
            console.log(error);
          })
        }
      })
      
    }
  
  

  return (
    <div className="App">
      <div className='mt-3'>
        <Container fluid>
          <Row>
            <ListCategories changeProductsByCategory={changeProductsByCategory} chooseCategory={chooseCategory} />
            <Col className='mt-3'>
              <h4><strong>Daftar Produk</strong></h4>
              <hr />
              <Row>
                { products.map((product) => {
                  return <Products key={product.id} product={product} goToCarts={goToCarts} />
                }) }
              
              </Row>
            </Col>
            <Hasil carts={carts} updateCarts={updateCarts} />
          </Row>
        </Container>
      </div>     
    </div>
  );
}

export default Home;
