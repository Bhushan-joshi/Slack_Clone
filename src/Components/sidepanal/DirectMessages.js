const { Menu, Icon } = require("semantic-ui-react")


const isUserOnline = user => {
	return user.status === "online"?true:false}


const DireactMessage = props => {
	const users = props.loadedUser
	return (
		<Menu.Menu className="menu">
			<Menu.Item>
				<span>
					<Icon name="send" />DIRECT MESSAGE
				</span>{" "}
				({users.length})
			</Menu.Item>
			{users.map(user => (
				<Menu.Item
					key={user.uid}
					onClick={() => props.ChangeChannel(user)}
					style={{ opacity: .7, fontstyle: 'italic' }}
					active={props.activeChannel===user.uid}
				>
					<Icon
						name="circle"
						color={isUserOnline(user) ? 'green' : 'red'}
					/>
					@{user.name}
				</Menu.Item>
			))}
		</Menu.Menu>
	)
}

export default DireactMessage;