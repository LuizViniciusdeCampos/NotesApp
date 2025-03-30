import { render, screen, fireEvent } from "@testing-library/react"
import { Sidebar } from "@/components/sidebar"
import { translations } from "@/lib/translations"

describe("Sidebar", () => {
  const mockSetActiveView = jest.fn()
  const mockSetSearchTags = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders sidebar with navigation buttons", () => {
    render(
      <Sidebar
        activeView="all"
        setActiveView={mockSetActiveView}
        searchTags={[]}
        setSearchTags={mockSetSearchTags}
        t={translations.en}
      />,
    )

    expect(screen.getByTestId("all-notes-button")).toBeInTheDocument()
    expect(screen.getByTestId("archived-notes-button")).toBeInTheDocument()
  })

  test("switches between all and archived views", () => {
    render(
      <Sidebar
        activeView="all"
        setActiveView={mockSetActiveView}
        searchTags={[]}
        setSearchTags={mockSetSearchTags}
        t={translations.en}
      />,
    )

    fireEvent.click(screen.getByTestId("archived-notes-button"))
    expect(mockSetActiveView).toHaveBeenCalledWith("archived")

    // Reset and test the other direction
    mockSetActiveView.mockReset()

    render(
      <Sidebar
        activeView="archived"
        setActiveView={mockSetActiveView}
        searchTags={[]}
        setSearchTags={mockSetSearchTags}
        t={translations.en}
      />,
    )

    fireEvent.click(screen.getByTestId("all-notes-button"))
    expect(mockSetActiveView).toHaveBeenCalledWith("all")
  })

  test("displays tag filters", () => {
    render(
      <Sidebar
        activeView="all"
        setActiveView={mockSetActiveView}
        searchTags={["Paris", "London", "Hotel"]}
        setSearchTags={mockSetSearchTags}
        t={translations.en}
      />,
    )

    // Check if tag filters are rendered
    expect(screen.getByTestId("tag-filter-Paris")).toBeInTheDocument()
    expect(screen.getByTestId("tag-filter-London")).toBeInTheDocument()
    expect(screen.getByTestId("tag-filter-Hotel")).toBeInTheDocument()
  })

  test("toggles tag filters when clicked", () => {
    render(
      <Sidebar
        activeView="all"
        setActiveView={mockSetActiveView}
        searchTags={[]}
        setSearchTags={mockSetSearchTags}
        t={translations.en}
      />,
    )

    fireEvent.click(screen.getByTestId("tag-filter-Paris"))
    expect(mockSetSearchTags).toHaveBeenCalledWith(["Paris"])
  })

  test("displays active tag filters", () => {
    render(
      <Sidebar
        activeView="all"
        setActiveView={mockSetActiveView}
        searchTags={["Paris", "Hotel"]}
        setSearchTags={mockSetSearchTags}
        t={translations.en}
      />,
    )

    // Check if active tags are displayed
    expect(screen.getByTestId("active-tag-Paris")).toBeInTheDocument()
    expect(screen.getByTestId("active-tag-Hotel")).toBeInTheDocument()
  })

  test("removes tag filter when X is clicked", () => {
    render(
      <Sidebar
        activeView="all"
        setActiveView={mockSetActiveView}
        searchTags={["Paris", "Hotel"]}
        setSearchTags={mockSetSearchTags}
        t={translations.en}
      />,
    )

    fireEvent.click(screen.getByTestId("remove-tag-filter-Paris"))
    expect(mockSetSearchTags).toHaveBeenCalledWith(["Hotel"])
  })
})

