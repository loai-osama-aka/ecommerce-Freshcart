import { FaLock } from "react-icons/fa";

export function ResetPasswordForm({ onPasswordChange }: any) {
  return (
    <div className="relative">
      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="password"
        placeholder="Enter new password"
        onChange={(e) => onPasswordChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-xl border-2
        border-gray-200 dark:border-gray-600
        bg-white dark:bg-gray-700
        text-gray-900 dark:text-white
        focus:ring-2 focus:ring-green-500 outline-none"
      />
    </div>
  );
}