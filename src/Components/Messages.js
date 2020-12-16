import MessagesForm from "./MessagesForm";
import MessagesHeader from "./MessagesHeader";

const { Segment, Comment } = require("semantic-ui-react")

const MessagesComponent=props=>{
	return(
		<>
			<MessagesHeader/>
			<Segment>
				<Comment.Group className="messages">

				</Comment.Group>
			</Segment>
			<MessagesForm
			{...props}/>
		</>
	)
}

export default MessagesComponent;