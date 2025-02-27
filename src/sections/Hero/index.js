import React from 'react'
import PropTypes from 'prop-types'

import IconWrap from '../../components/IconWrap'
import { Link } from 'react-scroll'

const getBg = index => {
  switch (index) {
    case 1:
      return 'yellow'
    case 2:
      return 'green'
    default:
      return 'purple'
  }
}

const Hero = ({ title, actions, social }) => (
  <section className="hero">
    <div className="container-fluid distribute-rows">
      <div className="row">
        <div className="col">
          <div className="text-center">
            <h1 className="display-title mb-sm-5 mb-xl-0">
              {title.map(({ line }, index) => (
                <span
                  key={`line-${index}`}
                  className={`d-block ${index % 2 === 0 && 'text-primary'}`}
                >
                  {line}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="action-circle-wrap">
            {actions.map(
              ({ join_section_id: joinSectionId, title, image }, index) => (
                <Link
                  duration={500}
                  key={joinSectionId}
                  smooth={true}
                  to={joinSectionId}
                >
                  <div className={`action-circle bg-${getBg(index)}`}>
                    <div className="action-circle__img">
                      <img
                        src={
                          image.src.childImageSharp
                            ? image.src.childImageSharp.fluid.src
                            : image.src
                        }
                        alt={image.alt}
                      />
                    </div>
                    <p className="action-circle__title">{title}</p>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
      <div className="row d-none d-xl-flex">
        <div className="col">{/* allow to push arrow to center */}</div>
        <div className="col">
          <div className="d-flex justify-content-center">
            <IconWrap role="button" src="/img/arrow-down.svg" />
          </div>
        </div>
        <div className="col" />
      </div>
    </div>
  </section>
)

Hero.propTypes = {
  social: PropTypes.shape({
    action: PropTypes.string,
    accounts: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.any,
        url: PropTypes.string
      })
    )
  }),
  title: PropTypes.arrayOf(
    PropTypes.shape({
      line: PropTypes.string
    })
  ),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.any
    })
  )
}

export default Hero
