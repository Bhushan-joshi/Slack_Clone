import { Button, Form, Icon, Input, Label, Menu, Modal, TextArea } from "semantic-ui-react"



const Channels = props => {

	const getNotifications = channel => {
		let count = 0;
		props.notifecations.forEach(notification => {
			if (notification.id===channel.id) {
				count=notification.count
			}
		})
		if (count>0) return count
	}
	const displayChannels = () => (
		(props.channels.length > 0) && (props.channels.map(channel => (
			<Menu.Item
				key={channel.id}
				name={channel.name}
				style={{ fontSize: '1.2rem', opacity: .7 }}
				onClick={() => props.setChannel(channel)}
				active={props.activeChannel === channel.id}>
				{getNotifications(channel) && (
					<Label color="red">{getNotifications(channel)}</Label>
				)}
				<span style={{ fontSize: '1.2rem' }}>#{channel.name}</span>
			</Menu.Item>
		))
		))

	return (
		<>
			<Menu.Menu className="menu">
				<Menu.Item>
					<span>
						<Icon name="exchange" /> CHANNELS
				</span>{" "}
				({props.channels.length})
				<Icon name="add circle" onClick={props.openModal} />
				</Menu.Item>

				{/* channels  list*/}
				{props.loadingChannels ? <p style={{ color: 'whitesmoke' }}>Loading...</p> : displayChannels()}

			</Menu.Menu>
			{/* NEW CHANNEL MODEL */}
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