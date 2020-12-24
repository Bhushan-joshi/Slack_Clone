import Message from "./Message";
import MessagesForm from "./MessagesForm";
import MessagesHeader from "./MessagesHeader";
import { Segment, Comment } from "semantic-ui-react"
import { Skeleton } from "../util/Skeleton";

const displaySkaleton=(loading)=>(
	loading?(
		<>
			{[...Array(7)].map((_,i)=>(
				<Skeleton key={i} />
			))}
		</>
	):null
)

const MessagesComponent = props => {
	
	return (
		<>
			<MessagesHeader
			{...props} />
			<Segment>
				<Comment.Group className="messages">
					{displaySkaleton(props.loadingMSGS)}
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