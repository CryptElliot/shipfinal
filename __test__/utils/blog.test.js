import formatDate from '@/utils/blog/format-date'

describe("Blog utils", () => {
  it("should should format the date correctly", () => {
    // Arrange
    const stringDate = "2022-10-15"

    // Act
    const formattedDate = formatDate(stringDate)

    // Assert
    expect(formattedDate).toBe("October 15, 2022")
  })
})
