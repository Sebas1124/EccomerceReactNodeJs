import React from 'react'

import './Preloader.css';

export const PreloaderComponent = () => {

  return (
    <div className="body">
        <div className="loader">
            <div className="loader-inner">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
  )
}
