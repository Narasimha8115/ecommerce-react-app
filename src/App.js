import './App.css';
import Homepage from './pages/homepage/homepage.component';
import { Route,Switch } from "react-router-dom";
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignup from './pages/signin-and-signup/signin-and-signup.component';
import SignupSingle from './pages/signup/signup.component';
import { auth,createUserProfileDocument } from './firebase/firebase-utils'
import React from 'react';
import { connect } from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';


class App extends React.Component{
  unSubscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUser} = this.props
    this.unSubscribeFromAuth=auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser:{
              id:snapShot.id,
              ...snapShot.data()
            }
          });
           console.log(this.state)
           console.log(this.state.currentUser)
        });

      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={ Homepage }/>
          <Route path='/shop' component={ ShopPage } />
          <Route path="/signin" component={SignInAndSignup} />
          <Route path="/signup" component={ SignupSingle} />
        </Switch>
      </div>
    );

  }
}
const mapDispatchToProps = dispatch => ({

  setCurrentUser:user => dispatch(setCurrentUser(user))

});
export default connect(null,mapDispatchToProps)(App);
