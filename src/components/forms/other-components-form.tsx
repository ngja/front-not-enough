"use client"

import {z} from "zod";
import {useToast} from "@/components/ui/use-toast";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {Input} from "@/components/ui/input";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const items = [
  {
    id: "a",
    label: "a",
  },
  {
    id: "b",
    label: "b",
  },
  {
    id: "c",
    label: "c",
  },
  {
    id: "d",
    label: "d",
  },
  {
    id: "e",
    label: "e",
  },
] as const

const formSchema = z.object({
  check: z.boolean(),
  multiCheck: z.array(z.string()).refine((value) => value.some((item) => item), {
    message:  "You have to select at least one item.",
  }),
  date: z.date({required_error: "A date is required."}),
  text: z.string(),
  radio: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notificaiton type."
  }),
  select: z.string(),
})

type OtherComponentsFormValues = z.infer<typeof formSchema>

export function OtherComponentsForm() {
  const { toast } = useToast()

  const form = useForm<OtherComponentsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      check: false,
      multiCheck: [],
      text: "",
      radio: "all",
    }
  })

  function onSubmit(values: OtherComponentsFormValues) {
    toast({
      title: "Plain Form",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      )
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 단일 체크박스 */}
        <FormField control={form.control} name="check" render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, odio.
              </FormLabel>
              <FormDescription>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat hic nihil similique. Adipisci, ea, obcaecati!
              </FormDescription>
            </div>
          </FormItem>
        )}/>
        {/* 다중 체크박스 */}
        <FormField name="multiCheck" control={form.control} render={({ field }) => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Sidebar</FormLabel>
              <FormDescription>
                Select the items you want to display in the sidebar.
              </FormDescription>
            </div>
            {items.map((item) => (
              <FormField key={item.id} control={form.control} name="multiCheck" render={({ field }) => {
                return (
                  <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(field.value?.filter((value) => value !== item.id))
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                )
              }}
              />
            ))}
            <FormMessage />
          </FormItem>
        )}/>
        {/* 달력 */}
        <FormField control={form.control} name="date" render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date of birth</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "yyyy-MM-dd")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Your date of birth is used to calculate your age.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}/>
        {/* 텍스트 */}
        <FormField control={form.control} name="text" render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}/>
        {/* Radio Group */}
        <FormField control={form.control} name="radio" render={({ field }) => (
          <FormItem>
            <FormLabel>Notify me about...</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="all" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    All new message
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="mentions" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Direct messages and mentions
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="none" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Nothing
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}/>
        {/* Select */}
        <FormField control={form.control} name="select" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="a@example.com">a@example.com</SelectItem>
                <SelectItem value="b@google.com">b@google.com</SelectItem>
                <SelectItem value="c@kakao.com">c@kakao.com</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              You can manage email addresses in your
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}/>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}