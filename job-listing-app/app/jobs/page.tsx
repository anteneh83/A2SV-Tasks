// app/jobs/page.tsx
"use client";

import { useState, useEffect } from "react";
import JobCard from "@/components/JobCard";
import { fetchOpportunities } from "../lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

type SortOption = "most-relevant" | "newest" | "oldest";

interface Opportunity {
  id: string;
  title: string;
  organization: string;
  location: string[];
  description: string;
  categories: string[];
  opType: string;
  orgName: string;
  datePosted: string;
  logoUrl?: string;
}

export default function JobsPage() {
  const [sortBy, setSortBy] = useState<SortOption>("most-relevant");
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        const data = await fetchOpportunities();
        setOpportunities(data);
      } catch (err) {
        setError("Failed to load opportunities. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOpportunities();
  }, []);

  const sortedJobs = [...opportunities].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
        );
      case "oldest":
        return (
          new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
        );
      case "most-relevant":
      default:
        return a.title.localeCompare(b.title);
    }
  });

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p>Loading opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Opportunities
              </h1>
              <p className="text-gray-600">
                Showing {sortedJobs.length} results
              </p>
            </div>

            <div className="flex items-center space-x-4">
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

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
                title="Sign out"
              >
                <FiLogOut className="text-lg" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {sortedJobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                organization={job.orgName}
                location={job.location.join(", ")}
                description={job.description}
                tags={job.categories}
                workType={job.opType === "inPerson" ? "In Person" : "Remote"}
                logoUrl={job.logoUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
