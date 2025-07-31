import { forwardRef, type SVGProps } from 'react';
import { 
    FileText, 
    User, 
    Users, 
    LineChart, 
    LogOut, 
    Search, 
    Plus, 
    Building2, 
    Mail, 
    Phone, 
    GraduationCap, 
    Briefcase, 
    FileUp, 
    CheckCircle2,
    BarChart,
    ChevronDown,
    Home,
    FilePlus2,
    MoreHorizontal,
    Star,
} from 'lucide-react';

export const Icons = {
  FileText,
  User,
  Users,
  LineChart,
  LogOut,
  Search,
  Plus,
  Building2,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  FileUp,
  CheckCircle2,
  BarChart,
  ChevronDown,
  Home,
  FilePlus2,
  MoreHorizontal,
  Star,
  HyundaiLogo: forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg ref={ref} viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256s114.6 256 256 256zM157.9 148.4c-28.7 8.3-52.5 28.2-67.8 54.8c-15.3 26.6-22.3 58.2-20.2 89.2c2.1 31 11.7 60.6 28.4 87.2c16.7 26.6 40.8 47.9 69.8 61.3c29 13.4 62.4 18.6 94.6 15.3c32.2-3.3 62.2-15.1 87.1-33.9c24.9-18.8 44-44.4 54.9-74.2c10.9-29.8 13.5-62.4 7.6-93.5c-5.9-31.1-20.6-59.4-42.2-82.1c-21.6-22.7-50-39.2-81.9-47.5c-31.9-8.3-65.7-7.9-96.8 1.1c-10.4 3-20.6 6.9-30.5 11.4c-9.9 4.5-19.5 9.9-28.6 16.1s-17.8 13.2-25.7 20.8c-7.9 7.6-14.9 15.8-21 24.5c-6.1 8.7-11.2 17.9-15.4 27.4c-4.2 9.5-7.5 19.3-9.8 29.3c-2.3 10-3.6 20.2-3.8 30.4c-0.2 10.2 0.5 20.4 2.3 30.4c1.8 10 4.7 19.9 8.6 29.4c3.9 9.5 8.7 18.6 14.4 27.2c5.7 8.6 12.2 16.6 19.4 23.9c7.2 7.3 15.1 13.8 23.5 19.5c8.4 5.7 17.3 10.6 26.6 14.5c9.3 3.9 18.9 6.8 28.7 8.6c19.6 3.6 39.7 3.6 59.3-0.1c19.6-3.7 38.3-11.2 55.1-21.8c16.8-10.6 31.4-24.2 42.9-40.2c11.5-16 19.7-34.1 24-53.5c4.3-19.4 4.6-39.7 0.9-59.5c-3.7-19.8-11.3-38.6-22.3-55.2c-11-16.6-25.2-30.8-41.9-41.5c-16.7-10.7-35.6-17.7-55.6-20.6c-20-2.9-40.6-1.6-60.5 4.3" />
    </svg>
  )),
};
