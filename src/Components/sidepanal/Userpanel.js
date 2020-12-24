import { Button, Dropdown, Grid, Header, Icon, Image, Input, Modal } from "semantic-ui-react"
import AvatarEditor from "react-avatar-editor";
import logo from '../../assets/index.svg'

const UserPanel = props => {
	const dropDownOption = () => [
		{
			text: <span>Signed in as <strong>{props.user.displayName}</strong></span>,
			disabled: true,
			key: 1,
		},
		{
			text: <span onClick={props.openAvatarModal}>Change Avatar</span>,
			key: 2,
		},
		{
			text: <span onClick={props.signOut}>Signed out</span>,
			key: 3
		}
	]
	return (
		<Grid style={{ background: props.primaryColor }}>
			<Grid.Column>
				{/* app Header */}
				<Grid.Row style={{ padding: '1.2em', margin: 0 }}>
					<Header inverted floated="left" as="h2">
						<Image src={logo} style={{height:50,width:50}}/>
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
				<Modal open={props.avatarModal} onClose={props.closeAvatarModal}>
					<Modal.Header style={{ textAlign: 'center' }}>Change Avatar</Modal.Header>
					<Modal.Content>
						<Input
							onChange={props.handleAvatarReader}
							type="file"
							fluid
							style={{ margin: '3.5em auto' }}
							label="New Avatar"
							name="previewImage"
						/>
						<Grid centered stackable columns={2}>
							<Grid.Row centered>
								<Grid.Column className="ui center aligned grid">
									{props.previewImage && (
										<AvatarEditor
											ref={node => props.setAvatarEditor(node)}
											image={props.previewImage}
											scale={1.2}
											border={1}
										/>
									)}
								</Grid.Column>
								<Grid.Column>
									{props.croppedImage && (
										<Image
											style={{ margin: '3.5em auto' }}
											src={props.croppedImage}
											width={100}
											height={100}
										/>
									)}
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Modal.Content>
					<Modal.Actions>
						{props.croppedImage && (<Button color="green" inverted onClick={props.changeAvatar}>
							<Icon name="cloud upload" /> Change Avatar
						</Button>)}
						<Button color="green" inverted onClick={props.handleCropImage}>
							<Icon name="image" /> Preview
						</Button>
						<Button color="red" inverted onClick={props.closeAvatarModal}>
							<Icon name="remove" /> Cancel
						</Button>
					</Modal.Actions>
				</Modal>
			</Grid.Column>
		</Grid>
	)
}

export default UserPanel;