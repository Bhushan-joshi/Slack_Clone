const { Menu, Icon, Label } = require("semantic-ui-react")


const isUserOnline = user => {
	return user.status === "online" ? true : false
}


const DireactMessage = props => {

	const getNotifications = channel => {
		let count = 0;
		props.notifications.forEach(notification => {
			if (notification.id === channel.id) {
				count = notification.count
			}
		})
		if (count > 0) return count
	}

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
					active={props.activeChannel === user.uid}
				>
					{getNotifications(user) && (
						<Label color="red">{getNotifications(user)}</Label>
					)}
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