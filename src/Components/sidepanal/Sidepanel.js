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
			style={{ background: props.primaryColor }}>
			<UserPanel
				{...props} />
			<Channels
				{...props}/>
			<DireactMessage
			{...props}/>
		</Menu>
	)
}

export default SidepanelComponent;