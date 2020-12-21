import { Component } from "react";
import SidepanelComponent from "../../../Components/sidepanal/Sidepanel";
import firebase from '../../../firebase';
import { connect } from "react-redux";
import { setChannels, setPrivateChannel } from "../../../Store/Actions/channelsActions";


class Sidepanel extends Component {
	state = {
		channels: [],
		modal: false,
		modalForm: {
			channelName: '',
			channelDesc: ''
		},
		channelsRef: firebase.database().ref("channels"),
		loadingChannels: false,
		firstLoad: true,
		activeChannel: null,
		usersRef: firebase.database().ref('users'),
		loadedUser: [],
		connectedRef: firebase.database().ref('.info/connected'),
		presenceRef: firebase.database().ref('presence'),
		channel: null,
		messagesRef: firebase.database().ref('messages'),
		notifications: [],
	}

	componentDidMount() {
		this.loadChannels();
		this.loadUsers(this.props.user.uid)
	}
	componentWillUnmount() {
		this.removeListeners();
	}

	removeListeners = () => {
		this.state.channelsRef.off();
	}

	loadUsers = currentUser => {
		let loadedUser = [];
		this.state.usersRef.on('child_added', snap => {
			if (currentUser !== snap.key) {
				let user = snap.val();
				user['uid'] = snap.key;
				user['status'] = "offline"
				loadedUser.push(user);
				this.setState({ loadedUser })
			}
		})
		this.state.connectedRef.on('value', snap => {
			if (snap.val() === true) {
				const ref = this.state.presenceRef.child(currentUser);
				ref.set(true);
				ref.onDisconnect().remove(err => {
					err && console.log(err)
				})
			}
		})
		this.state.presenceRef.on('child_added', snap => {
			this.addStatusToUser(snap.key)
		})
		this.state.presenceRef.on('child_removed', snap => {
			this.addStatusToUser(snap.key, false)
		})
	}

	addStatusToUser = (userId, connected = true) => {
		const updateUser = this.state.loadedUser.reduce((acc, user) => {
			if (user.uid === userId) {
				user['status'] = `${connected ? 'online' : 'offline'}`
			}
			return acc.concat(user)
		}, [])
		this.setState({ loadedUser: updateUser });
	}

	loadChannels = () => {
		this.setState({ loadingChannels: true })
		let channelsArray = [];
		this.state.channelsRef.on('child_added', snapOfData => {
			channelsArray.push(snapOfData.val());
			this.setState({ channels: channelsArray, loadingChannels: false }, () => this.setFirstChannel())
			this.addNotificationsListners(snapOfData.key)
		})
	}

	addNotificationsListners = channelId => {
		this.state.messagesRef.child(channelId)
			.on('value', snap => {
				if (this.state.channel) {
					this.handleNotifications(channelId, this.state.channel.id, this.state.notifications, snap)
				}
			})
	}

	handleNotifications = (channelId, currentChannelId, notification, snap) => {
		let lastTotal = 0;
		let index = notification.findIndex(notifi => notifi.id === channelId);
		if (index !== -1) {
			if (channelId !== currentChannelId) {
				lastTotal = notification[index].total;
				if (snap.numChildren() - lastTotal > 0) {
					notification[index].count = snap.numChildren() - lastTotal
				}
			}
			notification[index].lastKnownTotal = snap.numChildren();
		} else {
			notification.push({
				id: channelId,
				total: snap.numChildren(),
				lastKnownTotal: snap.numChildren(),
				count: 0
			})
		}
		this.setState({ notifications: notification })
	}

	ChangeChannel = user => {
		const ChannelId = this.getChannelId(user.uid)
		const channelData = {
			id: ChannelId,
			name: user.name
		}
		this.props.setChannel(channelData);
		this.props.setPrivateChannel(true);
		this.setState({ activeChannel: user.uid })
	}

	getChannelId = userId => {
		const currentUserId = this.props.user.uid;
		return userId < currentUserId ?
			`${userId}/${currentUserId}` : `${currentUserId}/${userId}`
	}
	changeInput = e => {
		const updatedForm = {
			...this.state.modalForm,
			[e.target.name]: e.target.value,
		}
		this.setState({ modalForm: updatedForm })
	}

	closeModal = () => {
		this.setState({ modal: false })
	}

	openModal = () => {
		this.setState({ modal: true })
	}

	signOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				console.log('logout');
			}).catch(err => {
				console.log(err);
			})
	}
	isFormValid = () => (this.state.modalForm.channelName && this.state.modalForm.channelDesc)

	addChannel = () => {

		const { channelsRef, modalForm } = this.state

		const key = channelsRef.push().key

		const newChannel = {
			id: key,
			name: modalForm.channelName,
			details: modalForm.channelDesc,
			createdBy: {
				name: this.props.user.displayName,
				avatar: this.props.user.photoURL
			}
		}
		channelsRef.child(key)
			.update(newChannel)
			.then(() => {
				this.setState({
					modalForm: {
						channelName: '',
						channelDesc: ''
					}
				})
				this.closeModal();
				console.log('channel added!');
			})
			.catch(err => {
				console.log(err);
			})
	}

	submitNewForm = e => {
		e.preventDefault();
		if (this.isFormValid()) {
			this.addChannel();
		}
	}
	setFirstChannel = () => {
		const firstChannel = this.state.channels[0];
		if (this.state.firstLoad && this.state.channels.length > 0) {
			this.activeChannel(firstChannel)
			this.props.setChannel(firstChannel)
			this.setState({channel:firstChannel})
		}
		this.setState({ firstLoad: false })
	}
	activeChannel = channel => {
		this.clearNotification();
		this.setState({ activeChannel: channel.id, channel: channel })
	}
	clearNotification = () => {
		let index=this.state.notifications.findIndex(notifi=>notifi.id===this.state.channel.id)
		if (index !==-1) {
			let updatedNotifications=[...this.state.notifications]
			updatedNotifications[index].total=this.state.notifications[index].lastKnownTotal
			updatedNotifications[index].count=0;
			this.setState({notifications:updatedNotifications})
		}
	}

	setChannel = (channel) => {
		this.activeChannel(channel)
		this.props.setChannel(channel)
	}

	render() {
		return (
			<SidepanelComponent
				{...this.state}
				{...this.props}
				signOut={this.signOut}
				openModal={this.openModal}
				closeModal={this.closeModal}
				changeInput={this.changeInput}
				submitNewForm={this.submitNewForm}
				setChannel={this.setChannel}
				ChangeChannel={this.ChangeChannel}
			/>
		)
	}
}


const mapDispatchToProps = dispatch => {
	return {
		setChannel: channel => dispatch(setChannels(channel)),
		setPrivateChannel: bool => dispatch(setPrivateChannel(bool))
	}
}

export default connect(null, mapDispatchToProps)(Sidepanel)