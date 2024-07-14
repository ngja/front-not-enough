import {OtherComponentsForm} from "@/components/forms/other-components-form";


export default function SecondFormPage() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-1/2 border-2 p-6 rounded-xl">
        <OtherComponentsForm />
      </div>
    </div>
  )
}