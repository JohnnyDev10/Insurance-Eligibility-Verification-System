'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, DollarSign } from 'lucide-react';
import { EligibilityCheckResponse } from '@/shared/types';

interface EligibilityResultProps {
  result: EligibilityCheckResponse;
}

export function EligibilityResult({ result }: EligibilityResultProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Inactive':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'Unknown':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Unknown':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon(result.status)}
          Eligibility Check Result
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Status:</span>
          <Badge className={getStatusColor(result.status)}>
            {result.status}
          </Badge>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Patient ID:</span>
            <p className="mt-1">{result.patientId}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Insurance:</span>
            <p className="mt-1">{result.insuranceCompany}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Member Number:</span>
            <p className="mt-1">{result.memberNumber}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Service Date:</span>
            <p className="mt-1">{new Date(result.serviceDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Coverage Information */}
        {result.coverageInfo && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="flex items-center gap-2 font-semibold text-green-800 mb-3">
              <DollarSign className="h-4 w-4" />
              Coverage Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Deductible:</span>
                <p className="text-lg font-semibold text-green-700">
                  ${result.coverageInfo.deductible.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Copay:</span>
                <p className="text-lg font-semibold text-green-700">
                  ${result.coverageInfo.copay.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Out-of-Pocket Max:</span>
                <p className="text-lg font-semibold text-green-700">
                  ${result.coverageInfo.outOfPocketMax.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Errors */}
        {result.errors && result.errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">Errors:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
              {result.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Timestamp */}
        <div className="text-xs text-gray-500 text-center">
          Checked on {new Date(result.timestamp).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}