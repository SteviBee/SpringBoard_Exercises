import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";
// NOTE - 5/18 - had to install jest-dom via npm install jest-dom
// Also imported it here
import '@testing-library/jest-dom'

it("renders withoutcrashing", function () {
    render(<TodoList />)
})

it('matches snapshot', () => {
    const { asFragment } = render(<TodoList />)
    expect(asFragment()).toMatchSnapshot()
});

// Critical business logic tested here: that the form displays, renders, and removes
it('should add a new box', () => {
    const { queryByText, getByLabelText } = render(<TodoList/>)
    const input = getByLabelText("Todo:")
    const btn = queryByText("Add Todo");

    expect(queryByText('Todo: Not Here')).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'testingIsGreat' } });
    fireEvent.click(btn);
    expect(queryByText('testingIsGreat')).toBeInTheDocument();
});

it('should REMOVE a new box', () => {
    const { queryByText, getByLabelText } = render(<TodoList/>)
    const input = getByLabelText("Todo:")
    const btn = queryByText("Add Todo");


    expect(queryByText('Todo: Not Here')).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'testingIsGreat2' } });
    fireEvent.click(btn);
    expect(queryByText('testingIsGreat2')).toBeInTheDocument();

    // Now remove that box
    const remove = queryByText("X")
    fireEvent.click(remove);
    expect(queryByText('testingIsGreat2')).not.toBeInTheDocument();
});

