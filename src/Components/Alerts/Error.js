import React from 'react'

export default function Error({message}) {
    return (
        <div className="alert alert-danger text-center m-3" role="alert">
            Error while updating...
            {message}
        </div>
    )
}
