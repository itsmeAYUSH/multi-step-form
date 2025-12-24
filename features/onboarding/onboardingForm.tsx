'use client';

import { useOnboardingStore } from './useOnboardingStore';
import StepOneBasicInfo from './StepOneBasicInfo';
import StepTwoJobDetails from './StepTwoJobDetails';
import StepThreeAccountSetup from './StepThreeAccountSetup';
import { Check } from 'lucide-react';

export default function OnboardingForm() {
  const { currentStep, setCurrentStep } = useOnboardingStore();

  const steps = [
    'Basic Info',
    'Job Details',
    'Account Setup',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Employee Onboarding
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Step {currentStep} of {steps.length}
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            {steps.map((label, index) => {
              const step = index + 1;
              const completed = currentStep > step;
              const active = currentStep === step;

              return (
                <div key={label} className="flex items-center flex-1">
                  <button
                    onClick={() => step <= currentStep && setCurrentStep(step)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 flex-shrink-0
                      ${completed && 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'}
                      ${active && 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg ring-4 ring-blue-200'}
                      ${!completed && !active && 'border-2 border-gray-300 text-gray-400 bg-white'}
                    `}
                  >
                    {completed ? <Check size={20} /> : step}
                  </button>

                  {index !== steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                      completed ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between px-2">
            {steps.map((label) => (
              <div key={label} className="flex-1 text-center">
                <span className="text-sm font-semibold text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-10 shadow-lg">
          {currentStep === 1 && <StepOneBasicInfo />}
          {currentStep === 2 && <StepTwoJobDetails />}
          {currentStep === 3 && <StepThreeAccountSetup />}
        </div>
      </div>
    </div>
  );
}
