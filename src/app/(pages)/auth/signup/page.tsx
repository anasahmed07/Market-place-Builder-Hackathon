'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/,{message:"Invalid phone number. Please use the international format (e.g., +1234567890)."})
})

export default function Signup() {
    const Router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
      email: '',
      password: '',
      phone: ''
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
  
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      // Parse the JSON response
      const data = await response.json();
  
      // Handle non-OK responses (e.g., 400 for user already exists)
      if (!response.ok) {
        // Check if the error is due to the user already existing
        if (data.error === "User with this email already exists.") {
          // Show a non-error prompt (e.g., a warning toast)
          toast({
            title: "Email Already Registered",
            description: "This email is already associated with an account. Please use a different email.",
            variant: "destructive", // Use a warning variant (if your toast library supports it)
          });
          return; // Exit the function early
        }
  
        // For other errors, throw an error
        throw new Error(data.error || "Failed to create new user");
      }
  
      // Handle successful response
      toast({
        title: "Success",
        description: data.message || "User created successfully!. Redirecting to Login.",
      });
  
      // Optionally, do something with the created user data
      if (data.user) {
        console.log("Created user:", data.user);
        Router.push("/auth/login")
        // You can redirect the user or update the UI here
      }
    } catch (error) {
      console.error("Error creating user:", error);
  
      // Show error toast for unexpected errors
      toast({
        title: "Error",
        variant: "destructive",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while creating the user. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className='flex justify-center items-center pt-10 pb-52'>
    <Card className='w-full mx-3 md:w-[500px]'>
        <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
            Create Your Account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                        <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                        <Input placeholder="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating New User...' : 'Sign Up'}
                </Button>
                </form>
            </Form>
        </CardContent>
        <CardFooter className='text-center'>
          Already A user ? <Link className='pl-1 underline hover:text-blue-600' href={"/auth/login"}> LogIn</Link>
        </CardFooter>
    </Card>
    </div>
  )
}

