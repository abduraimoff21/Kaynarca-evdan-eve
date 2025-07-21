import { validateProps } from "../../common/types";

export default function validate(values: validateProps) {
  let errors = {} as validateProps;

  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
   if (!values.number) {
    errors.number = "Phone number is required"; // Added phone number validation
  } else if (!/^\+?[0-9\s-()]{7,20}$/.test(values.number)) { // Basic phone number regex
    errors.number = "Phone number is invalid";
  }
  if (!values.message) {
    errors.message = "Message is required";
  }
  return errors;
}
