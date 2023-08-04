import { FormGroup } from '@angular/forms';

export enum RequiredMessages {
  required = 'Campo requerido',
  email_hasError_email = 'Email no válido',
  username_hasError_minlength = '4 caracteres alfanuméricos',
  password_hasError_requirements = '8 caracteres alfanuméricos y una mayúscula',
  confirmPassword_hasError_requirements = '8 caracteres alfanuméricos y una mayúsculas',
  phoneNumber_hasError_pattern = 'El teléfono debe tener entre 7 y 10 dígitos',
  phoneCode_hasError_pattern = 'El código de país debe tener entre 1 y 4 dígitos',
  postalCode_hasError_pattern = 'El código postal debe tener entre 5 y 6 dígitos',
  description_hasError_maxLength = 'La descripción no puede tener más de 2000 caracteres',
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

export const hasPatternError = (form: FormGroup, input: string): string => {
  const inputSplit = input.split('.');
  const phoneNumberControl = form.get(input);
  return phoneNumberControl?.hasError('pattern')
    ? RequiredMessages[
        `${inputSplit[1]}_hasError_pattern` as keyof typeof RequiredMessages
      ]
    : '';
};
