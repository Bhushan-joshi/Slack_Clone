import Message from "./Message";
import MessagesForm from "./MessagesForm";
import MessagesHeader from "./MessagesHeader";

const { Segment, Comment, Dimmer, Loader } = require("semantic-ui-react")

const MessagesComponent = props => {
	
	return (
		<>
			<MessagesHeader />
			<Segment>
				<Comment.Group className="messages">
					{ props.loadingMSGS?<Dimmer active>
						<Loader/>
					</Dimmer> :props.messages.map(message => (
						<Message
							key={message.timestamp}
							message={message}
							user={props.user}
						/>
					))}
				</Comment.Group>
			</Segment>
			<MessagesForm
				{...props} />
		</>
	)
}

export default MessagesComponent;