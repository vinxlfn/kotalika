import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { kotalika_backend } from 'declarations/kotalika_backend';
import { Link } from 'react-router-dom';
import { Container} from 'react-bootstrap';


export default function Create() {

    const [title, settitle] = useState('');
    const [specification, setspecification] = useState('');
    const [category, setcategory] = useState('');
    const [img, setImg] = useState('');

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

        kotalika_backend.created(data).then((result) => {
            console.log(result)
            //alert("New advertisement added");
            window.location.href = '/';
        });

    };

    return (
        <>
            <div>Create New</div>
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
                    onChange = {(e)=> setcategory(e.target.value)}/>
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