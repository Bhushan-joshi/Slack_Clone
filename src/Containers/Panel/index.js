import { Grid } from "semantic-ui-react"
import ColorPanel from "./Colorpanel/ColorPanel"
import Messages from "./Messages/Messages"
import Sidepanel from "./Sidepanel/Sidepanel"
import Metapanel from "./Metapanel/Metapanel"

const Panel=()=>{
	return(
		<Grid columns="equal" className="app" style={{background:'#eee'}}>
			<ColorPanel/>
			<Sidepanel/>
			<Grid.Column style={{marginLeft:320}}>
			<Messages/>
			</Grid.Column>
			<Grid.Column width={4}>
			<Metapanel/>
			</Grid.Column>
		</Grid>
	)
}

export default Panel;