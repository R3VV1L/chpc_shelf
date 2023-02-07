import React, { Component } from 'react'

export default class Logo extends Component {
    render() {
        let style = { backgroundImage: `url(${this.props?.url})` }
        return (
            <div className={this.props.className + ' Logo'} style={style}>{this.props.children}</div>
        )
    }
}
