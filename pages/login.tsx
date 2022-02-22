import {Component} from 'react';
import {useNavigate} from 'react-router-dom';
import { Formik,Field,Form,ErrorMessage} from "formik";
import * as Yup from 'yup';
import authService from "../services/auth.service";
import { RouterProps } from "../interface/IrouterProps";
import { useState } from 'react/cjs/react.production.min';
// type Props= useNavigate<RouterProps>();
  
  type State ={
     username:string,
     password:string,
     loading:boolean,
     message:string
  }

export default function Login(){
   const [username,setusername] = useState('');
   const [password,setPassword] = useState('');
   const [loading,setLoading] = useState(false);
   const [message,setMessage] = useState('');
   
    const validationSchema = ()=>{
        return Yup.object().shape({
            username: Yup.string().required('this field is required').min(3).max(10),
            password: Yup.string().required('this field is required').min(3).max(10)
        })
    }

    const handleLogin = (formValue:{username:string,password:string})=>{
       const {username,password} = formValue;
       setMessage('');
       setLoading(true)

       authService.logIn(username,password).then(()=>{
           let navigate =  useNavigate();
           navigate('/profile')
       })
    } 
}