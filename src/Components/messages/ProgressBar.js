import { Progress } from "semantic-ui-react";


const ProgressBar = props => (
	props.uploadState === "uploading.." && (
		<Progress
			percent={props.percentUploaded}
			className="progress__bar"
			progress
			indicating
			size="medium"
			inverted
		/>
	)
)

export default ProgressBar;