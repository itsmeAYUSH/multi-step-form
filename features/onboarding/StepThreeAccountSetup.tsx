import { useForm } from "react-hook-form";
import { useOnboardingStore } from "./useOnboardingStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StepThreeData {
  employeeId: string;
  password: string;
  confirmPassword: string;
}

export default function StepThreeAccountSetup() {
  const { formData, updateFormData, setCurrentStep, resetForm } =
    useOnboardingStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StepThreeData>({
    defaultValues: formData,
  });

  const password = watch("password");

  const onSubmit = (data: StepThreeData) => {
    updateFormData(data);

    const finalFormData = useOnboardingStore.getState().formData;
    console.log("Data:", finalFormData);
    localStorage.setItem("onboardingData", JSON.stringify(finalFormData));
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        {/* Employee ID */}
        <div>
          <Label htmlFor="employeeId">Employee ID *</Label>
          <Input
            id="employeeId"
            type="text"
            {...register("employeeId", { required: "Employee ID is required" })}
            placeholder="01"
          />
          {errors.employeeId && (
            <p className="text-xs text-red-600 mt-2 font-medium">
              {errors.employeeId.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            placeholder="Enter a secure password"
          />
          {errors.password && (
            <p className="text-xs text-red-600 mt-2 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-600 mt-2 font-medium">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="pt-8 flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep(2)}
            className="flex-1"
          >
            Back
          </Button>

          <Button
            type="submit"
            variant="success"
            className="flex-1"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}