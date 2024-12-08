'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GraduationCap, Calendar, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function StudentDashboard() {
  return (
    <DashboardLayout requiredRole="student">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 in progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: Today 2:00 PM</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Assignments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 due this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Submitted Assignment</p>
                  <p className="text-sm text-muted-foreground">Introduction to React - Week 3</p>
                </div>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Completed Quiz</p>
                  <p className="text-sm text-muted-foreground">JavaScript Fundamentals</p>
                </div>
                <span className="text-sm text-muted-foreground">Yesterday</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Joined Live Session</p>
                  <p className="text-sm text-muted-foreground">Web Development Basics</p>
                </div>
                <span className="text-sm text-muted-foreground">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Web Development Basics</span>
                  <span className="text-muted-foreground">85%</span>
                </div>
                <Progress value={85} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">JavaScript Fundamentals</span>
                  <span className="text-muted-foreground">70%</span>
                </div>
                <Progress value={70} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Introduction to React</span>
                  <span className="text-muted-foreground">45%</span>
                </div>
                <Progress value={45} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}