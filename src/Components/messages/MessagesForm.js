import { Button, Input, Segment } from "semantic-ui-react";
import FileModal from "./FileModal";
import ProgressBar from "./ProgressBar";
import { Picker } from "emoji-mart";
import 'emoji-mart/css/emoji-mart.css';

const MessagesForm = props => {
	return (
		<Segment className="messages__form">
			{props.emojiPicker && (
				<Picker
					set="apple"
					onSelect={props.handelAddEmojiToMessage}
					className="emojipicker"
					title="Pick Your Emoji"
					emoji="point_up"
				/>
			)}
			<Input
				ref={node => props.focusInput(node)}
				fluid={true}
				name="message"
				style={{ marginBottom: '.7em' }}
				onChange={props.onMessageChange}
				label={
				<Button 
				icon={props.emojiPicker?'close':'add'}
				content={props.emojiPicker?'Close':null} 
				onClick={props.tooglePicker} 

				/>}
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
					disabled={props.uploadState === "uploading.."}
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