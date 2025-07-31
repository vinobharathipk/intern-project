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
    <svg ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="currentColor" {...props}>
        <path d="M84.3,169.3c-2.9,0.8-5.8,1.2-8.7,1.2c-15.9,0-28.8-12.9-28.8-28.8c0-4.2,0.9-8.3,2.6-12L25,35.3h21.4l20,81.1 c1.9-0.5,3.9-0.8,5.9-0.8c2.4,0,4.8,0.3,7,0.8L93.8,35.3h22.2l14.4,59.3c4.6-2.9,9.9-4.6,15.5-4.6c15.9,0,28.8,12.9,28.8,28.8 c0,15.9-12.9,28.8-28.8,28.8c-10.2,0-19.1-5.3-24.2-13.2L96.2,169C92.2,170,88.3,169.9,84.3,169.3z M135.9,101.3 c-9.9,0-17.9,8-17.9,17.9s8,17.9,17.9,17.9s17.9-8,17.9-17.9S145.8,101.3,135.9,101.3z M75.6,141.7c-9.9,0-17.9-8-17.9-17.9 c0-9.5,7.4-17.3,16.8-17.9l7,28.8C79.8,140.2,77.8,141.7,75.6,141.7z"/>
    </svg>
  )),
};
