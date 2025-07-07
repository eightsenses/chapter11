'use client';
type AuthFormProps = {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
};

const AuthForm: React.FC<AuthFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  buttonText
}) => {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-[400px] space-y-4">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="name@company.com"
          required
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
          パスワード
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          required
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
        />
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
