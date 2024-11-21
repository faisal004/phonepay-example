'use client'
import { initiatePayment } from '@/actions/initiatePayment'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const handlePay = async (data: number) => {
    try {
      const result = await initiatePayment(data)
      if (result) {
        router.push(result.redirectUrl)
      }
    } catch (error) {
      console.error('Error processing payment:', error)
    }
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={() => handlePay(1)}
        className="inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
      >
        Pay ₹1
      </button>
    </div>
  )
}
