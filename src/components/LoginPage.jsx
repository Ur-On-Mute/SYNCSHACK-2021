import React, {useState} from 'react'
import Input from './login'
import { useHistory } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function LoginPage(props) {

    let history = useHistory();

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidFlag, setInvalidFlag] = useState(false);

    const handleSignIn = async (event) => {
        event.preventDefault();
        let {data, error} = await supabase
            .from("Users")
            .select('Username, Password')
            .eq('Username', userName)
            .eq('Password', password)
        console.log(data);
        if (data && data.length == 1) {
            props.setUser(userName)
            history.push('/');
        } else {
            setInvalidFlag(true);
        }
    }

    const signUp = async (event) => {
        event.preventDefault();
        const {data, error} = await supabase
            .from('Users')
            .upsert([
                {Username: userName, Password: password}
            ])
        props.setUser(userName)
        history.push('/')
    }

    const verifyUser = async () => {
        let {data, error} = await supabase
            .from("Users")
            .select('Username, Password')
            .eq('Username', userName)
            .eq('Password', password)
        console.log(data);
        if (data && data.length == 1) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className="login">
            <form>
                <div className="centre">
                    {invalidFlag && <p style={{color:'red'}}>Invalid Username / password</p>}
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
                        setPassword={setPassword}
                        />
                    </div>
                </div>
                <button className='btn btn-success' style={{marginLeft:'34.3%'}} onClick={handleSignIn}>Log in</button>
                <button className='btn btn-success' style={{marginLeft:'16.5%'}} onClick={signUp}>Sign up</button>
            </form>
        </div>
    )
}
