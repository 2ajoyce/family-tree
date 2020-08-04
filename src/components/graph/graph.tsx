import primitives from 'basicprimitives'
import { FamDiagram } from 'basicprimitivesreact'
import React, { Component } from 'react'
import { Person } from '../../types/person'
import './graph.css'

type GraphProps = {
  family: Person[]
}
type GraphState = {
  items: GraphPerson[]
}

type GraphPerson = {
  id: string
  parents?: string[]
  spouses?: string[]
  title: string
}

export class Graph extends Component<GraphProps, GraphState> {
  constructor(props: GraphProps) {
    super(props)
    const graphPeople = props.family
      .sort((a, b) => (a.birth && b.birth && a.birth < b.birth ? -1 : 1))
      .map<GraphPerson>((person) => {
        return {
          id: person.id,
          parents: person.parents,
          spouses: person.spouse ? [person.spouse] : undefined,
          title: person.name,
        }
      })
    this.state = { items: graphPeople }
  }

  render() {
    const config = {
      pageFitMode: primitives.common.PageFitMode.None,
      cursorItem: 2,
      linesWidth: 1,
      linesColor: 'black',
      hasSelectorCheckbox: primitives.common.Enabled.False,
      normalLevelShift: 20,
      dotLevelShift: 20,
      lineLevelShift: 20,
      normalItemsInterval: 10,
      dotItemsInterval: 30,
      lineItemsInterval: 30,
      arrowsDirection: primitives.common.GroupByType.Parents,
      showExtraArrows: false,
      defaultTemplateName: 'template',
      templates: [
        {
          name: 'template',
          itemSize: { width: 100, height: 50 },
          minimizedItemSize: { width: 3, height: 3 },
          highlightPadding: { left: 2, top: 2, right: 2, bottom: 2 },
          onItemRender: ({ context: itemConfig }: any) => {
            const itemTitleColor =
              itemConfig.itemTitleColor != null
                ? itemConfig.itemTitleColor
                : primitives.common.Colors.RoyalBlue
            return (
              <div className="ContactTemplate">
                <div className="ContactTitle">{itemConfig.title}</div>
              </div>
            )
          },
        },
      ],
      items: this.state.items,
    }

    return (
      <div id="graph">
        <FamDiagram centerOnCursor={true} config={config} />
      </div>
    )
  }
}
