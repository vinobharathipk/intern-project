'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockInterns, reportData } from '@/lib/data';
import type { Intern } from '@/lib/types';
import { Icons } from './icons';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#1E3A8A', '#A78BFA', '#E0E7FF', '#8884d8', '#82ca9d'];

export function Dashboard() {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedInterns = localStorage.getItem('interns');
    setInterns(storedInterns ? JSON.parse(storedInterns) : mockInterns);
  }, []);

  const filteredInterns = interns.filter(
    (intern) =>
      intern.studentName.toLowerCase().includes(filter.toLowerCase()) ||
      intern.department.toLowerCase().includes(filter.toLowerCase()) ||
      intern.college.toLowerCase().includes(filter.toLowerCase())
  );

  const getStatusVariant = (status: Intern['status']) => {
    switch (status) {
      case 'Verified':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All Submissions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <Icons.Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search submissions..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
      </div>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>Intern Submissions</CardTitle>
            <CardDescription>
              An overview of all intern referrals submitted.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Submission Date
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterns.map((intern) => (
                  <TableRow key={intern.id} className={intern.priority ? 'bg-primary/5' : ''}>
                    <TableCell>
                      <div className="font-medium">{intern.studentName}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {intern.email}
                      </div>
                    </TableCell>
                    <TableCell>{intern.department}</TableCell>
                    <TableCell className="hidden sm:table-cell">{intern.college}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {intern.submissionDate}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(intern.status)}>
                        {intern.status}
                      </Badge>
                      {intern.priority && (
                        <Icons.HyundaiLogo className="ml-2 inline h-4 w-4 text-primary" />
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Icons.MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Submissions by Department</CardTitle>
                <CardDescription>A breakdown of referrals per department.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={reportData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {reportData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}/>
                    <Legend/>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
