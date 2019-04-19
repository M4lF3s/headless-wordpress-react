import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Navigation from '../components/Navigation'

export default class extends Component<{}, {posts}> {
    constructor(props) {
        super(props)
        this.state = {posts: []}
    }


  async componentDidMount () {
    const response = await axios.get( '/api/posts')
    this.setState({posts: response.data});
}

  render() {
      const p = this.state.posts ? this.state.posts : []
    return (
      <Fragment>
        <Navigation/>
        <h1>Our Posts Page!</h1>
        <ul>
          {
            p.map( post => {
              return (
                <li key={ post.id }>{ post.title.rendered }</li>
              )
            })
          }
        </ul>
      </Fragment>
    )
 }



}