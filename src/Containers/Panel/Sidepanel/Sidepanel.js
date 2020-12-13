import { Component } from "react";
import SidepanelComponent from "../../../Components/Sidepanel";
import firebase from '../../../firebase';
import { connect } from "react-redux";

class Sidepanel extends Component {
	state = {
		channels: [],
		modal: false,
		modalForm: {
			channelName: '',
			channelDesc: ''
		},
		channelsRef: firebase.database().ref("channels")
	}

	componentDidMount(){
		this.loadChannels();
	}

	loadChannels=()=>{
		const channelsArray=[];
		this.state.channelsRef.on('child_added',snapOfData=>{
			console.log(snapOfData.val());
			channelsArray.push(snapOfData.val())
		})
		this.setState({channels:channelsArray})
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

	render() {
		return (
			<SidepanelComponent
				signOut={this.signOut}
				user={this.props.user}
				channels={this.state.channels}
				modal={this.state.modal}
				openModal={this.openModal}
				closeModal={this.closeModal}
				changeInput={this.changeInput}
				submitNewForm={this.submitNewForm} />
		)
	}
}

const mapStateToProps = state => (
	{
		user: state.user.currentUser,
	}
)

export default connect(mapStateToProps)(Sidepanel);