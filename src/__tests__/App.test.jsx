import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { MemoryRouter } from 'react-router'
import Home from '../pages/home'

test('Deve renderizar o título principal do ecossistema BLICK', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )

  const titleElement = screen.getByRole('heading', {
    level: 1,
    name: /MONITORAMENTO INTELIGENTE/i
  })
  expect(titleElement).toBeDefined()
})