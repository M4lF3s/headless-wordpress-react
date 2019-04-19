import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default () => {
    const [data, setData] = useState({ posts: [] });

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get( '/api/posts')
    
          setData({posts: result.data});
        };
    
        fetchData();
      }, []);

      return (
        <ul>
          {data.posts.map(post => (
            <li key={ post.id }>{ post.title.rendered }</li>
          ))}
        </ul>
      );

}
