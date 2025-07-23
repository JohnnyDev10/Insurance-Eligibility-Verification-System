'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, User, CreditCard, Building2 } from 'lucide-react';
import { EligibilityCheckRequest, EligibilityCheckResponse } from '@/shared/types';

interface EligibilityFormProps {
  onCheckComplete: (result: EligibilityCheckResponse) => void;
}

export function EligibilityForm({ onCheckComplete }: EligibilityFormProps) {
  const [formData, setFormData] = useState<EligibilityCheckRequest>({
    patientId: '',
    name: '',
    dateOfBirth: '',
    memberNumber: '',
    insuranceCompany: '',
    serviceDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientId.trim()) newErrors.patientId = 'Patient ID is required';
    if (!formData.name.trim()) newErrors.name = 'Patient name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.memberNumber.trim()) newErrors.memberNumber = 'Member number is required';
    if (!formData.insuranceCompany) newErrors.insuranceCompany = 'Insurance company is required';
    if (!formData.serviceDate) newErrors.serviceDate = 'Service date is required';

    // Validate date of birth is not in future
    if (formData.dateOfBirth && new Date(formData.dateOfBirth) > new Date()) {
      newErrors.dateOfBirth = 'Date of birth cannot be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/eligibility/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to check eligibility');
      }

      const result: EligibilityCheckResponse = await response.json();
      onCheckComplete(result);
      
      // Reset form
      setFormData({
        patientId: '',
        name: '',
        dateOfBirth: '',
        memberNumber: '',
        insuranceCompany: '',
        serviceDate: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error checking eligibility:', error);
      setErrors({ submit: 'Failed to check eligibility. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof EligibilityCheckRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <CreditCard className="h-6 w-6" />
          Insurance Eligibility Check
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientId"
                  value={formData.patientId}
                  onChange={(e) => handleInputChange('patientId', e.target.value)}
                  placeholder="PAT-001"
                  className={errors.patientId ? 'border-red-500' : ''}
                />
                {errors.patientId && <p className="text-sm text-red-500">{errors.patientId}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="John Doe"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className={errors.dateOfBirth ? 'border-red-500' : ''}
              />
              {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
            </div>
          </div>

          {/* Insurance Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Insurance Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="memberNumber">Member Number</Label>
                <Input
                  id="memberNumber"
                  value={formData.memberNumber}
                  onChange={(e) => handleInputChange('memberNumber', e.target.value)}
                  placeholder="12345678"
                  className={errors.memberNumber ? 'border-red-500' : ''}
                />
                {errors.memberNumber && <p className="text-sm text-red-500">{errors.memberNumber}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="insuranceCompany">Insurance Company</Label>
                <Select 
                  value={formData.insuranceCompany} 
                  onValueChange={(value) => handleInputChange('insuranceCompany', value)}
                >
                  <SelectTrigger className={errors.insuranceCompany ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select insurance company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Blue Cross">Blue Cross</SelectItem>
                    <SelectItem value="Aetna">Aetna</SelectItem>
                    <SelectItem value="Cigna">Cigna</SelectItem>
                    <SelectItem value="United Healthcare">United Healthcare</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.insuranceCompany && <p className="text-sm text-red-500">{errors.insuranceCompany}</p>}
              </div>
            </div>
          </div>

          {/* Service Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Service Information
            </h3>
            <div className="space-y-2">
              <Label htmlFor="serviceDate">Service Date</Label>
              <Input
                id="serviceDate"
                type="date"
                value={formData.serviceDate}
                onChange={(e) => handleInputChange('serviceDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={errors.serviceDate ? 'border-red-500' : ''}
              />
              {errors.serviceDate && <p className="text-sm text-red-500">{errors.serviceDate}</p>}
            </div>
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'Checking Eligibility...' : 'Check Eligibility'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}