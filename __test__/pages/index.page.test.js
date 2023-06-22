import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { UserContextProvider } from '@/utils/user-context'
import Home from '@/pages/index'

jest.mock("next-i18next", () => ({
  useTranslation: () => ({
    t: (key, options) => {
      if (options?.returnObjects) {

        if (key === "pricing.plans") {
          return [
            {
              title: 'title',
              description: 'description',
              features: [],
            },
            {
              title: 'title',
              description: 'description',
              features: [],
            },
            {
              title: 'title',
              description: 'description',
              features: [],
            }
          ]
        }

        if (key === "faq.items") {
          return [
            {
              question: 'question',
              answer: 'answer',
            }
          ]
        }

        if (key === "features.items") {
          return [
            {
              name: 'name',
              description: 'description',
            },
            {
              name: 'name',
              description: 'description',
            },
            {
              name: 'name',
              description: 'description',
            },
            {
              name: 'name',
              description: 'description',
            },
          ]
        }

        return []
      }

      return key
    }
  }),
}))

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    })
  },
}))

describe("Home page", () => {
  it("should render the home page", () => {
    // Arrange
    const { getByText } = render(
      <UserContextProvider>
        <Home />
      </UserContextProvider>
    )

    // Act
    const titlePart1 = getByText("hero.headingPart1")
    const titlePart2 = getByText("hero.headingPart2")

    // Assert
    expect(titlePart1).toBeInTheDocument()
    expect(titlePart2).toBeInTheDocument()
  })
})
