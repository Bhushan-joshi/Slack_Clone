import { Button, Input, Segment } from "semantic-ui-react";
import FileModal from "./FileModal";
import ProgressBar from "./ProgressBar";

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
					onClick={props.openModal}
					disabled={props.uploadState==="uploading.."}
					content="upload file"
					labelPosition="right"
					icon="cloud upload"
				/>
			</Button.Group>
			<FileModal
				{...props}
			/>
			<ProgressBar
				{...props}
			/>
		</Segment>
	)
}

export default MessagesForm;