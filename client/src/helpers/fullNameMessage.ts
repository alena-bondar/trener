type FullName = (watch: any) => string;

export const fullNameMessage: FullName = (watch) => {
  const name = watch('name');
  const lastName = watch('lastName');

  if (name && lastName) {
    if (name.length === 1 && lastName.length === 1) {
      return `Поле ім'я та прізвище має мати принаймні 2 символа`;
    }

    if (name.length === 1) {
      return `Поле ім'я`;
    }

    if (lastName.length < 2) {
      return 'Поле прізвище має мати принаймні 2 символа';
    }
  }

  return '';
};
