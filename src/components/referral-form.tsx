'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Icons } from './icons';
import { Separator } from './ui/separator';
import type { Intern } from '@/lib/types';
import { mockInterns } from '@/lib/data';

const referralFormSchema = z.object({
  studentName: z.string().min(2, 'Name must be at least 2 characters.'),
  studentEmail: z.string().email('Please enter a valid email.'),
  studentPhone: z.string().min(10, 'Please enter a valid phone number.'),
  degree: z.string().min(2, 'Degree is required.'),
  department: z.string().min(2, 'Department is required.'),
  college: z.string().min(2, 'College name is required.'),
  hodEmail: z.string().email('Please enter a valid HOD email.'),
  internshipType: z.enum(['Internship', 'Project']),
  referralName: z.string().min(2, 'Your name is required.'),
  referralDepartment: z.string().min(2, 'Your department is required.'),
  referralCompanyId: z.string().min(1, 'Your company ID is required.'),
  resume: z.any().refine((files) => files?.length == 1, 'Resume is required.'),
  bonafideCertificate: z.any().refine((files) => files?.length == 1, 'Bonafide certificate is required.'),
  studentId: z.any().refine((files) => files?.length == 1, 'Student ID is required.'),
  vaccinationCertificate: z.any().refine((files) => files?.length == 1, 'Vaccination certificate is required.'),
});

type ReferralFormValues = z.infer<typeof referralFormSchema>;

const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export function ReferralForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ReferralFormValues>({
    resolver: zodResolver(referralFormSchema),
    defaultValues: {
      studentName: '',
      studentEmail: '',
      studentPhone: '',
      degree: '',
      department: '',
      college: '',
      hodEmail: '',
      internshipType: 'Internship',
      referralName: '',
      referralDepartment: '',
      referralCompanyId: '',
    },
  });

  async function onSubmit(data: ReferralFormValues) {
    setIsLoading(true);
    
    try {
        const [resume, bonafideCertificate, studentId, vaccinationCertificate] = await Promise.all([
            fileToDataURL(data.resume[0]),
            fileToDataURL(data.bonafideCertificate[0]),
            fileToDataURL(data.studentId[0]),
            fileToDataURL(data.vaccinationCertificate[0]),
        ]);

        const existingInternsJSON = localStorage.getItem('interns');
        const existingInterns: Intern[] = existingInternsJSON ? JSON.parse(existingInternsJSON) : mockInterns;
        
        const newIntern: Intern = {
            id: `HIC${(existingInterns.length + 1).toString().padStart(3, '0')}`,
            studentName: data.studentName,
            email: data.studentEmail,
            phone: data.studentPhone,
            degree: data.degree,
            department: data.department,
            college: data.college,
            hodEmail: data.hodEmail,
            internshipType: data.internshipType,
            submissionDate: new Date().toISOString().split('T')[0],
            status: 'Pending',
            priority: Math.random() > 0.5, // Randomly assign priority for demo
            referralName: data.referralName,
            resume,
            bonafideCertificate,
            studentId,
            vaccinationCertificate,
        };

        const updatedInterns = [...existingInterns, newIntern];
        localStorage.setItem('interns', JSON.stringify(updatedInterns));

        toast({
            title: "Submission Successful!",
            description: "The intern's details have been recorded.",
            variant: "default",
        });
        router.push('/submission-success');
    } catch (error) {
        console.error("Failed to save referral:", error);
        toast({
            title: "Submission Failed",
            description: "Could not process files and save the referral. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
        <CardHeader>
            <CardTitle>Intern Referral Form</CardTitle>
            <CardDescription>Please fill out the details below to submit a referral.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-primary">Student Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="studentName" render={({ field }) => (
                            <FormItem><FormLabel>Student Name</FormLabel><FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="studentEmail" render={({ field }) => (
                            <FormItem><FormLabel>Student Email</FormLabel><FormControl><Input type="email" placeholder="e.g., jane.doe@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="studentPhone" render={({ field }) => (
                            <FormItem><FormLabel>Student Phone</FormLabel><FormControl><Input type="tel" placeholder="e.g., (123) 456-7890" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="degree" render={({ field }) => (
                            <FormItem><FormLabel>Degree Program</FormLabel><FormControl><Input placeholder="e.g., B.Tech in Computer Science" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </div>

                <Separator/>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-primary">Educational Details</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="college" render={({ field }) => (
                            <FormItem><FormLabel>College/University</FormLabel><FormControl><Input placeholder="e.g., Institute of Technology" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="hodEmail" render={({ field }) => (
                            <FormItem><FormLabel>HOD Email</FormLabel><FormControl><Input type="email" placeholder="e.g., hod.cs@institute.edu" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="department" render={({ field }) => (
                            <FormItem><FormLabel>Preferred Department</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a department" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Engineering">Engineering</SelectItem><SelectItem value="Marketing">Marketing</SelectItem><SelectItem value="R&D">R&D</SelectItem><SelectItem value="IT">IT</SelectItem><SelectItem value="Finance">Finance</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="internshipType" render={({ field }) => (
                            <FormItem className="space-y-3"><FormLabel>Internship Type</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-4"><FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="Internship" /></FormControl><FormLabel className="font-normal">Internship</FormLabel></FormItem><FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="Project" /></FormControl><FormLabel className="font-normal">Project</FormLabel></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </div>

                <Separator />
                
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-primary">Referral Information</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="referralName" render={({ field }) => (
                            <FormItem><FormLabel>Your Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="referralDepartment" render={({ field }) => (
                            <FormItem><FormLabel>Your Department</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="referralCompanyId" render={({ field }) => (
                            <FormItem><FormLabel>Your Company ID</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </div>

                <Separator/>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-primary">Document Upload</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="resume" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Resume</FormLabel>
                                <FormControl><Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => field.onChange(e.target.files)} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="bonafideCertificate" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bonafide Certificate</FormLabel>
                                <FormControl><Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => field.onChange(e.target.files)} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="studentId" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Student ID Card</FormLabel>
                                <FormControl><Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => field.onChange(e.target.files)} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="vaccinationCertificate" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Vaccination Certificate</FormLabel>
                                <FormControl><Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => field.onChange(e.target.files)} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                     </div>
                     <FormDescription>Please upload all required documents. PDFs are preferred.</FormDescription>
                </div>
                
                <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Icons.LineChart className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Submitting...' : 'Submit Referral'}
                </Button>
                </div>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
