import React from 'react'
import Link from 'next/link'

export default () => (
    <ul>
        <li><Link href="/"><a href="/">Home</a></Link></li>
        <li><Link href="/PostsWithClassComponent"><a href="/PostsWithClassComponent">Posts (with a Class Component)</a></Link></li>
        <li><Link href="/PostsWithFunctionComponent"><a href="/PostsWithFunctionComponent">Posts (with Functional Component and Hooks)</a></Link></li>
    </ul>
)