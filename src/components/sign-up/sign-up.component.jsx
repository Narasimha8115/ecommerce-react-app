import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth,createUserProfileDocument } from '../../firebase/firebase-utils';
import { Link } from 'react-router-dom';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(){
        super();
        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
     }}

    handleSubmit = async event=>{
         event.preventDefault();
         const { displayName,email,password,confirmPassword} = this.state;

         if(password !== confirmPassword ){
             alert("passwords don't match");
             return;
         }
         try{
          const {user} = await auth.createUserWithEmailAndPassword(email,password);
          
          await createUserProfileDocument(user,displayName);
          this.setState
          ({
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
          })
         }catch(error){
            console.error(error)
         }}
    handleChange = event => {
        const {name,value} = event.target;
        this.setState({[name]:value});
        console.log(name,value)
        
    };
    
    render() { 
        const {displayName,email,password,confirmPassword}=this.state;
        return (


            <div className='for-color'>
            <div className='signup'>
                <h2 className='title'>I do not have an account</h2>
                <span className='title'>sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={this.handleChange}
                    label='Display Name'
                    required
                    />
                    <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                    label='Email'
                    required
                    />

                    <FormInput
                    type='password'
                    name='password'
                    value={ password }
                    onChange={this.handleChange}
                    label='Password'
                    
                    />

                    <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={this.handleChange}
                    label='Confirm Password'
                    required
                    />


                    <CustomButton  type='submit'>Sign Up</CustomButton>
                    <div className='redirecting-to-sign-In'>Don't have an account ?<Link to="/signin" className='sign'>Sign In</Link></div>
                </form>

               </div>
            </div>

        );
    }
}
 
export default SignUp;