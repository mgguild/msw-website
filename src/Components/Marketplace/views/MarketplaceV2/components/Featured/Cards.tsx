import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import styled from 'styled-components'
import Card from '../Card'
import './style.css'

const Cards = (props) => {
  const { items } = props

  return (
    <Carousel
      responsive={responsive}
      infinite
      showDots
      autoPlay
      removeArrowOnDeviceType={['tablet', 'mobile']}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
    >
      {items.map((item, ind) => {
        const id = ind + 1
        return (
          <StyledDiv>
            <Card {...item} />
          </StyledDiv>
        )
      })}
    </Carousel>
  )
}
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
}

export default Cards

const StyledDiv = styled.div`
  margin: 5vh 0px;
  padding: 2vh;
  min-width: 220px;
  ${({ theme }) => `
    ${theme.mediaQueries.xl} {
      min-width: 250px;
    }
  `}
`
