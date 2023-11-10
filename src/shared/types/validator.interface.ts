type ValidationResult = {
  error: Error,
  valid: false,
} | {
  error: null,
  valid: true,
};

export interface Validator<T> {
  validate(value: T): ValidationResult
}
