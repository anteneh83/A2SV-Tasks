"use client";

import { useState, useEffect } from "react";
import JobCard from "@/components/JobCard";
import { fetchBookmarks } from "../../../lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";

type SortOption = "most-relevant" | "newest" | "oldest";

export default function BookmarksPage() {
  const [sortBy, setSortBy] = useState<SortOption>("most-relevant");
  const [bookmarkedJobs, setBookmarkedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" && !session?.accessToken) {
      toast.error("Please log in to see your bookmarks.");
      router.push("/auth/login");
    } else {
      const loadBookmarks = async () => {
        try {
          const data = await fetchBookmarks(session?.accessToken);
          setBookmarkedJobs(data);
        } catch (err) {
          toast.error("Failed to load bookmarks. Please try again later.");
          router.push("/auth/login");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      loadBookmarks();
    }
  }, [session, status, router]);

  const sortedJobs = [...bookmarkedJobs].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.dateBookmarked).getTime() -
          new Date(a.dateBookmarked).getTime()
        );
      case "oldest":
        return (
          new Date(a.dateBookmarked).getTime() -
          new Date(b.dateBookmarked).getTime()
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Spinner />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                My Bookmarks
              </h1>
              <p className="text-gray-600">
                Showing {sortedJobs.length} saved{" "}
                {sortedJobs.length === 1 ? "job" : "jobs"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-3 w-full sm:w-auto">
              <div className="flex items-center w-full sm:w-auto">
                <label
                  htmlFor="sortBy"
                  className="text-gray-600 mr-2 whitespace-nowrap"
                >
                  Sort by:
                </label>
                <select
                  id="sortBy"
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
                className="flex items-center justify-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors w-full sm:w-auto py-2 sm:py-0 border border-gray-300 rounded-md"
                title="Sign out"
              >
                <FiLogOut className="text-lg" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>

          {sortedJobs.length === 0 ? (
            <div className="text-center py-12 px-4 sm:px-0">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No bookmarks yet
              </h2>
              <p className="text-gray-500">
                Save interesting jobs by clicking the bookmark icon
              </p>
            </div>
          ) : (
            <div className="space-y-6 px-2 sm:px-0">
              {sortedJobs.map((job) => (
                <JobCard
                  key={job.eventID}
                  id={job.eventID}
                  title={job.title}
                  organization={job.orgName}
                  location={job.location}
                  description={""}
                  tags={[]}
                  workType={job.opType === "inPerson" ? "In Person" : "Remote"}
                  logoUrl={job.logoUrl}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
