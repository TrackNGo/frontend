import { useState, useEffect } from "react"
import axios from "axios"

const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        try {
            const response = await axios.get(url)
            setData(response.data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, [url])

    return { data, loading, error }
}

export default useFetch
