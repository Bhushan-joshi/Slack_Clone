import { Dimmer, Loader } from "semantic-ui-react";

export const Spinner=()=>(
	<Dimmer active>
		<Loader content="Loading..." size="massive"/>
	</Dimmer>
)