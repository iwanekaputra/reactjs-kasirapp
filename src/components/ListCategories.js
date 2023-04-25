import  axios  from "axios";
import { useEffect, useState } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { API_URL } from "../utils/constant";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faUtensils, faCheese } from '@fortawesome/free-solid-svg-icons'

const Icon = ({name}) => {
  if(name == 'Minuman') return <FontAwesomeIcon icon={faCoffee} className="mr-2" /> 
  if(name == 'Makanan') return <FontAwesomeIcon icon={faUtensils} className="mr-3" />
  if(name == 'Cemilan') return <FontAwesomeIcon icon={faCheese} className="mr-3" /> 
}

const ListCategories = ({changeProductsByCategory, chooseCategory}) => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const request = await axios(`${API_URL}categories`)
                        .then(response => {
                          setCategories(response.data.data);
                        }).catch(error => {
                          console.log(error);
                        })
    }

    getCategories();
  }, [])

  return (
    <Col md={2} mt={2}>
      <h4><strong>Kategori</strong></h4>
      <hr />
      <ListGroup>
        {categories.map(category => {
          return <ListGroup.Item key={category.id} onClick={changeProductsByCategory.bind(this, category.name)} className={chooseCategory == category.name ? 'active' : ''}><Icon name={category.name} />
{category.name}</ListGroup.Item>
          
          
        })}
      </ListGroup>
    </Col>
  )
}


export default ListCategories;