import React, {useState}from 'react';
import {Button, TextField} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import '../../App.css';


const SignIn = ({onSignIn})=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const signIn = async ()=>{
        try{
            const user = await Auth.signIn(username, password);
            history.push('/home');
            onSignIn();


        }catch(error){
            console.log('There was na error logging in ', error)
        }
    };

    return(
        <div className='sigin'>
            <TextField
                id = 'username'
                label = 'Username'
                value = {username}
                onChange={e=> setUsername(e.target.value)}
            />
            <TextField
                id = 'password'
                label = 'Password'
                value = {password}
                type ='password'
                onChange={e=> setPassword(e.target.value)}
            />
            <Button id='signInButton' color='primary' onClick={signIn}>
                Submit
            </Button>
            
            
            
        </div>

        
    )
}

export default SignIn;