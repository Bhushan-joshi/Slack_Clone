import Message from "./Message";
import MessagesForm from "./MessagesForm";
import MessagesHeader from "./MessagesHeader";

const { Segment, Comment } = require("semantic-ui-react")

const MessagesComponent = props => {
	
	return (
		<>
			<MessagesHeader
			{...props} />
			<Segment>
				<Comment.Group className="messages">
					{props.searchTerm? 
						props.searchResult.map(message => (
							<Message
								key={message.timestamp}
								message={message}
								user={props.user}
							/>
						))
					: props.messages.map(message => (
						<Message
							key={message.timestamp}
							message={message}
							user={props.user}
						/>
					))}
					<div ref={node=>props.msgEnd(node)}></div>
				</Comment.Group>
			</Segment>
			<MessagesForm
				{...props} />
		</>
	)
}

export default MessagesComponent;