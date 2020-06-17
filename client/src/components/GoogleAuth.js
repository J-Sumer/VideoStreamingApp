import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2' , () => {
            window.gapi.client.init({
                clientId: '58738886264-l5i6c3hgke7hg41cij6idilcdcf1e866.apps.googleusercontent.com',
                scope: 'email'
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                
                //this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                //this.onAuthChange(); // instead of above line we can use this
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        }); //To load client version of library
    }

    onAuthChange = (isSignedI) => { // here isSignedI is passed from listen fucntion of auth.  i.e auth.isSignedIn.listen will send a parameter which says whether we are logged in or not in the form of boolean
        if (isSignedI){
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton = () => {
        if(this.props.isSignedIn === null){
            return <div></div>
        }else if(this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className = "ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        }else{
            return (
                <button onClick={this.onSignInClick} className = "ui green google button">
                    <i className="google icon"/>
                    Sign In with google
                </button>
            )
        }
    }
    render(){
        return <div>{ this.renderAuthButton() }</div>
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps , {signIn , signOut})(GoogleAuth);