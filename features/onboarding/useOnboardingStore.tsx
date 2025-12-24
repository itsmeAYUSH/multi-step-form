import { create } from 'zustand';

interface OnboardingFormData {
  // Step 1
  fullName: string;
  email: string;
  phoneNumber: string;
  
  // Step 2
  department: string;
  role: string;
  dateOfJoining: string;
  
  // Step 3
  employeeId: string;
  password: string;
  confirmPassword: string;
}

interface OnboardingStore {
  formData: OnboardingFormData;
  currentStep: number;
  updateFormData: (data: Partial<OnboardingFormData>) => void;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
}

const initialState: OnboardingFormData = {
  fullName: '',
  email: '',
  phoneNumber: '',
  department: '',
  role: '',
  dateOfJoining: '',
  employeeId: '',
  password: '',
  confirmPassword: '',
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  formData: initialState,
  currentStep: 1,
  
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
    
  setCurrentStep: (step) =>
    set({ currentStep: step }),
    
  resetForm: () =>
    set({ formData: initialState, currentStep: 1 }),
}));