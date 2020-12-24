import { Link } from "react-router-dom";
import { Button, Form, Grid, Header, Icon, Message, Segment } from "semantic-ui-react";

const signin = (props) => {
	return (
		<Grid textAlign='center' verticalAlign="middle" style={{ height: '100vh' }}>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header style={{ color: '#2196f3', marginBottom: '30px' }} as="h1">
					<Icon name="lock" />Signin
				</Header>
				{props.error && (
					<Message error>
						<p>{props.error}</p>
					</Message>
				)}
				<Form size='big' onSubmit={props.formSubmit} >
					<Segment style={{ padding: 20 }}>
						<Form.Input
							focus
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
							Signin
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
					don't  have account?{" "} <Link to="/register">{" "} Register</Link> here!
				</Message>
			</Grid.Column>
		</Grid>
	)
}

export default signin;