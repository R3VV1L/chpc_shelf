import React, { Component } from 'react'

export default class CHPButton extends Component {
    render() {

        return (
            <input {...this.props} className={this.props.className + ' CHPButton'} />

        )
    }
}
