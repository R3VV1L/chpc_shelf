import React, { Component } from 'react'

export default class Title extends Component {
    render() {
        return (
            <div className={this.props.className + ' Title'} >{this.props.children}</div>
        )
    }
}
