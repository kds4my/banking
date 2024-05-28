import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";

import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");

interface CustomForm {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}
const CustomForm = ({ control, label, placeholder, name }: CustomForm) => {
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <div className="form-item">
            <FormLabel className="form-label">{label}</FormLabel>
            <div className="flex flex-col w-full">
              <FormControl>
                <Input
                  className="input-class"
                  placeholder={placeholder}
                  type={name === "password" ? "password" : "text"}
                  {...field}
                />
              </FormControl>
              <FormMessage className="form-message mt-2 " />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CustomForm;
