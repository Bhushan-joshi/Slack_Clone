import { Component } from "react";
import SidepanelComponent from "../../../Components/Sidepanel";
import firebase from '../../../firebase';
import { connect } from "react-redux";
import { setChannels } from "../../../Store/Actions/channelsActions";

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
		firstLoad:true,
		activeChannel:null
	}

	componentDidMount() {
		this.loadChannels();
	}
	componentWillUnmount(){
		this.removeListeners();
	}
	
	removeListeners=()=>{
		this.state.channelsRef.off();
	}

	loadChannels = () => {
		this.setState({ loadingChannels: true })
		let channelsArray = [];
		this.state.channelsRef.on('child_added', snapOfData => {
			channelsArray.push(snapOfData.val());
			this.setState({ channels: channelsArray, loadingChannels: false },()=>this.setFirstChannel())
		})
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
	setFirstChannel=()=>{
		const firstChannel=this.state.channels[0];
		if (this.state.firstLoad&&this.state.channels.length>0) {
			this.activeChannel(firstChannel)
			this.props.setChannel(firstChannel)
		}
		this.setState({firstLoad:false})
	}
	activeChannel=channel=>{
		this.setState({activeChannel:channel.id})
	}
	setChannel=(channel)=>{
		this.activeChannel(channel)
		this.props.setChannel(channel)
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
				submitNewForm={this.submitNewForm}
				loadingChannels={this.state.loadingChannels}
				setChannel={this.setChannel} 
				activeChannel={this.state.activeChannel}/>
		)
	}
}

const mapStateToProps = state => (
	{
		user: state.user.currentUser,
	}
)
const mapDispatchToProps=dispatch=>{
	return{
		setChannel:channel=>dispatch(setChannels(channel))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Sidepanel);