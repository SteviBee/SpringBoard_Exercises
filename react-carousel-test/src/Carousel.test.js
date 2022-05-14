import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";


// smoke test
it("renders without crashing!", function () {
  render(<Carousel />)
})

// Snapshot Test
it("matches snapshot", function () {
  // destructure asfragment from render obj of component:
  const { asFragment } = render(<Carousel/>)
  expect(asFragment()).toMatchSnapshot() 
})

// OG Code
it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

// Test that fails current left arrow->move left bug
it("works when you click the left arrow", function () {
  const {queryByTestId, queryByAltText} = render(<Carousel/>)

  // get the two objs and fire the left click event
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow)
  fireEvent.click(leftArrow)

  // expect to be back on first image (Right 1, then Left 1)
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument()
})

it("works that the left button is hidden at start", function () {
  const {queryByTestId, queryByAltText} = render(<Carousel/>)

  // Get the arrow button
  const leftArrow = queryByTestId("left-arrow");
  // console.log(leftArrow)

  // Test it is hidden
  expect(leftArrow.not.toBeEmpty())
})
