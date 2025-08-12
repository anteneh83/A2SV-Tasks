// app/jobs/page.tsx
"use client";

import { useState, useEffect } from "react";
import JobCard from "@/components/JobCard";
import { fetchOpportunities } from "../../lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";
import { useSession } from "next-auth/react";

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
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && !session?.accessToken) {
      router.push("/auth/login");
    } else {
      const loadOpportunities = async () => {
        try {
          const data = await fetchOpportunities();
          setOpportunities(data);
        } catch (err) {
          setError("Failed to load opportunities. Please try again later.");
          router.push("/auth/login");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      loadOpportunities();
    }
  }, [session?.accessToken]);

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
    await signOut({ callbackUrl: "/auth/login" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4 sm:px-6">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Opportunities
              </h1>
              <p className="text-gray-600">
                Showing {sortedJobs.length} results
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="flex items-center w-full sm:w-auto">
                <span className="text-gray-600 mr-2 whitespace-nowrap">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="border border-gray-300 rounded-md px-3 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                >
                  <option value="most-relevant">Most relevant</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors w-full sm:w-auto justify-end sm:justify-start"
                title="Sign out"
              >
                <FiLogOut className="text-lg" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
              <button
                className="text-sm text-gray-400"
                onClick={() => router.push("/dashboard/jobs/bookmarks")}
              >
                Show Bookmarked
              </button>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
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
