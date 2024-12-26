import { NavBar } from "@/components/nav-bar";
import JobDetails from "@/components/jobDetails";

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

const JobDetailsPage = async ({ params }: JobDetailsPageProps) => {
  // Await the params promise to get the id
  const { id } = await params;

  return (
    <section>
      <NavBar />
      <JobDetails id={id} />
    </section>
  );
};

export default JobDetailsPage;
