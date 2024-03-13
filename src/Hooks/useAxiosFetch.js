import { useState, useEffect } from 'react'
import axios from 'axios'

const useAxiosFetch = (dataUrl) => {
    // set custom hook state
    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    useEffect(() => {
        let isMounted = true
        // define cancellation token
        const source = axios.CancelToken.source()

        const fetchData = async (url) => {
            setIsLoading(true)
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                })
                if (isMounted) {
                    setData(response.data)
                    setFetchError(null)
                }
            } catch (err) {
                if (isMounted) {
                    setData([])
                    setFetchError(err.message)
                }
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        fetchData(dataUrl)
        // cleanup function
        return () => {
            isMounted = false
            source.cancel()
        }
    },[dataUrl])

    return { data, fetchError, isLoading}
}

export default useAxiosFetch