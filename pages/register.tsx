import React, { Component, useState } from 'react';
 import Link from 'next/link';
import { connect } from 'react-redux';
import { Formik,Field,Form,ErrorMessage} from "formik";
import * as Yup from 'yup';
import authService from '../services/auth.service';
import 'bootstrap/dist/css/bootstrap.css'

export default function Register(){
    const [username,setUsername] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [successful,setSuccessful] = useState<boolean>(false);
    const [message,setMessage] = useState<string>('');


    const validationSchema = ()=>{
        return Yup.object().shape({
          username: Yup.string().required('username is required').test("len","username should be between 3 and 20 characters",(val:any)=>
           val && val.toString().length >=3 && val.toString().length <=20
          ),
          email:  Yup.string().required('email is required').email('invalid email').required('email is required'),
          password: Yup.string().test("len","password should be between 6 and 40 characters", (val:any)=>
             val && val.toString().length >=6 && val.toString().length <=40
          ).required('password is required')
        })
    }

    const handleRegister = (formValue:{username,email,password}) =>{
       
        authService.register(username,email,password).then(response=>{
            setMessage(response.data.message);
            setSuccessful(true);
        }, 
        
        error =>{
            const resMessage = (error.reponse && error.response.data && error.response.data.message
             || error.message || error.toString()      
          )
          setSuccessful(false);
          setMessage(resMessage);
        }
        );
    }

    const initialValues = {
        username,
        email,
        password
    }
    return(
        <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
            width={100}
            height={100}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group col-2">
                    <label htmlFor="username"> Username </label>
                    <Field name="username" type="text" className="form-control" />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group col-2">
                    <label htmlFor="email"> Email </label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group col-2">
                    <label htmlFor="password"> Password </label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>
              )}
              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
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