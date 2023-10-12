import { Controller, UseControllerProps, FieldValues } from "react-hook-form";
import { PasswordInput, PasswordInputProps } from "@components";

export function FormPasswordInput<FormType extends FieldValues>({
  control,
  rules,
  name,
  ...passwordInputProps
}: PasswordInputProps & UseControllerProps<FormType>) {
  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field, fieldState }) => (
        <PasswordInput
          value={field.value}
          onChangeText={field.onChange}
          errorMessage={fieldState.error?.message}
          {...passwordInputProps}
        />
      )}
    />
  );
}
