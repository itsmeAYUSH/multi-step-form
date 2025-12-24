import { useForm } from "react-hook-form";
import { useOnboardingStore } from "./useOnboardingStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

interface StepOneData {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export default function StepOneBasicInfo() {
  const { formData, updateFormData, setCurrentStep } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOneData>({
    defaultValues: formData,
  });

  const onSubmit = (data: StepOneData) => {
    updateFormData(data);
    setCurrentStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          placeholder="Enter your full name"
        />
        {errors.fullName && (
          <p className="text-xs text-red-600 mt-2 font-medium">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          {...register("email", { required: "This field is required" })}
          placeholder="name@gmail.com"
        />
        {errors.email && (
          <p className="text-xs text-red-600 mt-2 font-medium">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phoneNumber">Phone Number *</Label>
        <Input
          id="phoneNumber"
          {...register("phoneNumber", { required: "This field is required" })}
          placeholder="xxxxxxxxxx"
        />
        {errors.phoneNumber && (
          <p className="text-xs text-red-600 mt-2 font-medium">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full mt-8">
        Continue to Next Step
      </Button>
    </form>
  );
}
