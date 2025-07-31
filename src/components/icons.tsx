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
        <path d="M303.2,256.3c0-23.4-1-41.3-3-53.6c-2-12.3-5.2-22.3-9.5-29.8c-4.3-7.5-9.9-12.9-16.8-16.2c-6.9-3.3-15-4.9-24.3-4.9c-9.5,0-17.8,1.6-24.8,4.9c-7,3.3-12.6,8.6-16.8,16.2c-4.2,7.6-7.4,17.6-9.5,29.8c-2.1,12.2-3.1,30.2-3.1,53.6c0,23.4,1,41.3,3,53.6c2,12.3,5.2,22.3,9.5,29.8c4.3,7.5,9.9,12.9,16.8,16.2c6.9,3.3,15,4.9,24.3,4.9c9.5,0,17.8-1.6,24.8-4.9c7-3.3,12.6-8.6,16.8-16.2c4.2-7.6,7.4-17.6,9.5-29.8C302.2,297.6,303.2,279.7,303.2,256.3z M256,473.7c-120.2,0-217.7-97.5-217.7-217.7S135.8,38.3,256,38.3s217.7,97.5,217.7,217.7S376.2,473.7,256,473.7z M435.3,256.3c0-99.1-80.2-179.3-179.3-179.3S76.7,157.1,76.7,256.3s80.2,179.3,179.3,179.3S435.3,355.4,435.3,256.3z" />
    </svg>
  )),
};
