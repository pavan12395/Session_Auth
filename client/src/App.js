import {useState} from 'react'

import {Form,Button} from 'react-bootstrap'
import {Routes,Route} from 'react-router-dom'
import SignUp from './SignUp'
import Login from './Login'
import Dashboard from './Dashboard'
import AuthProvider from './AuthProvider'
export default function App()
{
    return (
      <AuthProvider>
      <Routes>
        <Route exact path='/' element={<SignUp/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
      </AuthProvider>
    )
}