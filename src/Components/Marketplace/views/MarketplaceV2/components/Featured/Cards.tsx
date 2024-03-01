import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components';
import Card from '../Card';
import './style.css';

const Cards = (props: any) => {
  const { items } = props

  return (
    <div className="flex flex-wrap justify-center items-center gap-1">
    {
      items.map((item: any) => {
        return (
          <div className="w-[20%]">
            <Card {...item} />
          </div>
        )
      })
    }
    </div>
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
};

export default Cards;

const StyledDiv = styled.div`
    margin: 5vh 0px;
    padding: 2vh;
    min-width: 220px;
    ${({ theme }) => `
    ${theme.mediaQueries.xl} {
      min-width: 250px;
    }
  `}
`;
