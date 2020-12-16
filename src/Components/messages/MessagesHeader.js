import { Header, Icon, Input, Segment } from "semantic-ui-react";

const MessagesHeader=props=>{
	return(
		<Segment clearing>
			{/* channel header */}
			<Header fluid="true" as="h2" floated="left" style={{marginBottom:0}}>
				<span>
				Channel
				<Icon name="star outline" color="black"/></span>
				<Header.Subheader>2 Users</Header.Subheader>
			</Header>
			{/* channel search input */}
			<Header floated="right">
				<Input
				size="mini"
				icon="search"
				name="searchTerm"
				placeholder="search messages"/>
			</Header>
		</Segment>
	)
}
export default MessagesHeader;