import React, { Component } from 'react'

export default class MSG extends Component {
    render() {
        let style = {}
        if (this.props.type == 'error') {
            style.color = `red`
        }
        else if (this.props.type == 'success') { style.color = `lime` }

        return (
            <div {...this.props} className={this.props.className + ' Message'} style={style}>{this.props.children} </div>
        )
    }
}