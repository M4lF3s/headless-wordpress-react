import React, {useEffect, useState, Fragment} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import wpapi from 'wpapi';
import Navigation from "../../components/navigation";
import useSWR from 'swr';
import Error from 'next/error';

export default () => {
    const router = useRouter();
    const { data, error } = useSWR(router.query.id, async (id) => {
        return await axios.get(wpapi({endpoint: '/api'}).posts().id(id)).then(r => r.data);;
    });

    if (error) {
        console.error(error);
        return (
            <Error statusCode={error.response ? error.response.status : 400} />
        )
    } else return (
        <Fragment>
            <Navigation/>
            {!data &&
                <p>Loading...</p>
            }
            {data &&
                <h1>{data.title.rendered}</h1> &&
                <article
                    dangerouslySetInnerHTML={{
                        __html: data?.content.rendered
                    }}
                >
                </article>
            }
        </Fragment>
    )
}