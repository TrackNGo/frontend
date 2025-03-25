import axios from "axios"
import { useState, useEffect } from "react"
import Headline from "../../components/headline/Headline"
import TimeTableType from "../../types/timeTable/TimeTableType"
import { useParams } from "react-router-dom"
import baseUrl from "../../common/baseBackendUrl"

const ViewTimeTable = () => {
    const { start, end } = useParams<{ start: string, end: string }>()
    const [timeTables, setTimeTables] = useState<TimeTableType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [busType, setBusType] = useState<string>("")
    const [searchStart, setSearchStart] = useState<string>("")
    const [searchEnd, setSearchEnd] = useState<string>("")
    const [searchRouteNumber, setSearchRouteNumber] = useState<string>("")
    const [priceSort, setPriceSort] = useState<string>("none")
    const [currentPage, setCurrentPage] = useState<number>(1) // Current page state
    const [showFilters, setShowFilters] = useState<boolean>(false) // State to toggle filter visibility
    const rowsPerPage = 4 // Number of rows to display per page

    useEffect(() => {
        const fetchTimeTables = async () => {
            try {

                if (start === 'null' && end == 'null') {
                    const response = await axios.get(`${baseUrl.adminBackend}api-bustimetable/view`)
                    setTimeTables(response.data)
                    setLoading(false)
                }
                else {
                    const response = await axios.get(`${baseUrl.adminBackend}api-bustimetable/locations?startLocation=${start}&endLocation=${end}`)
                    setTimeTables(response.data)
                    setLoading(false)
                }
            } catch (error: any) {
                setError("Error fetching time tables.")
                setLoading(false)
            }
        }

        fetchTimeTables()
    }, [])

    let filteredTimeTables;
    let sortedTimeTables;
    let totalPages = 0;
    let startIndex;
    let currentTimeTables;

    if (timeTables.length > 0) {
        filteredTimeTables = timeTables.filter((timeTable) => {
            const matchesBusType = busType ? timeTable.busType?.toLowerCase() === busType.toLowerCase() : true
            const matchesStartLocation = timeTable.startLocation.toLowerCase().includes(searchStart.toLowerCase())
            const matchesEndLocation = timeTable.endLocation.toLowerCase().includes(searchEnd.toLowerCase())
            const matchesRouteNumber = timeTable.busRouteNumber.toLowerCase().includes(searchRouteNumber.toLowerCase())
            return matchesBusType && matchesStartLocation && matchesEndLocation && matchesRouteNumber
        })

        sortedTimeTables = filteredTimeTables.sort((a, b) => {
            if (priceSort === "asc") {
                return a.price - b.price
            } else if (priceSort === "desc") {
                return b.price - a.price
            }
            return 0
        })

        // Pagination calculations
        totalPages = Math.ceil(sortedTimeTables.length / rowsPerPage)
        startIndex = (currentPage - 1) * rowsPerPage
        currentTimeTables = sortedTimeTables.slice(startIndex, startIndex + rowsPerPage)
    }


    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    const handleResetFilters = () => {
        setBusType("") // Reset busType to an empty string
        setSearchStart("") // Reset searchStart
        setSearchEnd("") // Reset searchEnd
        setSearchRouteNumber("") // Reset searchRouteNumber
        setPriceSort("none") // Reset priceSort to its default state
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <Headline title={"View Time Table"} />
            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
                {/* Filter Button to Toggle Visibility */}
                <div className="flex justify-between mb-4 px-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg md:hidden"
                    >
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </button>
                    <div className="flex items-end">
                        <button
                            onClick={handleResetFilters}
                            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                {/* Filter Options Section (Mobile responsive) */}
                <div className={`${showFilters ? 'block' : 'hidden'} md:block flex flex-wrap items-center space-x-4 mb-4`}>
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            {/* Filter Row 1 */}
                            <div>
                                <label className="text-gray-600 block">Route Number:</label>
                                <input
                                    type="text"
                                    value={searchRouteNumber}
                                    onChange={(e) => setSearchRouteNumber(e.target.value)}
                                    placeholder="Enter Route Number"
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-gray-600 block">Start Location:</label>
                                <input
                                    type="text"
                                    value={searchStart}
                                    onChange={(e) => setSearchStart(e.target.value)}
                                    placeholder="Enter Start Location"
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-gray-600 block">End Location:</label>
                                <input
                                    type="text"
                                    value={searchEnd}
                                    onChange={(e) => setSearchEnd(e.target.value)}
                                    placeholder="Enter End Location"
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>

                            {/* Filter Row 2 */}
                            <div>
                                <label className="text-gray-600 block">Filter by Type:</label>
                                <select
                                    value={busType}
                                    onChange={(e) => setBusType(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                >
                                    <option value="">All</option>
                                    <option value="luxury">Luxury</option>
                                    <option value="normal">Normal</option>
                                    <option value="semi-luxury">Semi-Luxury</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-gray-600 block">Sort by Price:</label>
                                <select
                                    value={priceSort}
                                    onChange={(e) => setPriceSort(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                >
                                    <option value="none">Default</option>
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto items-center bg-white shadow-lg rounded-lg">
                    <table className="min-w-full text-sm text-gray-800">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-4 text-left">Start Location</th>
                                <th className="py-3 px-4 text-left">End Location</th>
                                <th className="py-3 px-4 text-left">Bus Route Number</th>
                                <th className="py-3 px-4 text-left">Bus Type</th>
                                <th className="py-3 px-4 text-left">Max Price</th>
                                <th className="py-3 px-4 text-left">Start Time</th>
                                <th className="py-3 px-4 text-left">End Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTimeTables ? (currentTimeTables.map((timeTable, index) => (
                                <tr key={index} className="border-t hover:bg-gray-50 capitalize">
                                    <td className="py-3 px-4">{timeTable.startLocation}</td>
                                    <td className="py-3 px-4">{timeTable.endLocation}</td>
                                    <td className="py-3 px-4">{timeTable.busRouteNumber}</td>
                                    <td className="py-3 px-4">{timeTable.busType}</td>
                                    <td className="py-3 px-4">{timeTable.price}</td>
                                    <td className="py-3 px-4">{timeTable.startTime}</td>
                                    <td className="py-3 px-4">{timeTable.endTime}</td>
                                </tr>
                            ))) : (
                                <>
                                    <tr className="border-t hover:bg-gray-50 capitalize">
                                        <td colSpan={7} className="py-3 px-4">
                                            <center>
                                                No timetable is found for this route...
                                            </center>
                                        </td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Displaying the number of results */}
                <div className="mt-4 text-sm text-gray-600 capitalize">
                    {
                        currentTimeTables && startIndex && filteredTimeTables ? (
                            <>
                                Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredTimeTables.length)} of {filteredTimeTables.length} <b className='capitalize'>time tables</b>
                            </>
                        ) : (
                            <></>
                        )
                    }
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {/* Page Number Buttons */}
                    <div className="flex space-x-2">
                        {[...Array(totalPages).keys()].map((i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-3 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ViewTimeTable
