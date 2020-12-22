import { Component } from "react";
import MetapanelComponent from "../../../Components/Metapanel"
class Metapanel extends Component {

	state = {
		activeIndex: 0,
		isPrivateChannel:this.props.isPrivateChannel,
		currentChannel:null,
	}
	componentDidMount(){
		this.setState({currentChannel:this.props.currentChannel})
	}
	setActiveIndex = (event, titleProps) => {
		const { index } = titleProps;
		const activeIndex = this.state.activeIndex;
		const newIndex = activeIndex === index ? -1 : index;
		this.setState({ activeIndex: newIndex })
	}
	render() {
		return (
			<MetapanelComponent
				{...this.state}
				{...this.props}
				setActiveIndex={this.setActiveIndex}
			/>
		)
	}
}

export default Metapanel;