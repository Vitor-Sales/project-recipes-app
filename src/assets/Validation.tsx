export default function userValidation(email: string, password: string) {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  const passwordLength = 7;
  return !!(emailRegex.test(email) && password.length >= passwordLength);
} // Aproveitado do TrybeWalet
