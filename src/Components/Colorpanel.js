import { Button, Divider, Icon, Label, Menu, Modal, Segment, Sidebar } from "semantic-ui-react";
import { SliderPicker } from 'react-color';

const ColorpanelComponent = props => {
	return (
		<Sidebar
			as={Menu}
			icon="labeled"
			inverted
			vertical
			visible
			width="very thin">
			<Divider />
			<Button icon="add" size="small" color="blue" onClick={props.openModal} />
			{/* Colore modal */}
			<Modal basic open={props.modal} onClose={props.closeModal}>
				<Modal.Header>Choose App Color</Modal.Header>
				<Modal.Content>
					<Segment inverted>
						<Label content="Primary Color" style={{ marginBottom: 20 }} />
						<SliderPicker color={props.primary} onChange={props.handleChangePrimary} />
					</Segment>
					<Divider />
					<Segment inverted>
						<Label content="Secondary Color" style={{ marginBottom: 20 }} />
						<SliderPicker color={props.secondary} onChange={props.handleChangeSecondary} />
					</Segment>
				</Modal.Content>
				<Modal.Actions>
					<Button
						color="green"
						inverted
						onClick={props.handleColorSave}
					>
						<Icon name="checkmark" />Save Colors
					</Button>
					<Button
						color="red"
						inverted
						onClick={props.closeModal}
					>
						<Icon name="remove" /> Cancel
					</Button>
				</Modal.Actions>
			</Modal>

		</Sidebar>
	)
}

export default ColorpanelComponent;