'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, History, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { EligibilityHistory } from '@/shared/types';

export function EligibilityHistoryViewer() {
  const [patientId, setPatientId] = useState('');
  const [allChecks, setAllChecks] = useState([]); // Store all checks
  const [filteredChecks, setFilteredChecks] = useState([]); // Store filtered checks
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Inactive':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Unknown':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
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

  useEffect(() => {
    const fetchAllChecks = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/eligibility/history`);
        if (!response.ok) {
          throw new Error('Failed to fetch eligibility history');
        }
        const data = await response.json();
        setAllChecks(data);
        setFilteredChecks(data);
      } catch (error) {
        setError('Failed to fetch eligibility history. Please try again.');
        setAllChecks([]);
        setFilteredChecks([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllChecks();
  }, []);

  const handleSearch = () => {
    if (!patientId.trim()) {
      setFilteredChecks(allChecks);
      setError('');
      return;
    }
    const filtered = allChecks.filter((check: any) => check.patientId.toLowerCase() === patientId.trim().toLowerCase());
    setFilteredChecks(filtered);
    if (filtered.length === 0) {
      setError('No eligibility checks found for this patient.');
    } else {
      setError('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-6 w-6" />
          Eligibility History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Enter Patient ID (e.g., PAT-001)"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              onKeyPress={handleKeyPress}
              className={error ? 'border-red-500' : ''}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <Button onClick={handleSearch} disabled={isLoading}>
            <Search className="h-4 w-4 mr-2" />
            {isLoading ? 'Loading...' : 'Search'}
          </Button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {patientId.trim() ? `Patient ID: ${patientId}` : 'All Patients'}
            </h3>
            <Badge variant="outline">
              {filteredChecks.length} check{filteredChecks.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          {filteredChecks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No eligibility checks found{patientId.trim() ? ' for this patient.' : '.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Member #</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Errors</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredChecks.map((check: any) => (
                    <TableRow key={check.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{new Date(check.timestamp).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(check.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(check.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(check.status)}
                            {check.status}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>{check.insuranceCompany}</TableCell>
                      <TableCell className="font-mono text-sm">{check.memberNumber}</TableCell>
                      <TableCell>
                        {check.coverageInfo ? (
                          <div className="text-xs space-y-1">
                            <div>Deductible: ${check.coverageInfo.deductible.toLocaleString()}</div>
                            <div>Copay: ${check.coverageInfo.copay}</div>
                            <div>Max: ${check.coverageInfo.outOfPocketMax.toLocaleString()}</div>
                          </div>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {check.errors && check.errors.length > 0 ? (
                          <div className="text-xs text-red-600 space-y-1">
                            {check.errors.map((error: string, index: number) => (
                              <div key={index}>{error}</div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400">None</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}