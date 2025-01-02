export const Alert = () => {
    return (
        <>
            <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Set Alert</h1>
                <form className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4">
                    {/* Category Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            type="text"
                            placeholder="Category (e.g., Warning, Delay)"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Bus Number Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bus Number</label>
                        <input
                            type="text"
                            placeholder="Bus Number"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Date Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="date"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            placeholder="Description"
                            rows={3}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Submit Alert
                    </button>
                </form>
            </div>
        </>
    );
};
