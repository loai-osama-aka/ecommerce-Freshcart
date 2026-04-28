import { LoginForm } from "@/components/ui/login-form"

export default function Page() {
  return (
    <div className="flex  w-full items-center justify-center  bg-white dark:bg-gray-900">
      <div className="w-full  md:max-w-lg lg:max-w-xl  shadow-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <LoginForm />
      </div>
    </div>
  )
}
