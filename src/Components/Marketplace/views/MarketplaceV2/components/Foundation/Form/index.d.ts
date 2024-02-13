export type Props = {
  name: string
  submitFn: ({ email }: { email: string }, code: string) => any
}

export enum FORM_TYPE {
  REGISTER = 'register',
  LOGIN = 'login',
}
