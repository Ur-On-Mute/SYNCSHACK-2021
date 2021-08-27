import React, {useState} from 'react'
import Link from 'next/link'

export default function () {
    return (
        <div>
            <div style={{width: '60%', margin: 'auto'}}>
                <Link href="/create-post">
                    <button className='btn btn-danger create-post'>Create Post</button>
                </Link>
            </div>
        </div>
    )
}
