import { Component } from 'react'
import Signin from '../../Components/Auth/Signin';

class SigninContainer extends Component {
	state = {
		formData: {
			email: '',
			password: '',
		},
		loading: false,
		// disable:true
	}
	onSubmit = () => {
		this.setState({ loading: true })
		alert('Register!')
		this.setState({ loading: false })
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
			<Signin
				formSubmit={this.onSubmit}
				loading={this.state.loading}
				valChange={this.onValChange} />
		)
	}
}

export default SigninContainer;