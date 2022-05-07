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
   const repasswordRef=useRef();
   const navigate = useNavigate();
   const [error,setError] = useState(""); 
   const {setUser} = useAuth();
   const signUpHandler=async (e)=>
   {
       try
       {
        e.preventDefault();
        if(passwordRef.current.value!=repasswordRef.current.value)
        {
           throw new Error("Passwords Mismatch Please Check");
           return;
        }
        const response = await axios.post("http://localhost:5000/signup",{name:nameRef.current.value,email:emailRef.current.value,password:passwordRef.current.value},{withCredentials:true});
        console.log("pavan:signup",response);
        if(response.status==200)
        {
           setUser({name:nameRef.current.value,email:emailRef.current.value});
           navigate("/dashboard");
        }
        else
        {
           throw new Error(response.data);
        }
        emailRef.current.value='';
        nameRef.current.value='';
        passwordRef.current.value='';
        repasswordRef.current.value='';
      }
      catch(err)
      {
          setError(err.message);
      }
   }
   return(
    <div class='center-form'>
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
       </Form.Group><Form.Group>
           <Form.Label>Confirm Password</Form.Label>
           <Form.Control type='password' ref={repasswordRef}></Form.Control>
       </Form.Group>
       <Form.Control type='submit' onClick={signUpHandler} value='Signup' className='submit-form'></Form.Control>
   </Form>
   <p className='text-center'>Already a User ? <Link to='/login'>login</Link></p>
   <Modal show={error.length!=0} onHide={(e)=>{setError("")}} className='modal'>
      <Modal.Header closeButton>Error!</Modal.Header>
      <Modal.Body>message : {error}</Modal.Body>
   </Modal>
   </div>
   );
}