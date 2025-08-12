"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiBookmark } from "react-icons/fi";
import { createBookmark, deleteBookmark, fetchBookmarks } from "../app/lib/api";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface JobCardProps {
  id: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  tags: string[];
  workType: string;
  logoUrl?: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  organization,
  location,
  description,
  tags,
  workType,
  logoUrl,
}) => {
  const { data: session, status } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkError, setBookmarkError] = useState<string | null>(null);
  const router = useRouter();
  // console.log(session, "session");

  useEffect(() => {
    if (status === "unauthenticated" && session?.accessToken) {
      router.push("/auth/login");
    } else if (status === "authenticated" && session?.accessToken) {
      const checkBookmarkStatus = async () => {
        if (status === "authenticated") {
          try {
            setIsLoading(true);
            const bookmarks = await fetchBookmarks(session?.accessToken);
            // console.log(bookmarks, "bookmarks");
            const isBooked = bookmarks?.some(
              (bookmark: any) => bookmark.eventID === id
            );
            setIsBookmarked(isBooked);
            // console.log(isBooked, "booked bookmarks");

            setBookmarkError(null);
          } catch (error: any) {
            console.error("Error checking bookmark status:", error);
            setBookmarkError(
              error.message || "Failed to check bookmark status"
            );
          } finally {
            setIsLoading(false);
          }
        }
      };

      checkBookmarkStatus();
    }
  }, [id, status, session?.accessToken]);

  const handleBookmarkToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (status !== "authenticated") {
      toast.error("Please login to bookmark jobs");
      router.push("/auth/login");
    }

    setIsLoading(true);
    setBookmarkError(null);

    try {
      if (isBookmarked) {
        const response = await deleteBookmark(id, session?.accessToken);
        if (response.success) {
          setIsBookmarked(false);
          toast.success(`${response.message}`);
        }
      } else {
        const response = await createBookmark(id, session?.accessToken);
        // console.log(response, "created bookmark");
        if (response.success) {
          setIsBookmarked(true);
          toast.success(`${response.message}`);
        }
      }
    } catch (error: any) {
      console.error("Bookmark error:", error);
      setBookmarkError(error.message || "Failed to update bookmark");
      toast.error(error.message || "Failed to update bookmark");

      // Re-fetch bookmark status after error
      try {
        const bookmarks = await fetchBookmarks(session?.accessToken);
        const isBooked = bookmarks.some(
          (bookmark: any) => bookmark.eventID === id
        );
        setIsBookmarked(isBooked);
      } catch (fetchError) {
        console.error("Error re-fetching bookmark status:", fetchError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link href={`/dashboard/${id}`} className="block relative group">
      <div className="rounded-3xl overflow-hidden shadow-lg bg-white p-4 sm:p-6 mb-4 sm:mb-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        {/* Bookmark button with improved loading state */}
        <button
          onClick={handleBookmarkToggle}
          disabled={isLoading}
          className={`absolute top-3 sm:top-4 right-3 sm:right-4 p-1 sm:p-2 rounded-full transition-colors ${
            isLoading
              ? "text-gray-400 cursor-not-allowed"
              : isBookmarked
              ? "text-yellow-500 hover:text-yellow-600"
              : "text-gray-400 hover:text-gray-500"
          }`}
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          aria-busy={isLoading}
        >
          <FiBookmark
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
              isBookmarked ? "fill-current" : ""
            } ${isLoading ? "animate-pulse" : ""}`}
          />
        </button>

        {/* Error message (optional) */}
        {bookmarkError && (
          <div className="absolute top-10 sm:top-12 right-3 sm:right-4 text-xs text-red-500">
            {bookmarkError}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <div className="flex-shrink-0">
            {logoUrl ? (
              <div className="w-10 h-10 sm:w-12 sm:h-12 relative rounded-full overflow-hidden">
                <Image
                  src={logoUrl}
                  alt={`${organization} logo`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-sm sm:text-lg font-bold">
                  {organization.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {organization} • {location}
            </p>
            <p className="text-gray-700 mt-1 sm:mt-2 text-sm sm:text-base line-clamp-2">
              {description}
            </p>
            <div className="mt-3 sm:mt-4">
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                <span
                  className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm ${
                    workType === "In Person"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {workType}
                </span>
                <span className="hidden sm:inline">|</span>
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm ${
                      tag.includes("Education")
                        ? "border border-yellow-400 bg-yellow-50 text-yellow-500"
                        : tag.includes("IT") || tag.includes("Technology")
                        ? "border border-blue-400 bg-blue-50 text-blue-800"
                        : "border border-gray-300 bg-gray-50 text-gray-700"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
