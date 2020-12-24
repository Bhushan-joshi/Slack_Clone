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
		avatarModal:false,
		previewImage:'',
		croppedImage:null,
		blob:null,
		storageRef:firebase.storage().ref(),
		user:firebase.auth().currentUser,
		uploadedCroppedImage:null,
	}

	avatarEditor=null;

	componentDidMount() {
		this.loadChannels();
		this.loadUsers(this.props.user.uid)
	}
	
	componentWillUnmount(){
		this.removeListners();
	}

	removeListners=()=>{
		this.state.channelsRef.off();
		this.state.channels.forEach(channel=>{
			this.state.messagesRef.child(channel.id).off()
		})
		this.state.usersRef.off();
		this.state.presenceRef.off();
		this.state.connectedRef.off();
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

	openAvatarModal=()=>this.setState({avatarModal:true})
	closeAvatarModal=()=>this.setState({avatarModal:false})

	handleAvatarReader=e=>{
		const file=e.target.files[0];
		const reader=new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.addEventListener('load',()=>{
				this.setState({previewImage:reader.result});
			})
		}
	}

	handleCropImage=()=>{
		if (this.avatarEditor) {
			this.avatarEditor.getImageScaledToCanvas().toBlob(blob=>{
				let imageURL=URL.createObjectURL(blob)
				this.setState({
					croppedImage:imageURL,
					blob
				})
			})
		}
	}

	changeAvatar=()=>{
		const metadata={
			contentType:'image/jpeg'
		}
		const {storageRef,user,blob}=this.state
		storageRef
		.child(`avatars/user/${user.uid}`)
		.put(blob,metadata)
		.then(snap=>{
			snap.ref.getDownloadURL()
			.then(downloadURL=>{
				this.setState({uploadedCroppedImage:downloadURL},()=>this.changeAvatarURL())
			})
		})
	}

	changeAvatarURL=()=>{
		this.state.user
		.updateProfile({
			photoURL:this.state.uploadedCroppedImage
		})
		.then(()=>{
			console.log('changed avatar');
			this.closeAvatarModal();
		})
		.catch(err=>{
			console.log(err);
		})
		this.state.usersRef
		.child(this.state.user.uid)
		.update({avatar:this.state.uploadedCroppedImage})
		.then(()=>{
			console.log('changed image');
		})
		.catch(err=>{
			console.log(err);
		})
	}

	setAvatarEditor=node=>this.avatarEditor=node

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
				openAvatarModal={this.openAvatarModal}
				closeAvatarModal={this.closeAvatarModal}
				handleAvatarReader={this.handleAvatarReader}
				handleCropImage={this.handleCropImage}
				setAvatarEditor={this.setAvatarEditor}
				changeAvatar={this.changeAvatar}
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