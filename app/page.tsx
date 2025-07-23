'use client';

import { useState } from 'react';
import { EligibilityForm } from '@/components/eligibility-form';
import { EligibilityResult } from '@/components/eligibility-result';
import { EligibilityHistoryViewer } from '@/components/eligibility-history';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, FileText, History } from 'lucide-react';
import { EligibilityCheckResponse } from '@/shared/types';

export default function Home() {
  const [latestResult, setLatestResult] = useState<EligibilityCheckResponse | null>(null);
  const [activeTab, setActiveTab] = useState('check');

  const handleCheckComplete = (result: EligibilityCheckResponse) => {
    setLatestResult(result);
    setActiveTab('result'); // Switch to the Results tab
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Insurance Eligibility Verification
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Verify patient insurance eligibility, check coverage details, and manage eligibility history with our comprehensive verification system.
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="check" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              New Check
            </TabsTrigger>
            <TabsTrigger value="result" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Results
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="check" className="space-y-6">
            <EligibilityForm onCheckComplete={handleCheckComplete} />
            
            {/* Instructions */}
            <div className="max-w-2xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Test Instructions</h3>
              <div className="text-sm text-blue-800 space-y-2">
                <p><strong>Active Coverage:</strong> Use any member number that doesn't start with special prefixes</p>
                <p><strong>Inactive Coverage:</strong> Use member number starting with "INACTIVE"</p>
                <p><strong>System Error:</strong> Use member number starting with "ERROR"</p>
                <p><strong>Sample Patient ID:</strong> PAT-001, PAT-002, etc.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="result" className="space-y-6">
            {latestResult ? (
              <EligibilityResult result={latestResult} />
            ) : (
              <div className="text-center py-12">
                <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">No Recent Results</h3>
                <p className="text-gray-400">
                  Run an eligibility check to see results here
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            <EligibilityHistoryViewer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}