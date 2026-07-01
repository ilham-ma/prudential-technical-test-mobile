import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button, ButtonText } from "../../ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "../../ui/form-control";
import { Input, InputField } from "../../ui/input";
import { VStack } from "../../ui/vstack";
import { ILoginFormProps } from "./props.interface";
import { LoginFormValues, loginSchema } from "./schema";

export default function LoginForm(props: ILoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
    mode: "onTouched",
  });

  return (
    <VStack space="xl" className="w-full">
      <FormControl isInvalid={!!errors.username}>
        <FormControlLabel>
          <FormControlLabelText>Username</FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input>
              <InputField
                placeholder="johnDoe"
                autoCapitalize="none"
                autoComplete="username"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            </Input>
          )}
        />
        {errors.username && (
          <FormControlError>
            <FormControlErrorText>
              {errors.username.message}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormControlLabel>
          <FormControlLabelText>Password</FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input>
              <InputField
                placeholder="********"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            </Input>
          )}
        />
        {errors.password && (
          <FormControlError>
            <FormControlErrorText>
              {errors.password.message}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <Button onPress={handleSubmit(props.onSubmit)} disabled={props.loading}>
        {props.loading ? (
          <ButtonText>Loading...</ButtonText>
        ) : (
          <ButtonText>Login</ButtonText>
        )}
      </Button>
    </VStack>
  );
}
