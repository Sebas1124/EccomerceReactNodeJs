import React from 'react'
import ghost from '../../assets/img/ghost-img.png'

export const NotFoundPage = () => {

  return (
    <main className="main_not">
            <section className="home__not">
                <div className="home__container container">
                    <div className="home__data">
                        <span className="home__subtitle-not">Hey!</span>
                        <h1 className="home__title-not">Error 404</h1>
                        <p className="home__description-not">
                            We can't seem to find the page <br/> you are looking for.
                        </p>
                        <button to='/' className="home__button">
                            Go Home
                        </button>
                    </div>

                    <div className="home__img">
                        <img src={ ghost } alt=""/>
                        <div className="home__shadow"></div>
                    </div>
                </div>

            </section>
    </main>
  )
}
