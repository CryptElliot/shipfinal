import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Hero from '@/components/blocks/landing-page/hero'

jest.mock("next-i18next", () => ({
  useTranslation: () => ({ t: key => key }),
}))

describe("Hero component", () => {
  it("should render the hero component", () => {
    // Arrange
    const { getByText } = render(<Hero />)

    // Act
    const titlePart1 = getByText("hero.headingPart1")
    const titlePart2 = getByText("hero.headingPart2")

    // Assert
    expect(titlePart1).toBeInTheDocument()
    expect(titlePart2).toBeInTheDocument()
  })
})
