import {Component} from 'react';
import {useNavigate} from 'react-router-dom';
import { Formik,Field,Form,ErrorMessage} from "formik";
import * as Yup from 'yup';
import authService from "../services/auth.service";
import { RouterProps } from "../interface/IrouterProps";
import React, {useState} from 'react';


export default function Login(){
   const [username,setusername] = useState<string>('');
   const [password,setPassword] = useState<string>('');
   const [loading,setLoading] = useState<boolean>(false);
   const [message,setMessage] = useState<string>('');
   
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
       }, error=>{
           const resMessage = (error.reponse && error.response.data && error.response.message || error.message || error.toString());
           setLoading(false);
           setMessage(resMessage);
       })
    } 
     
    const initialValues ={
      username,
      password
    };

    return(
        <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field name="username" type="text" className="form-control" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    )
}