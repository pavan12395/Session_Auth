import {useRef,useState} from 'react'
import {Form,Button,Modal} from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import {useAuth} from './AuthProvider';
export default function SignUp()
{
   const emailRef=useRef();
   const nameRef=useRef(); 
   const passwordRef=useRef(); 
   const navigate = useNavigate(); 
   const [error,setError] = useState('');
   const {setUser} = useAuth();
   const loginHandler=async (e)=>
   {
       try
       {
        e.preventDefault();
        axios.defaults.withCredentials=true;
        const response = await axios.post("http://localhost:5000/login",{name:nameRef.current.value,email:emailRef.current.value,password:passwordRef.current.value},{withCredentials:true});
        console.log("pavan:login",response.headers);
        if(response.status==200)
        {
           setUser({name:nameRef.current.value,email:emailRef.current.value}); 
           navigate("/dashboard");
        }
        else
        {
            throw new Error(response.data);
        }
        nameRef.current.value='';
        emailRef.current.value='';
        passwordRef.current.value='';
       }
       catch(err)
       {
           console.log(err);
           setError(err.response.status+" : "+err.response.data);
       }
   }
   return(
    <div className='center-form'>
   <Form className='form'>
       <Form.Group>
           <Form.Label>Email Address</Form.Label>
           <Form.Control type='email' ref={emailRef}></Form.Control>
       </Form.Group>
       <Form.Group>
           <Form.Label>Name</Form.Label>
           <Form.Control type='text' ref={nameRef}></Form.Control>
       </Form.Group><Form.Group>
           <Form.Label>Password</Form.Label>
           <Form.Control type='password' ref={passwordRef}></Form.Control>
       </Form.Group>
       <Form.Control type='submit' onClick={loginHandler} value='Login'></Form.Control>
   </Form>
   <Modal show={error.length!=0} onHide={(e)=>{setError("");}}>
       <Modal.Header closeButton>Error!</Modal.Header>
       <Modal.Body>Message : {error}</Modal.Body>
   </Modal>
   <p className='text-center'>Dont have an Account ? <Link to='/'>SignUp</Link></p>
   </div>
   );
}