import { useEffect, useState } from 'react';
import { kotalika_backend } from 'declarations/kotalika_backend';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

function App() {
  const [alladvs, setAlladv] = useState([]);

  useEffect(()=> 
  {
    kotalika_backend.readAll().then((result) => {
      console.log(result)
      setAlladv(result);
    });
  }, []);

const handleDelete = (e, id) => {

  e.preventDefault();
  
  kotalika_backend.delete(parseInt(id,10)).then((result) => {
    console.log(result)
    alert("Advertisement deleted");
    kotalika_backend.readAll().then((result) => {
      console.log(result)
      setAlladv(result);
    });
  });

}


  return (
    <>
    <Container fluid= "md">

    <h2>Kotalika Project</h2>
    <Link to = "/create">Add</Link>
    <Table responsive>
      <thead>
        <tr>
          <th>No</th>
          <th>Image</th>
          <th>Title</th>
          <th>Specification</th>
          <th>Category</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
          {
              alladvs.map((val, i) => (
                <tr>
                  <td> {i+1} </td>
                  <td> <Image src={val[1].img} rounded height={100} width={100}/> </td>
                  <td> {val[1].title} </td>
                  <td> {val[1].specification} </td>
                  <td> {val[1].category} </td>
                  <td> <Link to={`/update/${val[0]}`}>Modify</Link> </td>
                  <td> <Link to="" onClick={(e) => handleDelete(e, val[0])}>Delete</Link></td>

                </tr>

              ))
          }

      </tbody>
    </Table>
    </Container>

    </>
  );
}

export default App;
