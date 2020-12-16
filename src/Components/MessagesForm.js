import { Button, Input, Segment } from "semantic-ui-react";

const MessagesForm = props => {
	return (
		<Segment className="messages__form">
			<Input
				fluid={true}
				name="message"
				style={{ marginBottom: '.7em' }}
				onChange={props.onMessageChange}
				label={<Button icon="add" />}
				value={props.message}
				labelPosition="left"
				placeholder="Write your Message..." />
			<Button.Group icon widths="2">
				<Button
				onClick={props.sendMessage}
				loading={props.msgLoading}
					color="orange"
					content="Add Reply"
					labelPosition="left"
					icon="edit" />

				<Button
					color="teal"
					content="upload file"
					labelPosition="right"
					icon="cloud upload"
				/>

			</Button.Group>
		</Segment>
	)
}

export default MessagesForm;