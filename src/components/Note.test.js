import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import {prettyDOM} from '@testing-library/react'
import Note from './Note'

test('renders content', ()=>{
    const note = { content: 'this is a test', important: true}
    const component = render(<Note note={note}/>)
    //component.debug() //Show component rendered
    component.getByText(note.content)
    expect(component.container).toHaveTextContent(note.content)
    
    //Get component LI
    const li = component.container.querySelector('li')
    console.log(prettyDOM(li))

})
test('clicking the button calles event handler once', ()=>{
    const note = { content: 'this is a test', important: true}

    const mockHandler = jest.fn();
    const component = render(<Note note={note} toggleImportance={mockHandler}/>)
    const button = component.getByText('Make Not Important')
    fireEvent.click(button)
    expect(mockHandler).toHaveBeenCalledTimes(1)
})