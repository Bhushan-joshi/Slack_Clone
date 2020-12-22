import { Grid } from "semantic-ui-react"
import ColorPanel from "./Colorpanel/ColorPanel"
import Messages from "./Messages/Messages"
import Sidepanel from "./Sidepanel/Sidepanel"
import Metapanel from "./Metapanel/Metapanel"
import { connect } from "react-redux";

const Panel = props => {
	return (
		<Grid columns="equal" className="app" style={{ background: '#eee' }}>
			<ColorPanel />
			<Sidepanel
				key={props.user && props.user.uid}
				currentChannel={props.currentChannel}
				user={props.user}
			/>
			<Grid.Column style={{ marginLeft: 320 }}>
				<Messages
					key={props.currentChannel && props.currentChannel.id}
					currentChannel={props.currentChannel}
					isPrivateChannel={props.isPrivateChannel}
					user={props.user} />
			</Grid.Column>
			<Grid.Column width={4}>
				<Metapanel
					key={props.currentChannel && props.currentChannel.id}
					currentChannel={props.currentChannel}
					isPrivateChannel={props.isPrivateChannel}
					userPosts={props.userPosts}
				/>
			</Grid.Column>
		</Grid>
	)
}


const mapStateToProps = state => {
	return {
		user: state.user.currentUser,
		currentChannel: state.channel.currentChannel,
		isPrivateChannel: state.channel.isPrivateChannel,
		userPosts:state.posts.usersPosts
	}
}

export default connect(mapStateToProps)(Panel);