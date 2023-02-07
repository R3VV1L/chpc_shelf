import React, { Component } from 'react'

export default class CHPInput extends Component {
    render() {

        return (
            <input {...this.props} className={this.props.className + ' CHPInput'} />

        )
    }
}
