"use client";

import React, { useState, useEffect } from 'react';
import api from '../lib/api';

interface PingResponse {
  message: string;
  timestamp: string;
}

export default function TestConnection() {
  const [response, setResponse] = useState<PingResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    setApiUrl(process.env.NEXT_PUBLIC_API_URL || 'Not set');
  }, []);

  const testConnection = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Attempting to connect to:', process.env.NEXT_PUBLIC_API_URL);
      
      // First test root endpoint
      try {
        const rootResponse = await api.get('/');
        console.log('Root endpoint response:', rootResponse.data);
      } catch (rootError) {
        console.error('Root endpoint error:', rootError);
      }

      // Then test ping endpoint
      const { data } = await api.get<PingResponse>('/api/test/ping');
      console.log('Ping endpoint response:', data);
      setResponse(data);
    } catch (err: any) {
      const errorMessage = err.response 
        ? `Failed to connect to backend: ${err.response.status} ${err.response.statusText}`
        : 'Failed to connect to backend: Network Error';
      setError(errorMessage);
      console.error('Connection test failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Connection Test</h2>
      
      <div className="mb-4 p-2 bg-gray-100 rounded">
        <p><strong>API URL:</strong> {apiUrl}</p>
      </div>

      <button
        onClick={testConnection}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
      >
        {loading ? 'Testing...' : 'Test Connection'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {response && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <p>Message: {response.message}</p>
          <p>Timestamp: {response.timestamp}</p>
        </div>
      )}
    </div>
  );
}