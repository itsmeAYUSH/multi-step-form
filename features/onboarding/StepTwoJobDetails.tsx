import { useForm } from "react-hook-form";
import { useOnboardingStore } from "./useOnboardingStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface StepTwoData {
  department: string;
  role: string;
  dateOfJoining: string;
}

export default function StepTwoJobDetails() {
  const { formData, updateFormData, setCurrentStep } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepTwoData>({
    defaultValues: formData,
  });

  const onSubmit = (data: StepTwoData) => {
    updateFormData(data);
    setCurrentStep(3);
  };

  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"];
  const roles = ["Developer", "Manager", "Analyst", "Designer", "Support"];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        {/* Department */}
        <div>
          <Label htmlFor="department">Department *</Label>
          <select
            id="department"
            {...register("department", { required: "Department is required" })}
            className="w-full h-11 px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-xs text-red-600 mt-2 font-medium">
              {errors.department.message}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <Label htmlFor="role">Role *</Label>
          <select
            id="role"
            {...register("role", { required: "Role is required" })}
            className="w-full h-11 px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="text-xs text-red-600 mt-2 font-medium">{errors.role.message}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <Label htmlFor="dateOfJoining">Date of Joining *</Label>
          <Input
            id="dateOfJoining"
            type="date"
            {...register("dateOfJoining", { required: "Date is required" })}
          />
          {errors.dateOfJoining && (
            <p className="text-xs text-red-600 mt-2 font-medium">
              {errors.dateOfJoining.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="pt-8 flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep(1)}
            className="flex-1"
          >
            Back
          </Button>

          <Button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2"
          >
            <ArrowRight size={18} />
            Next
          </Button>
        </div>
      </div>
    </form>
  );
}
