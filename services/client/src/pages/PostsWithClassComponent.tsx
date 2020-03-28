import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Navigation from '../components/Navigation'
import wpapi from 'wpapi';
import Link from 'next/link'

export default class extends Component<{}, {posts}> {
    constructor(props) {
        super(props)
        this.state = {posts: []}
    }


    async componentDidMount () {
        const response = await axios.get(wpapi({endpoint: '/api'}).posts())
        this.setState({posts: response.data});
    }

    render() {
        const p = this.state.posts ? this.state.posts : []
        return (
            <Fragment>
                <Navigation/>
                <h1>Our Posts Page!</h1>
                <ul>
                    {this.state.posts.map(post => (
                        <li key={ post.id }>
                            <Link href={ `/posts/${ post.slug }` }>
                                <a href={ `/posts/${ post.slug }` }>
                                    { post.title.rendered }
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Fragment>
        )
    }

}