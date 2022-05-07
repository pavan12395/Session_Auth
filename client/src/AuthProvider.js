import React,{useState,useEffect, useContext} from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export const useAuth=()=>
{
    return useContext(AuthContext);
}

export default function AuthProvider(props)
{
    const [user,setUser] = useState(null);
    const navigate=useNavigate();
    useEffect(async ()=>
    {
         console.log(document.cookie);
         const response = await axios.get("http://localhost:5000/checkSession",{withCredentials:true});
         console.log(response);
         const {data}=response;
         console.log(data.session);
         if(data.session)
         {
             setUser(data.user);
             navigate('/dashboard');
         }
         else
         {
             setUser({email:'',name:''});
         }
    },[]);
    return(
        <AuthContext.Provider value={{user:user,setUser:setUser}}>
        {props.children}
        </AuthContext.Provider>
    )
}