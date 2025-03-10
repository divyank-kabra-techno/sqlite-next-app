import { Button } from "@/app/component/custom/button";
import { addCustomer, getCustomerByMobile } from "@/database/customers";
import useDebounce from "@/utils/useDebounce";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface customerFormProps {
  handleCustomerId: (id: number) => void;
}

interface customerProps {
  id: number | null;
  mobile: string;
  name: string;
}
export default function CustomerForm({ handleCustomerId }: customerFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<customerProps>({
    defaultValues: {
      id: null,
      mobile: "",
      name: "",
    },
  });

  const mobile = watch("mobile");
  const debouncedMobile = useDebounce(mobile, 500);
  useEffect(() => {
    if (debouncedMobile) {
      fetchCustomer(debouncedMobile);
    }
  }, [debouncedMobile]);

  const fetchCustomer = async (mobile: string) => {
    const customer = await getCustomerByMobile(mobile);
    if (customer) {
      setValue("name", customer.name);
      setValue("id", customer.id);
      setCustomerId(customer.id);
    }
  };
  const handleCustomerSubmit = async (data: customerProps) => {
    const customerData = await addCustomer({
      name: data.name,
      mobile: data.mobile,
    });
    setCustomerId(customerData.id);
    setValue("id", customerData.id);
  };
  const setCustomerId = (id: number) => {
    handleCustomerId(id);
  };

  return (
    <form onSubmit={handleSubmit(handleCustomerSubmit)} className="space-y-4 mb-3">
      <div className="grid grid-cols-3 gap-3">
        <input
          {...register("mobile")}
          placeholder="Customer Mobile Number"
          className={`border p-2 rounded-md shadow-sm ${
            errors.mobile ? "border-red-500 mb-1 error-input" : ""
          }`}
        />
        <input
          {...register("name")}
          placeholder="Customer Name"
          className={`border p-2 rounded-md shadow-sm ${
            errors.name ? "border-red-500 mb-1 error-input" : ""
          }`}
          readOnly={!!watch("id")}
        />
        {!watch("id") && (
          <Button variant="primary" className="w-1/2">
            Add
          </Button>
        )}
      </div>
    </form>
  );
}
