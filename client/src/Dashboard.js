import {useAuth} from './AuthProvider';
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Dashboard()
{
    const navigate=useNavigate();
    const {setUser} = useAuth();
    const logOutHandler=async (e)=>
    {
        e.preventDefault();
        const response = await axios.get("http://localhost:5000/logout",{withCredentials:true});
        if(response.status==200)
        {
            setUser(null);
            navigate("/");
        }
    }
     const {user} = useAuth();
     if(user)
     {
        if(user.email!='' && user.name!=''){
            return(
         <>
         <div className='center-dashboard'>
         <h1>Email : {user.email}</h1>
         <h1>Name : {user.name}</h1>
         <div className='logout-container'>
             <Button onClick={logOutHandler}>Logout</Button>
         </div>
         </div>
         </>)
        }
        else
        {
            return(
                <>
                <div className='center-dashboard'>
                <h1>No Session</h1>
                <div className='logout-container'>
                    <Button onClick={(e)=>{navigate("/")}}>SignUp</Button>
                </div>
                </div>
                </>
            );
        }
     }
     else
     {
         return <h1>Loading</h1>
     }
}