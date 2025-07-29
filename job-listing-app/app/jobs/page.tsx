"use client";

import { useState } from "react";
import JobCard from "@/components/JobCard";
import { jobsData } from "../lib/jobs";

type SortOption = "most-relevant" | "newest" | "oldest";

export default function JobsPage() {
  const [sortBy, setSortBy] = useState<SortOption>("most-relevant");

  const sortedJobs = [...jobsData].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return parseInt(b.id) - parseInt(a.id);
      case "oldest":
        return parseInt(a.id) - parseInt(b.id);
      case "most-relevant":
      default:
        return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Opportunities</h1>
            <p className="text-gray-600">Showing {sortedJobs.length} results</p>
          </div>

          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-gray-300 rounded-md px-3 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="most-relevant">Most relevant</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {sortedJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              organization={job.organization}
              location={job.location}
              description={job.description}
              tags={job.tags}
              workType={job.workType}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
