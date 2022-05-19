import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewBoxForm from "./NewBoxForm"

it("renders withoutcrashing", function () {
    render(<NewBoxForm />)
})


it('matches snapshot', () => {
    const { asFragment } = render(<NewBoxForm />)
    expect(asFragment()).toMatchSnapshot()
});