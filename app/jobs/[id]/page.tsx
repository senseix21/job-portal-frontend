"use client"
import { ArrowLeft, MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NavBar } from '@/components/nav-bar'
import { useRouter } from 'next/navigation'
import { useJobDetailsQuery } from '@/redux/api/jobsApi'

// This would typically come from an API or database
const jobData = {
  "id": "675e64c40d2be87d4ade37b1",
  "title": "DevOps Engineer",
  "description": "We are seeking a skilled DevOps Engineer to join our dynamic team. In this role, you will be responsible for developing and maintaining software with DevOps applications, ensuring smooth integration and deployment processes, and optimizing our infrastructure for maximum efficiency and reliability.",
  "location": "New York, NY",
  "salary_range": "$50,000 - $90,000",
  "type": "Full-time",
  "experience": "Mid-level",
  "education": "Bachelor's degree",
  "skills": [
    "JavaScript",
    "Node.js",
    "React",
    "MongoDB",
    "APIs",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "AWS",
    "Terraform"
  ],
  "responsibilities": [
    "Write clean, maintainable code",
    "Collaborate with cross-functional teams",
    "Work on performance optimization",
    "Implement and maintain CI/CD pipelines",
    "Manage and optimize cloud infrastructure",
    "Ensure system reliability and scalability",
    "Troubleshoot and resolve production issues"
  ],
  "benefits": [
    "Health insurance",
    "401(k) matching",
    "Paid time off",
    "Remote work options",
    "Professional development budget",
    "Gym membership reimbursement"
  ],
  "apply_link": "https://example.com/jobs/devops-engineer",
  "posted_at": "2024-12-15T05:10:28.505Z",
  "apply_by": "2025-01-15T00:00:00Z",
  "created_at": "2024-12-15T05:10:28.505Z",
  "updated_at": "2024-12-15T05:10:28.505Z",
  "company": {
    "name": "TechCorp Solutions",
    "logo": "/placeholder.svg",
    "description": "TechCorp Solutions is a leading technology company specializing in cloud-native solutions and DevOps practices."
  }
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log(id);

  // Fetch the job details from API
  const { data: jobDetails, isError, isLoading } = useJobDetailsQuery(id);
  console.log(jobDetails, isError, isLoading, 'details');

  // Fallback job data when API response is missing some fields
  const job = jobDetails?.data ;

  return (
    <section className=''>
      <NavBar />
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
                <img src={job?.company?.logo || '/placeholder.svg'} alt={job?.company?.name || 'Company'} className="h-12 w-12" />
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
                    {job?.responsibilities?.map((resp:any, index:any) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job?.skills?.map((skill:any, index:any) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="font-semibold mb-2">Benefits</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job?.benefits?.map((benefit:any, index:any) => (
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
      </div>
    </section>
  )
}
