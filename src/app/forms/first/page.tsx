import {PlainForm} from "@/components/forms/plain-form";

export default function FirstFormPage() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-1/2 border-2 p-6 rounded-xl">
        <PlainForm />
      </div>
    </div>
  )
}