import createEngine, {
	DiagramModel,
	DefaultNodeModel,
	DefaultPortModel,
	RightAngleLinkFactory,
	LinkModel,
	RightAngleLinkModel
} from '@projectstorm/react-diagrams';
import * as React from 'react';
import { useEffect } from 'react';
import { DemoButton, DemoWorkspaceWidget } from '../src/helpers/DemoWorkspaceWidget';
import { action } from '@storybook/addon-actions';
import { AbstractModelFactory, CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from '../src/helpers/DemoCanvasWidget';

// When new link is created by clicking on port the RightAngleLinkModel needs to be returned.
export class RightAnglePortModel extends DefaultPortModel {
	createLinkModel(factory?: AbstractModelFactory<LinkModel>) {
		return new RightAngleLinkModel();
	}
}

//
export default function RightAngleComponent () {
	// setup the diagram engine
	const engine = createEngine();
	engine.getLinkFactories().registerFactory(new RightAngleLinkFactory());

	// setup the diagram model
	const model = new DiagramModel();

	// create four nodes in a way that straight links wouldn't work
	const node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
	const port1 = node1.addPort(new RightAnglePortModel(false, 'out-1', 'Out'));
	const port11 = node1.addPort(new RightAnglePortModel(true, 'out-2', 'In'));
	node1.setPosition(340, 350);

	const node2 = new DefaultNodeModel('Node 2', 'rgb(255,255,0)');
	const port2 = node2.addPort(new RightAnglePortModel(false, 'in-1', 'In'));
	node2.setPosition(240, 80);
	const node3 = new DefaultNodeModel('Node 3', 'rgb(192,255,255)');
	const port3 = node3.addPort(new RightAnglePortModel(true, 'out-1', 'Out'));
	node3.setPosition(540, 180);
	const node4 = new DefaultNodeModel('Node 4', 'rgb(192,0,255)');
	const port4 = node4.addPort(new RightAnglePortModel(false, 'in-1', 'In'));
	node4.setPosition(95, 185);

	// editando node pra testes
	const node5 = new DefaultNodeModel('Node Cid', 'rgb(244, 71, 250)');
	const port5 = node5.addPort(new RightAnglePortModel(true, 'out-1', 'In' ));
	const port51 = node5.addPort(new RightAnglePortModel(false, 'in-1', 'Out' ));
	// const port5 = node5.addPort(new RightAnglePortModel(true, 'out-1', 'In' ));
	// const port51 = node5.addPort(new RightAnglePortModel(false, 'out-1', 'Out' ));
	node5.setPosition(650, 250);

	// linking things together
	const link1 = port1.link(port4);
	const link2 = port2.link(port3);


	// add all to the main model
	model.addAll(node1, node2, node3, node4, node5, link1, link2);

	// load model into engine and render
	engine.setModel(model);

	return (
		<DemoWorkspaceWidget
			buttons={
				<DemoButton
					onClick={() => {
						action('Serialized Graph')(JSON.stringify(model.serialize(), null, 2));
					}}
				>
					Serialize Graph
				</DemoButton>
			}
		>
			<DemoCanvasWidget>
				<CanvasWidget engine={engine} />
			</DemoCanvasWidget>
		</DemoWorkspaceWidget>
	);
};