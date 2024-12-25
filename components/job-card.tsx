import { MapPin, Play } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from '@/lib/utils'

interface JobCardProps {
  id: string
  company: string
  logo: string
  position: string
  location: string
  type: string
  urgent?: boolean
  min_salary: number,
  max_salary: number,
    description: string[]
  postedTime: string
}

export function JobCard({
  id,
  company,
  logo,
  position,
  location,
  type,
  urgent,
  min_salary,
  max_salary,
  description,
  postedTime,
}: JobCardProps) {

  postedTime = formatDate(postedTime);
  return (
    <div className="rounded-lg border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={logo} alt={company} />
            <AvatarFallback>{company[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{position}</h3>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{location}</span>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Badge variant="secondary">{type}</Badge>
        {urgent && <Badge variant="destructive">Urgently hiring</Badge>}
        {min_salary && max_salary  && <Badge variant="outline">${min_salary} - ${max_salary}</Badge>}
      </div>
      <ul className="mt-4 space-y-2">
        {description.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Play className="h-4 w-4 shrink-0 rotate-90" />
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Posted {postedTime}</span>
        <Link href={`/jobs/${id}`} passHref>
          <Button variant="outline">View Details</Button>
        </Link>
      </div>
    </div>
  )
}

