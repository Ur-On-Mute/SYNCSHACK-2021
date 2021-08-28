import React, {useState} from 'react'
import Input from './login'
import { useHistory } from 'react-router-dom';

export default function LoginPage(props) {

    let history = useHistory();

    const [userName, setUsername] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.setUser(userName);
        history.push('/');
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <div className="centre">
                    <div className="boxsize"> 
                    <Input
                        id={1}
                        label="Username"
                        locked={false}
                        active={false}
                        type="text"
                        setUser={setUsername}
                    />
                    </div>
                    <div className="boxsize">
                        <Input
                        id={1}
                        label="Password"
                        locked={false}
                        active={false}
                        type="password"
                        />
                    </div>
                </div>
                <button className='btn btn-success' style={{marginLeft:'34.3%'}} type="submit">Log in</button>
            </form>
        </div>
    )
}
