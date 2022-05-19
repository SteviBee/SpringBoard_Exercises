import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";
// NOTE - 5/18 - had to install jest-dom via npm install jest-dom
// Also imported it here
import '@testing-library/jest-dom'

it("renders withoutcrashing", function () {
    render(<BoxList />)
})

it('matches snapshot', () => {
    const { asFragment } = render(<BoxList />)
    expect(asFragment()).toMatchSnapshot()
});

// Critical business logic tested here: that the form displays, renders, and removes
it('should add a new box', () => {
    const { queryByText, getByLabelText } = render(<BoxList/>)
    const inputW = getByLabelText("Width:")
    const inputH = getByLabelText("Height:")
    const inputBC = getByLabelText("bgColor:")
    const btn = queryByText("Add Box");
    console.log(queryByText("X"))

    expect(queryByText('X')).not.toBeInTheDocument();

    fireEvent.change(inputW, { target: { value: '100' } });
    fireEvent.change(inputH, { target: { value: '200' } });
    fireEvent.change(inputBC, { target: { value: 'green' } });
    fireEvent.click(btn);
    expect(queryByText('X')).toBeInTheDocument();
});

it('should REMOVE a new box', () => {
    const { queryByText, getByLabelText } = render(<BoxList/>)
    const inputW = getByLabelText("Width:")
    const inputH = getByLabelText("Height:")
    const inputBC = getByLabelText("bgColor:")
    const btn = queryByText("Add Box");
    console.log(queryByText("X"))

    expect(queryByText('X')).not.toBeInTheDocument();

    fireEvent.change(inputW, { target: { value: '100' } });
    fireEvent.change(inputH, { target: { value: '200' } });
    fireEvent.change(inputBC, { target: { value: 'green' } });
    fireEvent.click(btn);
    expect(queryByText('X')).toBeInTheDocument();

    // Now remove that box
    const remove = queryByText("X")
    fireEvent.click(remove);
    expect(queryByText('X')).not.toBeInTheDocument();
});

