import axios from "axios"
import { useState, useEffect } from "react"
import Headline from "../../components/headline/Headline"
import FareDetailsType from "../../types/fareDetails/FareDetailsType"

const ViewFareEstimate = () => {
    const [fare, setFare] = useState<FareDetailsType[]>([])
    const [filteredFare, setFilteredFare] = useState<FareDetailsType[]>([])
    const [selectedType, setSelectedType] = useState<string>("default")
    const [routeNumberQuery, setRouteNumberQuery] = useState<string>("")
    const [startLocationQuery, setStartLocationQuery] = useState<string>("")
    const [endLocationQuery, setEndLocationQuery] = useState<string>("")
    const [currentPage, setCurrentPage] = useState<number>(1)
    const rowsPerPage = 4 // Number of rows per page
    const [showFilters, setShowFilters] = useState<boolean>(false) // State to toggle filter visibility

    const fetchFare = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api-fare/view")
            if (response.data && Array.isArray(response.data.fareEstimates)) {
                setFare(response.data.fareEstimates)
                setFilteredFare(response.data.fareEstimates)
            } else {
                console.error("Unexpected API response:", response.data)
                setFare([])
                setFilteredFare([])
            }
        } catch (error) {
            console.error("Error fetching fares:", error)
            setFare([])
            setFilteredFare([])
        }
    }

    const handleFilterChange = (type: string) => {
        setSelectedType(type)
        applySearchQuery(fare, routeNumberQuery, startLocationQuery, endLocationQuery, type)
    }

    const handleRouteNumberChange = (query: string) => {
        setRouteNumberQuery(query)
        applySearchQuery(fare, query, startLocationQuery, endLocationQuery, selectedType)
    }

    const handleStartLocationChange = (query: string) => {
        setStartLocationQuery(query)
        applySearchQuery(fare, routeNumberQuery, query, endLocationQuery, selectedType)
    }

    const handleEndLocationChange = (query: string) => {
        setEndLocationQuery(query)
        applySearchQuery(fare, routeNumberQuery, startLocationQuery, query, selectedType)
    }

    const applySearchQuery = (
        sourceAccounts: FareDetailsType[],
        routeNumber: string,
        startLocation: string,
        endLocation: string,
        type: string,
    ) => {
        const filteredByType = type === "default"
            ? sourceAccounts
            : sourceAccounts.filter(bus => bus.busType.toLowerCase() === type.toLowerCase())

        const filteredByRouteNumber = routeNumber
            ? filteredByType.filter(bus => (bus.routeNumber ?? "").toLowerCase().includes(routeNumber.toLowerCase()))
            : filteredByType

        const filteredByStartLocation = startLocation
            ? filteredByRouteNumber.filter(bus => (bus.startStop ?? "").toLowerCase().includes(startLocation.toLowerCase()))
            : filteredByRouteNumber

        const filteredByEndLocation = endLocation
            ? filteredByStartLocation.filter(bus => (bus.endStop ?? "").toLowerCase().includes(endLocation.toLowerCase()))
            : filteredByStartLocation

        setFilteredFare(filteredByEndLocation)
    }

    const handleResetFilters = () => {
        setSelectedType("default")
        setRouteNumberQuery("")
        setStartLocationQuery("")
        setEndLocationQuery("")
        setFilteredFare(fare) // Reset to the original list
    }

    // Pagination logic
    const totalPages = Math.ceil(filteredFare.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const currentFare = filteredFare.slice(startIndex, startIndex + rowsPerPage)

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    useEffect(() => {
        fetchFare()
    }, [])

    return (
        <div className='px-2'>
            <Headline title="View Fare Estimate" />

            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-1">
                    {/* Filter Button to Toggle Visibility */}
                    <div className="flex justify-between mb-1 px-2">
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
                </div>

                {/* Filter Options Section (Mobile responsive) */}
                <div className={`${showFilters ? 'block' : 'hidden'} md:block flex flex-wrap items-center space-x-4 mb-4`}>
                    <div className="bg-white p-4 py-2 rounded-lg shadow-lg">
                        {/* Filter Row 1 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="text-gray-600">Filter by Type:</label>
                                <select
                                    value={selectedType}
                                    onChange={(e) => handleFilterChange(e.target.value)}
                                    className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all mb-2 sm:mb-0 w-full"
                                >
                                    <option value="default">All</option>
                                    <option value="normal">Normal</option>
                                    <option value="semi-luxury">Semi-Luxury</option>
                                    <option value="luxury">Luxury</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-gray-600">Search by Route Number:</label>
                                <input
                                    type="text"
                                    placeholder="Search by Route Number"
                                    value={routeNumberQuery}
                                    onChange={(e) => handleRouteNumberChange(e.target.value)}
                                    className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-300 focus:outline-none mb-2 sm:mb-0 w-full"
                                />
                            </div>
                        </div>

                        {/* Filter Row 2 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="text-gray-600">Search by Start Location:</label>
                                <input
                                    type="text"
                                    placeholder="Search by Start Location"
                                    value={startLocationQuery}
                                    onChange={(e) => handleStartLocationChange(e.target.value)}
                                    className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-300 focus:outline-none mb-2 sm:mb-0 w-full"
                                />
                            </div>
                            <div>
                                <label className="text-gray-600">Search by End Location:</label>
                                <input
                                    type="text"
                                    placeholder="Search by End Location"
                                    value={endLocationQuery}
                                    onChange={(e) => handleEndLocationChange(e.target.value)}
                                    className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-300 focus:outline-none mb-2 sm:mb-0 w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto items-center bg-white shadow-lg rounded-lg">
                    <table className="min-w-full text-sm text-gray-800">
                        <thead className="bg-gray-200 text-left">
                            <tr>
                                <th className="py-3 px-4">No</th>
                                <th className="py-3 px-4">Bus Route</th>
                                <th className="py-3 px-4">Bus Type</th>
                                <th className="py-3 px-4">Start Location</th>
                                <th className="py-3 px-4">End Location</th>
                                <th className="py-3 px-4">Estimated Fare</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFare.length > 0 ? (
                                currentFare.map((est, key) => (
                                    <tr key={key} className="border-t hover:bg-gray-100 transition-all">
                                        <td className="py-3 px-4">{key + 1}</td>
                                        <td className="py-3 px-4 capitalize">{est.routeNumber}</td>
                                        <td className="py-3 px-4 capitalize">{est.busType}</td>
                                        <td className="py-3 px-4 capitalize">{est.startStop}</td>
                                        <td className="py-3 px-4 capitalize">{est.endStop}</td>
                                        <td className="py-3 px-4">{est.estimatedFare}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-3 px-4 text-center">
                                        No fares found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Displaying the number of results */}
                <div className="mt-4 text-sm text-gray-600 capitalize">
                    Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredFare.length)} of {filteredFare.length} <b className='capitalize'>fares</b>
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

export default ViewFareEstimate