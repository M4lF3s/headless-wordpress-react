import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Link from 'next/link'
import wpapi from 'wpapi';
import Navigation from '../components/navigation';

const InitialPropsFunctionComponent = props =>  (
        <Fragment>
            <Navigation />
            <h1>Our Posts Page!</h1>
            <ul>
                {props.posts.map((post : wordpress.Post) => (
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
    );

InitialPropsFunctionComponent.getInitialProps = async function() {
    const result = await axios.get(wpapi({endpoint: '/api'}).posts());
    return {posts: result.data}
};

export default InitialPropsFunctionComponent;