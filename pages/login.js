import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Center(props) {
    return (
      <div style={{width: "100%"}}>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "130vh"}}>
          {props.children}
        </div>
      </div>
    );
  }



export default function Login() {
  return (
    <div className="App">
        <img src="https://www.logo.wine/a/logo/Linux/Linux-Logo.wine.svg" alt="Logo"
        style={{position: "absolute", bottom: "50%", left: "40%", height: "295px", width: "295px"}} />
        <Center>
            <div style={{width: "22em"}}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label >Email address</Form.Label>
                        <Form.Control type="email" placeholder="Email"/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </Center>
    </div>
  )
}
