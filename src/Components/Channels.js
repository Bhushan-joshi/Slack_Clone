import { Button, Form, Icon, Input, Menu, Modal, TextArea } from "semantic-ui-react"


const Channels = props => {

	const displayChannels = () => (
		(props.channels.length > 0)&&( props.channels.map(channel => (
			<Menu.Item
			key={channel.id}
			name={channel.name}
			style={{fontSize:'1.2rem',opacity:.7}}
			onClick={()=>{console.log(channel);}}>
				# {channel.name}
			</Menu.Item>
		))
	))

	return (
		<>
			<Menu.Menu style={{ padding: '.5em 0 2em 0' }}>
				<Menu.Item>
					<span>
						<Icon name="exchange" /> CHANNELS
				</span>{" "}
				({props.channels.length})
				<Icon name="add circle" onClick={props.openModal} />
				</Menu.Item>
				{/* channels  list*/}
				{displayChannels()}
			</Menu.Menu>
			{/* NEW CHANNEL MODAL */}
			<Modal open={props.modal} onClose={props.closeModal} >
				<Modal.Header style={{ textAlign: 'center', fontSize: '2rem' }}>Add New Channel</Modal.Header>
				<Modal.Content>
					<Form onSubmit={props.submitNewForm}>
						<Form.Field>
							<Input
								fluid
								placeholder="name of Channel"
								name="channelName"
								onChange={props.changeInput} />
						</Form.Field>
						<Form.Field>
							<TextArea
								fluid
								placeholder="About the Channels"
								name="channelDesc"
								onChange={props.changeInput} />
						</Form.Field>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Button color="green" inverted onClick={props.submitNewForm}>
						<Icon name="checkmark" />ADD
					</Button>
					<Button color="red" inverted onClick={props.closeModal}>
						<Icon name="remove" />CANCLE
					</Button>
				</Modal.Actions>
			</Modal>
		</>
	)
}

export default Channels;