export type Intern = {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  degree: string;
  department: string;
  college: string;
  hodEmail: string;
  internshipType: "Internship" | "Project";
  submissionDate: string;
  status: "Pending" | "Verified" | "Rejected";
  priority: boolean;
  referralName: string;
  resume?: string; 
  bonafideCertificate?: string;
  studentId?: string;
  vaccinationCertificate?: string;
};
