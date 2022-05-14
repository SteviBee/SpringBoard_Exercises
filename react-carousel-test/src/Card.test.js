import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

// smoke test
it("renders without crashing!", function () {
    render(<Card />)
})

// Snapshot Test
it("matches snapshot", function () {
    // destructure asfragment from render obj of component:
    const { asFragment } = render(<Card caption="test" src="test2" currNum={1} totalNum={4}/>)
    expect(asFragment()).toMatchSnapshot() 
  })

