import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import App from '../App'

test('Deve renderizar o título principal do ecossistema BLICK', () => {
  render(<App />)
  
  const titleElement = screen.getByRole('heading', { level: 1, name: /BLICK/i })
  expect(titleElement).toBeDefined()
})