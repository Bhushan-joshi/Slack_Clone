import { Component } from 'react'
import Signin from '../../Components/Auth/Signin';
import firebase from '../../firebase';

class SigninContainer extends Component {
	state = {
		formData: {
			email: '',
			password: '',
		},
		loading: false,
		error: null
	}
	componentDidMount(){
		document.title="Login"
	}
	isFormValid = () => {
		return (
			this.state.formData.email.length > 0 ||
			this.state.formData.password.length > 0
		)
	}
	onSubmit = e => {
		this.setState({ loading: true })
		if (this.isFormValid()) {
			e.preventDefault();
			firebase
				.auth()
				.signInWithEmailAndPassword(this.state.formData.email, this.state.formData.password)
				.then(user => {
					this.setState({ loading: false });
				}).catch(err => {
					console.error(err);
					this.setState({ loading: false, error: err.message });
				})
		}
	}
	onValChange = e => {
		const updateForm = {
			...this.state.formData,
			[e.target.name]: e.target.value
		}
		this.setState({ formData: updateForm })
	}

	signinWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(user => {
				this.saveCreatedUser(user)
			}).catch(err => {
				console.log(err);
			})
	}

	render() {
		return (
			<Signin
				formSubmit={this.onSubmit}
				loading={this.state.loading}
				valChange={this.onValChange}
				error={this.state.error} 
				signinWithGoogle={this.signinWithGoogle}/>
		)
	}
}

export default SigninContainer;