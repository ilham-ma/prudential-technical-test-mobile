import { LoginFormValues } from "./schema";

export interface ILoginFormProps {
  loading?: boolean;
  onSubmit: (data: LoginFormValues) => void;
}
