import { Component } from 'react'
import Register from '../../Components/Auth/Register'
import firebase from '../../firebase';
import md5 from 'md5';

class RegisterContainer extends Component {
	state = {
		formData: {
			email: '',
			password: '',
			firstName: '',
			lastName: ''
		},
		loading: false,
		error: null,
	}
	componentDidMount(){
		document.title="Register"
	}
	isFormValid = () => {
		return (
			this.state.formData.email.length > 0 ||
			this.state.formData.firstName.length > 0 ||
			this.state.formData.lastName.length > 0 ||
			this.state.formData.password.length > 0
		)
	}
	onSubmit = e => {
		this.setState({ loading: true })
		if (this.isFormValid) {
			e.preventDefault();
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.state.formData.email, this.state.formData.password)
				.then(createdUser => {
					createdUser.user.updateProfile({
						displayName: `${this.state.formData.firstName} ${this.state.formData.lastName}`,
						photoURL: `https://www.gravatar.com/avatar/${md5(this.state.formData.email)}?d=identicon`
					}).then(user => {
						this.setState({ loading: false })
					})
				})
				.catch(err => {
					console.log(err);
					this.setState({ loading: false, error: err.message })
				})
		}

	}

	signinWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(user => {
				console.log(user);
			}).catch(err => {
				console.log(err);
			})
	}

	onValChange = e => {
		const updateForm = {
			...this.state.formData,
			[e.target.name]: e.target.value
		}
		this.setState({ formData: updateForm })
	}
	render() {
		return (
			<Register
				formSubmit={this.onSubmit}
				loading={this.state.loading}
				valChange={this.onValChange}
				error={this.state.error}
				signinWithGoogle={this.signinWithGoogle} />
		)
	}
}

export default RegisterContainer;