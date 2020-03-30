import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Link from 'next/link'
import wpapi from 'wpapi';
import Navigation from '~/components/navigation';
import useSWR from 'swr';
import Error from 'next/error';

export default () => {

    const { data, error } = useSWR('/api', async (url) => {
        if (error) console.error(error);
        return await axios.get(wpapi({endpoint: url}).posts()).then(r => r.data);
    });

    /* The useState + useEffect Hooks can be used as an alternative to the swr Hook

    const [data, setData] = useState({ posts: Array<wordpress.Post>() });
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(wpapi({endpoint: '/api'}).posts());

            setData({posts: result.data});
        };

        fetchData();
    }, []);

    */

    if (error) {
        console.error(error);
        return <Error statusCode={error.response.status} />
    } else return (
        <Fragment>
            <Navigation />
            <h1>Our Posts Page!</h1>
            {!data &&
                <p>Loading...</p>
            }
            {data &&
                <ul>
                    {data.map((post : wordpress.Post) => (
                        <li key={ post.id }>
                            <Link href="/p/[id]" as={ `/p/${ post.id }` }>
                                <a>
                                    { post.title.rendered }
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            }
        </Fragment>
    );

}