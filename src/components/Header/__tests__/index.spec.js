import React from 'react'
import { render } from '@testing-library/react'
import faker from 'faker'

import Header from '..'

const fakeUser = {
  id: faker.random.uuid(),
  username: faker.internet.email(),
  avatar_url: faker.internet.url()
}

describe('when logged user', () => {
  it('renders user profile', () => {
    const wrapper = render(<Header user={fakeUser} />)

    expect(wrapper.queryByTestId('session-links')).not.toBeInTheDocument()
    expect(wrapper.queryByTestId('profile')).toBeInTheDocument()
  })
})
