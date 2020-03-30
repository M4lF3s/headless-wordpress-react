import React from 'react'
import Link from 'next/link'

export default () => (
    <ul>
        <li><Link href="/"><a title="Home Page">Home</a></Link></li>
        <li><Link href="/wp-admin"><a title="Wordpress Login">Admin</a></Link></li>
        <li><Link href="/PostsWithClassComponent"><a title="Class Component Page">Posts (with a Class Component)</a></Link></li>
        <li><Link href="/PostsWithFunctionComponent"><a title="Functional Component Page">Posts (with Functional Component and Hooks)</a></Link></li>
        <li><Link href="/InitialPropsFunctionComponent"><a title="Functional Component with Initial Props">Posts (with Functional Component and initial Props)</a></Link></li>
    </ul>
)