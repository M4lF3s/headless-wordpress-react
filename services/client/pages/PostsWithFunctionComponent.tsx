import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Link from 'next/link'
import wpapi from 'wpapi';
import Navigation from '../components/Navigation';

export default () => {
    const [data, setData] = useState({ posts: [] });

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get(wpapi({endpoint: '/api'}).posts())
    
          setData({posts: result.data});
        };
    
        fetchData();
      }, []);

      return (
        <Fragment>
        <Navigation />
        <ul>
          {data.posts.map(post => (
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
      );

}
