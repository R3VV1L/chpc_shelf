import React, { Component } from 'react'

export default class ComingSoonGameCard extends Component {
    render() {
        let style = { backgroundSize: `cover`, overflow: "hidden", backgroundImage: `url(${this.props?.url})` }
        return (
            <div {...this.props} className={this.props.className + ' CSGameCard'} style={style}>{this.props.children} </div>
        )
    }
}
