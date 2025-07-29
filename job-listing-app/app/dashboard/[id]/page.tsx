"use client";
import { notFound } from "next/navigation";
import { jobsData } from "../../lib/jobs";
import { FiCalendar, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";

interface PageProps {
  params: { id: string };
}

export default function ApplicantDashboard({ params }: PageProps) {
  const job = jobsData.find((job) => job.id === params.id);

  if (!job) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              {job.title}
            </h1>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column */}
              <div className="md:w-2/3 space-y-8">
                {/* Description */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Description
                  </h2>
                  <p className="text-gray-700">{job.description}</p>
                </div>

                {/* Responsibilities */}
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-800 mb-4">
                    Responsibilities
                  </h2>
                  <ul className="space-y-3 text-gray-700">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal Candidate */}
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-800 mb-3">
                    Ideal Candidate we want
                  </h2>
                  <ul className="space-y-3 text-gray-700">
                    {job.idealCandidate.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaCircle className="text-green-500 mt-1.5 text-[8px] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* When & Where */}
                <div className="p-4 rounded-lg">
                  <h3 className="font-extrabold  text-2xl text-gray-800 mb-3">
                    When & Where
                  </h3>
                  <div className="flex items-start gap-2 text-gray-700">
                    <FiMapPin className="text-blue-500 mt-1 flex-shrink-0" />
                    <p>
                      The onboarding event will take place on{" "}
                      {job.eventDetails.date} at {job.eventDetails.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:w-1/3 space-y-8">
                {/* About */}
                <div className="p-4 rounded-lg">
                  <h2 className="text-2xl font-extrabold text-gray-800 mb-3">
                    About
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-start gap-2">
                      <FiCalendar className="text-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-500">Posted On</p>
                        <p className="font-semibold">{job.about.postedOn}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FiCalendar className="text-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-500">Deadline</p>
                        <p className="font-semibold">{job.about.deadline}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FiMapPin className="text-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-500">Location</p>
                        <p className="font-semibold">{job.about.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FiCalendar className="text-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-500">Start Date</p>
                        <p className="font-semibold">{job.about.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FiCalendar className="text-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-500">End Date</p>
                        <p className="font-semibold">{job.about.endDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                {/* Categories */}
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-800 mb-3">
                    Categories
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.categories.marketing && (
                      <span className="px-3 py-1 bg-purple-100 text-yellow-400 rounded-full">
                        Marketing
                      </span>
                    )}
                    {job.categories.design && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        Design
                      </span>
                    )}
                  </div>
                </div>
                <hr className="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>

                {/* Required Skills */}
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-800 mb-3">
                    Required Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
