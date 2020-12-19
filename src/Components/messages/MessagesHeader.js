import { Header, Icon, Input, Segment } from "semantic-ui-react";

const MessagesHeader = props => {
	return (
		<Segment clearing>
			{/* channel header */}
			<Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
				<span>
					{props.displayChannelName()}{" "}
					{!props.privateChannel && <Icon name="star outline" color="black" />}</span>
				<Header.Subheader>{props.numUniqueUsers}</Header.Subheader>
			</Header>
			{/* channel search input */}
			<Header floated="right">
				<Input
					onChange={props.search}
					loading={props.searchLoading}
					size="mini"
					icon="search"
					name="searchTerm"
					placeholder="search messages" />
			</Header>
		</Segment>
	)
}
export default MessagesHeader;