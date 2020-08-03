import React, { Component } from 'react'
import { GraphView } from 'react-digraph'

type GraphProps = {
  graph: any
  selected: any
}

const GraphConfig = {
  NodeTypes: {
    empty: {
      // required to show empty nodes
      typeText: 'None',
      shapeId: '#empty', // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 100" id="empty" key="0">
          <circle cx="50" cy="50" r="45"></circle>
        </symbol>
      ),
    },
    custom: {
      // required to show empty nodes
      typeText: 'Custom',
      shapeId: '#custom', // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 50 25" id="custom" key="0">
          <ellipse cx="50" cy="25" rx="50" ry="25"></ellipse>
        </symbol>
      ),
    },
  },
  NodeSubtypes: {},
  EdgeTypes: {
    emptyEdge: {
      // required to show empty edges
      shapeId: '#emptyEdge',
      shape: (
        <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
          <circle cx="25" cy="25" r="8" fill="currentColor">
            {' '}
          </circle>
        </symbol>
      ),
    },
  },
}

const NODE_KEY = 'id' // Allows D3 to correctly update DOM

export class Graph extends Component<GraphProps, GraphProps> {
  constructor(props: GraphProps) {
    super(props)

    this.state = {
      graph: props.graph,
      selected: props.selected,
    }
  }

  onSelectNode = () => console.log('onSelectNode')
  onCreateNode = () => console.log('onCreateNode')
  onUpdateNode = () => console.log('onUpdateNode')
  onDeleteNode = () => console.log('onDeleteNode')
  onSelectEdge = () => console.log('onSelectEdge')
  onCreateEdge = () => console.log('onCreateEdge')
  onSwapEdge = () => console.log('onSwapEdge')
  onDeleteEdge = () => console.log('onDeleteEdge')

  render() {
    const nodes = this.state.graph.nodes
    const edges = this.state.graph.edges
    const selected = this.state.selected

    const NodeTypes = GraphConfig.NodeTypes
    const NodeSubtypes = GraphConfig.NodeSubtypes
    const EdgeTypes = GraphConfig.EdgeTypes

    return (
      <div id="graph">
        <GraphView
          ref="GraphView"
          nodeKey={NODE_KEY}
          nodes={nodes}
          edges={edges}
          selected={selected}
          nodeTypes={NodeTypes}
          nodeSubtypes={NodeSubtypes}
          edgeTypes={EdgeTypes}
          onSelectNode={this.onSelectNode}
          onCreateNode={this.onCreateNode}
          onUpdateNode={this.onUpdateNode}
          onDeleteNode={this.onDeleteNode}
          onSelectEdge={this.onSelectEdge}
          onCreateEdge={this.onCreateEdge}
          onSwapEdge={this.onSwapEdge}
          onDeleteEdge={this.onDeleteEdge}
        />
      </div>
    )
  }
}
