import { Dropdown, Grid, Header, Icon, Image } from "semantic-ui-react"

const UserPanel = props => {
	const dropDownOption = () => [
		{
			text: <span>Signed in as <strong>{props.user.displayName}</strong></span>,
			disabled: true,
			key: 1,
		},
		{
			text: <span>Change Avatar</span>,
			key: 2,
		},
		{
			text: <span onClick={props.signOut}>Signed out</span>,
			key: 3
		}
	]	
	return (
		<Grid style={{ background: '#4c3c4c' }}>
			<Grid.Column>
				{/* app Header */}
				<Grid.Row style={{ padding: '1.2em', margin: 0 }}>
					<Header inverted floated="left" as="h2">
						<Icon name="slack" color="teal" />
						<Header.Content>Slack</Header.Content>
					</Header>
					{/* User Dropdown ,textAlign:'center' */}
					<Header style={{ padding: '.5em', paddingTop: 20 }} as="h4" inverted>
						<Dropdown
							trigger={
								<span>
									<Image src={props.user.photoURL} spaced="right" avatar />
									{props.user.displayName}
								</span>
							}
							options={dropDownOption()} />
					</Header>
				</Grid.Row>

			</Grid.Column>
		</Grid>
	)
}

export default UserPanel;