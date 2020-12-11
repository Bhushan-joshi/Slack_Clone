import { Link } from "react-router-dom";
import { Button, Form, Grid, Header, Icon, Message, Segment } from "semantic-ui-react";

const register = (props) => {
	return (
		<Grid textAlign='center' verticalAlign="middle" style={{ height: '100vh' }}>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header style={{ color: '#2196f3', marginBottom: '30px' }} as="h1">
					<Icon name="user" />Register
				</Header>
				{props.error && (
					<Message error>
						<p>{props.error}</p>
					</Message>
				)}
				<Form size='big' onSubmit={props.formSubmit} >
					<Segment>
						<Form.Group widths="equal">
							<Form.Input
								type="text"
								placeholder="First Name"
								name='firstName'
								onChange={props.valChange}
								required />
							<Form.Input
								type="text"
								placeholder="Last Name"
								name="lastName"
								onChange={props.valChange}
								required />
						</Form.Group>
						<Form.Input
							type='email'
							placeholder="Enter Email address"
							name="email"
							onChange={props.valChange}
							required />
						<Form.Input
							type='password'
							placeholder="Enter password"
							name="password"
							onChange={props.valChange}
							required />
						<Button color="blue"
							fluid
							inverted
							size="large"
							loading={props.loading}
						>
							Register
						</Button>
					</Segment>
				</Form>
				<Button color="google plus"
					fluid
					style={{ marginTop: 20 }}
					size="large"
					onClick={props.signinWithGoogle}
				>
					<Icon name="google" />continue with Google
				</Button>
				<Message style={{ marginTop: 20, background: '#eeeeee' }}>
					Already have an account? <Link to="/signin">Signin</Link>
				</Message>
			</Grid.Column>
		</Grid>
	)
}

export default register;