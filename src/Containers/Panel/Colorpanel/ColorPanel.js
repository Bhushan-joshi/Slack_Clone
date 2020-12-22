import { Component } from "react";
import ColorpanelComponent from "../../../Components/Colorpanel";
import firebase from '../../../firebase'

class ColorPanel extends Component {
	state={
		modal:false,
		primary:'',
		secondary:'',
		user:this.props.user,
		usersRef:firebase.database().ref('users')
	}

	openModal=()=>this.setState({modal:true})
	closeModal=()=>this.setState({modal:false})

	handleChangePrimary=color=>this.setState({primary:color.hex})
	handleChangeSecondary=color=>this.setState({secondary:color.hex})
	handleColorSave=()=>{
		if (this.state.primary&&this.state.secondary) {
			this.saveColor(this.state.primary,this.state.secondary);
		}
	}
	
	saveColor=(primary,secondary)=>{
		this.state.usersRef
			.child(`${this.state.user.uid}/colors`)
			.push()
			.update({
				primary:primary,
				secondary:secondary,
			}).then(()=>{
				console.log('colors added');
				console.log(primary,secondary);
				this.closeModal();
			})
			.catch(err=>console.log(err))
	}
	render(){
		return(
			<ColorpanelComponent
				{...this.state}
				openModal={this.openModal}
				closeModal={this.closeModal}
				handleChangePrimary={this.handleChangePrimary}
				handleChangeSecondary={this.handleChangeSecondary}
				handleColorSave={this.handleColorSave}
			/>
		)
	}
}

export default ColorPanel;