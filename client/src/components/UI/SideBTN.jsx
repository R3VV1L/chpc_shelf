import React, { Component } from 'react'

export default class SideBTN extends Component {
    render() {

        return (
            <input {...this.props} className={this.props.className + ' SideBTN'} />

        )
    }
}
