import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Box from "./Box";

it("renders withoutcrashing", function () {
    render(<Box />)
})

it('matches snapshot', () => {
    const { asFragment } = render(<Box />)
    expect(asFragment()).toMatchSnapshot()
});