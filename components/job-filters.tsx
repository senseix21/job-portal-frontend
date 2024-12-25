"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// This is your filters component.
export function JobFilters({
  setFilters, // Pass this function from the parent to set the filters
}: any) {
  const [salaryRange, setSalaryRange] = React.useState([0, 1000000]);
  const [jobType, setJobType] = React.useState<string | null>(null);
  const [workLocation, setWorkLocation] = React.useState<string | null>(null);
  const [datePosted, setDatePosted] = React.useState<string>("anytime");

  React.useEffect(() => {
    // Update the filters whenever they change
    setFilters({
      salaryRange,
      jobType,
      workLocation,
      datePosted,
    });
  }, [salaryRange, jobType, workLocation, datePosted, setFilters]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button className="text-sm text-primary">Clear all</button>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Date Posted</h4>
        <Select value={datePosted} onValueChange={setDatePosted}>
          <SelectTrigger>
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anytime">Anytime</SelectItem>
            <SelectItem value="last_24_hours">Last 24 hours</SelectItem>
            <SelectItem value="last_7_days">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <hr className="my-4" />
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Job Type</h4>
        <div className="flex flex-wrap gap-4">
          {["full-time", "part-time", "contract", "internship", "freelance", "volunteer"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={jobType === type}
                onCheckedChange={() => setJobType(jobType === type ? null : type)}
              />
              <Label htmlFor={type}>{type}</Label>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-4" />

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Salary Range</h4>
        <Slider
          value={salaryRange}
          onValueChange={setSalaryRange}
          min={0}
          max={1000000}
          step={1000}
        />
        <div className="flex items-center justify-between text-sm">
          <span>${salaryRange[0].toLocaleString()}</span>
          <span>${salaryRange[1].toLocaleString()}</span>
        </div>
      </div>

      <hr className="my-4" />

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Work Location</h4>
        <div className="flex flex-wrap gap-4">
          {["on-site", "remote", "hybrid"].map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={location}
                checked={workLocation === location}
                onCheckedChange={() => setWorkLocation(workLocation === location ? null : location)}
              />
              <Label htmlFor={location}>{location}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
