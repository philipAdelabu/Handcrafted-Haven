'use client'

import { useParams } from 'next/navigation'

export default function DebugParamsPage() {
  const params = useParams()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">🔍 Debug: URL Params</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Params Object:</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {JSON.stringify(params, null, 2)}
        </pre>
        <div className="mt-4">
          <p><strong>Has id:</strong> {params?.id ? 'Yes' : 'No'}</p>
          <p><strong>ID value:</strong> {params?.id || 'undefined'}</p>
          <p><strong>ID type:</strong> {typeof params?.id}</p>
        </div>
      </div>
    </div>
  )
}