'use client'

import React from 'react'
import { ArrowLeft, MapPin, Calendar, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useJobDetailsQuery } from '@/redux/api/jobsApi';
const JobDetails = ({id}:any) => {
 // Early return if `id` is not yet available (e.g., during SSR)
 if (!id) {
    return <div>Loading...</div>;
  }

  const { data: jobDetails, isError, isLoading } = useJobDetailsQuery(id);
  
  const job = jobDetails?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching job details.</div>;
  }

  if (!job) {
    return <div>Job not found.</div>;
  }
  return (
<div className="container py-8">
        <Link href="/" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to job listings
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">{job?.title}</CardTitle>
                  <CardDescription className="mt-1">{job?.company?.name}</CardDescription>
                </div>
                <img
                  src={job?.company?.logo || "/placeholder.svg"}
                  alt={job?.company?.name || "Company"}
                  className="h-12 w-12"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{job?.type}</Badge>
                <Badge variant="outline">${job?.min_salary} - ${job?.max_salary}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {job?.location}
                </div>
              </div>

              <div className="space-y-6">
                <section>
                  <h3 className="font-semibold mb-2">Job Description</h3>
                  <p>{job?.description}</p>
                </section>

                <section>
                  <h3 className="font-semibold mb-2">Responsibilities</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job?.responsibilities?.map((resp: any, index: any) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job?.skills?.map((skill: any, index: any) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="font-semibold mb-2">Benefits</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job?.benefits?.map((benefit: any, index: any) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Experience: {job?.experience}</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Education: {job?.education}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Posted on: {new Date(job?.posted_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Apply by: {new Date(job?.apply_by).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About {job?.company_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{job?.company_description}</p>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg">
              Apply Now
            </Button>
          </div>
        </div>
      </div>  )
}

export default JobDetails