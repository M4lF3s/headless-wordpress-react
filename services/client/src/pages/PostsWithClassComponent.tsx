import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Navigation from '~/components/navigation'
import wpapi from 'wpapi';
import Link from 'next/link'

export default class extends Component< {}, {posts} > {
    constructor(props)
    {
        super(props);
        this.state = {posts: Array<wordpress.Post>()}
    }


    async componentDidMount () {
        const response = await axios.get(wpapi({endpoint: '/api'}).posts());
        this.setState({posts: response.data});
    }

    render() {
        const p = this.state.posts ? this.state.posts : [];
        return (
            <Fragment>
                <Navigation/>
                <h1>Our Posts Page!</h1>
                <ul>
                    {this.state.posts.map((post : wordpress.Post) => (
                        <li key={ post.id }>
                            <Link href="/p/[id]" as={ `/p/${ post.id }` }>
                                <a>
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