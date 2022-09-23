import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm"

it("renders withoutcrashing", function () {
    render(<NewTodoForm />)
})


it('matches snapshot', () => {
    const { asFragment } = render(<NewTodoForm />)
    expect(asFragment()).toMatchSnapshot()
});