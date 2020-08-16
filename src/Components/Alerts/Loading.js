import React from 'react'

export default function Loading() {
    return (
        <div className="d-flex align-items-center m-3">
            <strong>Updating...</strong>
            <div 
                className="spinner-border text-success ml-auto" 
                role="status" 
                aria-hidden="true">
            </div>
        </div>
    )
}
