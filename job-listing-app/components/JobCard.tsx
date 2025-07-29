import Link from "next/link";
import React from "react";

interface JobCardProps {
  id: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  tags: string[];
  workType: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  organization,
  location,
  description,
  tags,
  workType,
}) => {
  return (
    <Link href={`/dashboard/${id}`} className="block">
      <div className="rounded-3xl overflow-hidden shadow-lg bg-white p-6 mb-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 text-lg font-bold">
                {organization.charAt(0)}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-600">
              {organization} • {location}
            </p>
            <p className="text-gray-700 mt-2 line-clamp-2">{description}</p>
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {workType}
                </span>
                |
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      tag === "Education"
                        ? "border border-yellow-400 bg-yellow-50 text-yellow-500"
                        : tag === "IT"
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
