import { Menu } from "semantic-ui-react";
import Channels from "./Channels";
import DireactMessage from "./DirectMessages";
import UserPanel from "./Userpanel";

const SidepanelComponent = props => {
	return (
		<Menu
			size="large"
			inverted
			fixed="left"
			vertical
			style={{ background: '#4c3c4c' }}>
			<UserPanel
				signOut={props.signOut}
				user={props.user} />
			<Channels
				channels={props.channels}
				{...props}/>
			<DireactMessage
			{...props}/>
		</Menu>
	)
}

export default SidepanelComponent;