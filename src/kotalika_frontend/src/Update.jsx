import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { kotalika_backend } from 'declarations/kotalika_backend';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function Update() {

    const [title, settitle] = useState('');
    const [specification, setspecification] = useState('');
    const [category, setcategory] = useState('');
    const {id} = useParams();
    const [img, setImg] = useState('');

    let id2 = parseInt(id, 10);

    useEffect(()=> {
        kotalika_backend.read(id2).then((result) => {
          console.log(result)
          settitle(result[0].title);
          setspecification(result[0].specification);
          setcategory(result[0].category);
      });
    }, []);

    const handleImg = (e) => {
        const data = new FileReader();
        data.addEventListener('load', ()=>{
            setImg(data.result)
        })
        data.readAsDataURL(e.target.files[0]);
    }

    const handleSubmit = (e) =>{

        const data = {
            title: title,
            specification: specification,
            category: category,
            img: img
        }

        kotalika_backend.update(id2, data).then((result) => {
            console.log(result)
            //alert("Advertisement updated");
            window.location.href = '/';
        });

    };

    return (
        <>
            <div>Update advertisement</div>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name= 'title' value={title} 
                    onChange = {(e)=> settitle(e.target.value)}/>

                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Specification</Form.Label>
                    <Form.Control type="text" name= 'specification' value={specification}
                    onChange = {(e)=> setspecification(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" name= 'category' value={category}
                    onChange = {(e)=> setscategory(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Picture Upload</Form.Label>
                    <Form.Control type="file" name= 'img' 
                    onChange = {handleImg}/>
                </Form.Group>

                <Button variant="primary" onClick={handleSubmit}>Submit</Button>{' '}

            </Form>
        </>


    )
}