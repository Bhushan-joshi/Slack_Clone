import { Component } from "react";
import { connect } from "react-redux";
import ColorpanelComponent from "../../../Components/Colorpanel";
import firebase from '../../../firebase'
import { setColors } from "../../../Store/Actions/colorActions";

class ColorPanel extends Component {
	state = {
		modal: false,
		primary: '',
		secondary: '',
		user: this.props.user,
		usersRef: firebase.database().ref('users'),
		userColor:[]
	}

	componentWillUnmount(){
		this.state.usersRef.child(`${this.state.user.uid}/colors`).off();
	}

	componentDidMount() {
		this.addListener(this.state.user.uid)
	}
	addListener = userId => {
		let userColor=[];
		this.state.usersRef.child(`${userId}/colors`)
		.on('child_added',snap=>{
			userColor.unshift(snap.val())
			this.setState({userColor});
		})
	}

	openModal = () => this.setState({ modal: true })
	closeModal = () => this.setState({ modal: false })

	handleChangePrimary = color => this.setState({ primary: color.hex })
	handleChangeSecondary = color => this.setState({ secondary: color.hex })
	handleColorSave = () => {
		if (this.state.primary && this.state.secondary) {
			this.saveColor(this.state.primary, this.state.secondary);
		}
	}

	saveColor = (primary, secondary) => {
		this.state.usersRef
			.child(`${this.state.user.uid}/colors`)
			.push()
			.update({
				primary: primary,
				secondary: secondary,
			}).then(() => {
				this.closeModal();
			})
			.catch(err => console.log(err))
	}
	render() {
		return (
			<ColorpanelComponent
				{...this.state}
				{...this.props}
				openModal={this.openModal}
				closeModal={this.closeModal}
				handleChangePrimary={this.handleChangePrimary}
				handleChangeSecondary={this.handleChangeSecondary}
				handleColorSave={this.handleColorSave}
			/>
		)
	}
}

const mapDispatchToProps=dispatch=>{
	return{
		setColor:(primary,secondary)=>dispatch(setColors(primary,secondary))
	}
}

export default connect(null,mapDispatchToProps)(ColorPanel);