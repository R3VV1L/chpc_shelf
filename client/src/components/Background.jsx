import React, { Component } from 'react'

export default class Background extends Component {
    render() {
        let style = { backgroundSize: `cover`, height: `${this.props.h}`, overflow: "hidden", width: `${this.props.w}` }
        if (this.props.url) {
            style.backgroundImage = `url(${this.props?.url})`
        }
        else if (this.props.color) { style.backgroundColor = `${this.props?.color}` }

        return (
            <div {...this.props} className={this.props.className + ' Background'} style={style}>{this.props.children} </div>
        )
    }
}