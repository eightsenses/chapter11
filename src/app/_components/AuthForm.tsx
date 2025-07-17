'use client';
import { useForm } from 'react-hook-form';

type AuthFormProps = {
  onSubmit: (data: FormData) => void;
  buttonText: string;
};

type FormData = {
  email: string;
  password: string;
};

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, buttonText }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[400px] space-y-4">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          className={`block w-full rounded-lg border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
          placeholder="name@company.com"
          {...register('email', {
            required: 'メールアドレスは必須です。',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'メールアドレスの形式が正しくありません。'
            }
          })}
          disabled={isSubmitting}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
          パスワード
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          className={`block w-full rounded-lg border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
          {...register('password', {
            required: 'パスワードはは必須です。',
            minLength: {
              value: 6,
              message: 'パスワードは6文字以上で入力してください。'
            }
          })}
          disabled={isSubmitting}
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};
export default AuthForm;
