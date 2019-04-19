import Navigation from '../components/Navigation'
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import wpapi from 'wpapi';

const single = (props) => {
    const [data, setData] = useState({ post: {
      title: {rendered: ''},
      content: {rendered: ''}
    } });

    useEffect( () => {
      
      const fetchData = async (slug) => {
        const result = await axios.get(wpapi({endpoint: '/api'}).posts().slug(slug))
        setData({post: result.data[0]})
      };

      fetchData(props.slug)


    }, [])


    //const wp = new wpapi({endpoint: '/api'})
    //axios.get(wp.posts()).then((data) => console.log(data))


    return (
        <Fragment>
        <Navigation/>
        <h1>{data.post.title.rendered}</h1>
        <article
          className="entry-content"
          dangerouslySetInnerHTML={ {
            __html: data.post.content.rendered
           } } />
      </Fragment>
    )
}

single.getInitialProps = async (context) => {
    return { slug:  context.query.slug }
}

export default single
