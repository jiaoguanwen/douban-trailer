import React, { Component } from 'react'

export default (loadComponent, placeholder = '正在加载中') => {
  return class AsyncComponent extends Component {
    unmount = false

    constructor() {
      super()
      this.state = {
        Child: null
      }
    }

    componentWillUnmount() {
      this.unmount = true
    }

    async componentDidMount() {
      // TODO 这里有问题，这个default，Child怎么拿到的？
      const { default: Child } = await loadComponent()

      if (this.unmount) return

      this.setState({
        Child
      })
    }

    render() {
      const { Child } = this.state

      return Child ? <Child {...this.props} /> : placeholder
    }
  }
}
