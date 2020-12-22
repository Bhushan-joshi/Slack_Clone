import { Component } from "react";
import MessagesComponent from "../../../Components/messages/Messages";
import firebase from '../../../firebase'
import mime from 'mime-types'
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { setUsersPosts } from "../../../Store/Actions/usersPosts";

class Messages extends Component {
	state = {
		message: '',
		msgLoading: false,
		messagesRef: firebase.database().ref('messages'),
		msgError: [],
		messages: [],
		loadingMSGS: false,
		modal: false,
		file: null,
		currentChannel: this.props.currentChannel,
		user: this.props.user,
		AuthorizedFile: ['image/jpeg', 'image/png', 'image/jpg'],
		storageRef: firebase.storage().ref(),
		uploadState: '',
		uploadTask: null,
		percentUploaded: 0,
		numUniqueUsers: '',
		searchTerm: '',
		searchLoading: false,
		searchResult: [],
		privateChannel: this.props.isPrivateChannel,
		privateMessagesRef: firebase.database().ref('PrivateMessages')
	}

	addFile = e => {
		const file = e.target.files[0]
		file && this.setState({ file: file })
	}

	sendFile = () => {
		const { file } = this.state

		if (file) {
			if (this.isAuthFile) {
				const metadata = { contentType: mime.lookup(file.name) }
				this.uploadFile(file, metadata)
				this.closeModal()
				this.clearFile()
			}
		}
	}

	clearFile = () => this.setState({ file: null })

	getPath = () => {
		if (this.state.privateChannel) {
			return `chat/private-${this.state.currentChannel.id}`
		} else {
			return 'chat/public'
		}
	}

	getMessagesRef = () => {
		const { messagesRef, privateChannel, privateMessagesRef } = this.state
		return privateChannel ? privateMessagesRef : messagesRef
	}

	uploadFile = (file, metadata) => {
		const pathToUpload = this.state.currentChannel.id
		const ref = this.getMessagesRef();
		const filePath = `${this.getPath()}/${uuidv4()}.jpg`

		this.setState({
			uploadState: 'uploading..',
			uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
		},
			() => {
				this.state.uploadTask.on('state_changed', snap => {
					const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
					this.setState({ percentUploaded })
				},
					err => {
						console.log(err);
						this.setState({
							msgError: this.state.msgError.concat(err),
							uploadState: 'error',
							uploadTa: null
						})
					},
					() => {
						this.state.uploadTask.snapshot.ref.getDownloadURL().then(downloadurl => {
							this.sendFileMessage(downloadurl, ref, pathToUpload)
						}).catch(err => {
							console.log(err);
							this.setState({
								msgError: this.state.msgError.concat(err),
								uploadState: 'error',
								uploadTa: null
							})
						})
					})
			}
		)

	}

	sendFileMessage = (fileURL, ref, pathToUpload) => {
		ref.child(pathToUpload)
			.push()
			.set(this.setMessage(fileURL))
			.then(() => {
				this.setState({ uploadState: 'done' })
			})
			.catch(err => {
				console.log(err);
				this.setState({
					msgError: this.state.msgError.concat(err),
				})
			})
	}
	isAuthFile = fileName => this.state.AuthorizedFile.includes(mime.lookup(fileName))

	componentDidMount() {
		const { currentChannel, user } = this.state
		if (user && currentChannel) {
			this.addListners(currentChannel.id);
		}
	}

	openModal = () => this.setState({ modal: true })
	closeModal = () => this.setState({ modal: false })

	addListners = (channelId) => {
		this.addMessageListner(channelId);
	}

	addMessageListner = channelId => {
		this.setState({ loadingMSGS: true })
		let loadedMessage = []
		const ref = this.getMessagesRef()
		ref.child(channelId).on('child_added', snap => {
			loadedMessage.push(snap.val());
			this.setState({ messages: loadedMessage, loadingMSGS: false, message: '' })
			this.countUniqueUsers(loadedMessage);
			this.countUsersPosts(loadedMessage)
		})
	}

	countUsersPosts=messages=>{
		let usersPosts=messages.reduce((acc,message)=>{
			if (message.user.name in acc) {
				acc[message.user.name].count +=1;	
			}else{
				acc[message.user.name]={
					avatar:message.user.avatar,
					count:1,
				};
			}
			return acc;
		},{});
		this.props.setUserPosts(usersPosts)
	}

	countUniqueUsers = messages => {
		const UniqueUsers = messages.reduce((acc, message) => {
			if (!acc.includes(message.user.id)) {
				acc.push(message.user.id);
			}
			return acc;
		}, []);
		const plural = UniqueUsers.length > 1 || UniqueUsers.length === 0;
		const numUniqueUsers = `${UniqueUsers.length} user${plural ? "s" : ""}`;
		this.setState({ numUniqueUsers })
	}

	setMessage = (fileURL = null) => {
		const message = {
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			user: {
				id: this.props.user.uid,
				name: this.props.user.displayName,
				avatar: this.props.user.photoURL
			}
		};

		if (fileURL !== null) {
			message['image'] = fileURL
		} else {
			message['content'] = this.state.message
		}
		return message;
	}

	sendMessage = () => {
		const { message } = this.state;
		if (message) {
			this.setState({ msgLoading: true })
			this.getMessagesRef()
				.child(this.props.currentChannel.id)
				.push()
				.set(this.setMessage())
				.then(() => {
					this.setState({ msgLoading: false })
				})
				.catch(err => {
					console.log(err);
					this.setState({ msgLoading: false, msgError: this.state.connect(err) })
				})
		}
	}

	search = (e) => {
		this.setState({ [e.target.name]: e.target.value, searchLoading: true }, () => this.searchValue())
	}

	searchValue = () => {
		const channelMessges = [...this.state.messages];
		const regx = new RegExp(this.state.searchTerm, 'gi');
		const searchResult = channelMessges.reduce((acc, message) => {
			if (message.content && (message.content.match(regx) ||
				message.user.name.match(regx))) {
				acc.push(message)
			}
			return acc;
		}, []);
		this.setState({ searchResult });
		setTimeout(() => {
			this.setState({ searchLoading: false })
		}, 1000);
	}

	onMessageChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	displayChannelName = () => this.state.currentChannel ? `${this.state.privateChannel ? '@' : '#'}${this.state.currentChannel.name}` : ''
	render() {
		return (
			<MessagesComponent
				{...this.state}
				{...this.props}
				onMessageChange={this.onMessageChange}
				sendMessage={this.sendMessage}
				openModal={this.openModal}
				closeModal={this.closeModal}
				addFile={this.addFile}
				sendFile={this.sendFile}
				displayChannelName={this.displayChannelName}
				search={this.search}
			/>
		)
	}
}

const mapDispatchToProps=dispatch=>{
	return{
		setUserPosts:posts=>dispatch(setUsersPosts(posts)),
	}
}

export default connect(null,mapDispatchToProps)(Messages);