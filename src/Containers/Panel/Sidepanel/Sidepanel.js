import { Component } from "react";
import SidepanelComponent from "../../../Components/Sidepanel";
import firebase from '../../../firebase';
import { connect } from "react-redux";

class Sidepanel extends Component {
	signOut=()=>{
		firebase
		.auth()
		.signOut()
		.then(()=>{
			console.log('logout');
		}).catch(err=>{
			console.log(err);
		})
	}
	render(){
		return(
			<SidepanelComponent
			signOut={this.signOut}
			user={this.props.user}/>
		)
	}
}

const mapStateToProps=state=>(
	{
		user:state.user.currentUser,
	}
)

export default connect(mapStateToProps)(Sidepanel);