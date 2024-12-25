"use client";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JobCard } from "@/components/job-card";
import { JobFilters } from "@/components/job-filters";
import { NavBar } from "@/components/nav-bar";
import Hero from "@/components/hero";
import { useListJobsQuery } from "@/redux/api/jobsApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

export default function Page() {
  const [filters, setFilters] = useState({
    salaryRange: "", // Default empty string for salary range
    jobType: "",
    workLocation: "",
    datePosted: "", // Default value for datePosted
  });

  // Build the query parameters conditionally
  const queryParameters = {
    // Only include salaryRange if it's not empty
    salaryRange: filters.salaryRange ? filters.salaryRange : undefined, 

    // Only include jobType if it's not empty
    jobType: filters.jobType || undefined, 

    // Only include workLocation if it's not empty
    workLocation: filters.workLocation || undefined, 

    // Only include datePosted if it's not empty
    datePosted: filters.datePosted || undefined,
  };

  // Use the query with conditional parameters
  const { data, isLoading, isError } = useListJobsQuery(queryParameters);

  // Handle the response
  useEffect(() => {
    if (isError) {
      console.error("Error fetching jobs.");
    }
  }, [isError]);

  const jobs = data?.data || [];

  console.log(jobs)
  console.log(filters)

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <Hero />
      <main className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4 border rounded-lg p-4">
          <JobFilters setFilters={setFilters} />
          </aside>
          <div className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input type="text" placeholder="Search Golang jobs" className="flex-grow" />
              <Input type="text" placeholder="Location" className="flex-grow" />
              <Button className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" />
                Search Jobs
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{`${jobs?.jobs?.length} Golang Jobs Found`}</p>
              <Button variant="outline">Sort by: Newest</Button>
            </div>
            <ScrollArea className="h-screen w-full rounded-md border">
              <div className="space-y-6">
                {jobs.jobs?.length > 0 ? (
                  jobs?.jobs?.map((job: any) => (

                    <>
                      <JobCard
                        key={job.id}
                        id={job.id}
                        company="CloudScale Tech"
                        logo={job.logo || "/placeholder.svg"}
                        position={job.title}
                        location={job.location}
                        type={job.type}
                        urgent={true}
                        min_salary={job.min_salary}
                        max_salary={job.max_salary}
                        description={job.responsibilities}
                        postedTime={job.posted_at}
                      />
                    </>
                  ))
                ) : (
                  <div>No jobs found. Try adjusting your filters.</div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
}