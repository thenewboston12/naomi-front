import React from 'react'
import  { useRef, useState } from "react";

import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import {Link, useNavigate} from 'react-router-dom'


export default function Surveys() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false) // by default we are not loading
    const navigate = useNavigate()
  
    async function handleSubmit(e) {
      e.preventDefault();
      try{
          setError('')
          setLoading(true)
          navigate("/")
       } catch {
          setError('Failed to sign in')
       }
       setLoading(false)
  }


  return (
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
    <div class="card" style={{width: "20rem", padding:"30px"}}>
  <img src="https://cdn.cookielaw.org/logos/3d2b6fb4-6a2f-40e8-9142-8a3a3a25baa0/53a6f138-9454-4f75-bc23-6d93a39b3a01/489b7cbf-b74c-484b-90cd-46f13d297d4f/QualtricsXM_RBG.png" class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">First you have to complete a survey on Qualtrics platform</h5>
    <p class="card-text">We need this to make sure you are registered and to provide best service. You can find the appropriate links at the bottom of this page</p>
  </div>
  
  <div class="card-body">
    <a href="#" class="card-link">First Survey</a>
    <a href="#" class="card-link">Second Survey</a>
  </div>
  <Form onSubmit={handleSubmit}>
           
           
            
            <Button disabled={loading} className="w-100 mt-3" type="submit">
            Proceed
            </Button>
          </Form>

              
</div>
    </Container>
  )
}
