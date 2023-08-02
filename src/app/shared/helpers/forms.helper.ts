import { FormGroup } from '@angular/forms';

export enum RequiredMessages {
  required = 'Campo requerido',
  email_hasError_email = 'Email incorrecto',
  username_hasError_minlength = '4 caracteres alfanuméricos',
  password_hasError_requirements = '8 caracteres alfanuméricos y una mayúscula',
  confirmPassword_hasError_requirements = '8 caracteres alfanuméricos y una mayúsculas',
}

export const checkValidation = (
  form: FormGroup,
  input: string
): boolean | undefined => {
  const validation =
    form.get(input)?.invalid &&
    (form.get(input)?.dirty || form.get(input)?.touched);
  return validation;
};

export const hasError = (
  form: FormGroup,
  input: string,
  validatorError: string
) => {
  return form.get(input)?.hasError(validatorError)
    ? RequiredMessages[
        `${input}_hasError_${validatorError}` as keyof typeof RequiredMessages
      ]
    : isRequired(form, input);
};

export const isRequired = (form: FormGroup, controlName: string): string => {
  return form.get(controlName)?.hasError('required')
    ? RequiredMessages['required' as keyof typeof RequiredMessages]
    : '';
};
