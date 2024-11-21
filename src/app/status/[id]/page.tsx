'use client'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'

const StatusPage = () => {
  const params = useParams()
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.post('/api/status', { id: params?.id })
        setStatus(response.data)
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError
            ? error.response?.data?.message || error.message
            : 'Something went wrong. Please contact the website owner.'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    if (params?.id) {
      fetchStatus()
    }
  }, [params?.id])

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-8 h-8 border-4 border-t-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg text-gray-700">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 text-lg">{error}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => {
                setLoading(true)
                setError(null)
                setStatus(null)
              }}
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Status: {status ? status : 'No status available'}
            </h1>
            <Link href="/" passHref>
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
                Back
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default StatusPage
