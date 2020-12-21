import { Accordion, Header, Icon, Image, Segment } from "semantic-ui-react";

const MetapanelComponent = props => {
	if (props.isPrivateChannel) return null
	return (
		<Segment loading={!props.currentChannel}>
			<Header as="h3" attached="top">
				<span>About {" "} <Icon name="hashtag">{props.currentChannel && props.currentChannel.name}</Icon></span>
			</Header>
			<Accordion styled attached>
				<Accordion.Title
					active={props.activeIndex === 0}
					index={0}
					onClick={props.setActiveIndex}
				>
					<Icon name="dropdown" />
					<Icon name="info" />
					Channel details
				</Accordion.Title>
				<Accordion.Content
					active={props.activeIndex === 0}
				>
					{props.currentChannel && props.currentChannel.details}
				</Accordion.Content>

				<Accordion.Title
					active={props.activeIndex === 1}
					index={1}
					onClick={props.setActiveIndex}
				>
					<Icon name="dropdown" />
					<Icon name="user circle" />
					Top Poster
				</Accordion.Title>
				<Accordion.Content
					active={props.activeIndex === 1}
				>
					Poster
				</Accordion.Content>
				<Accordion.Title
					active={props.activeIndex === 2}
					index={2}
					onClick={props.setActiveIndex}
				>
					<Icon name="dropdown" />
					<Icon name="pencil alternate" />
					Created by
				</Accordion.Title>
				<Accordion.Content
					active={props.activeIndex === 2}
				>
					<Header as="h4">
						<Image src={props.currentChannel && props.currentChannel.createdBy.avatar} size="mini" circular />
						{props.currentChannel && props.currentChannel.createdBy.name}
					</Header>
				</Accordion.Content>
			</Accordion>
		</Segment>
	)
}

export default MetapanelComponent;