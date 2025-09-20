"use client";

import React, { useState, useEffect } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import { FETCH_ALL_PROJECTS } from "@/constants/constants";
import qs from "qs";
import Image from "next/image";
import ProjectCardSkeleton from "../ProjectCard/ProjectCardSkeleton";

export default function HomePage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = qs.stringify({
          populate: ["project_card_cover_image"],
          fields: ["id", "project_title", "project_slug"],
        });
        const data = await fetch(`${FETCH_ALL_PROJECTS}?${query}`);
        const result = await data.json();
        setProjects(result.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="bg-black w-full min-h-screen px-4 py-16 md:px-8">
      <div className="absolute top-5 left-5 w-[100px] h-[100px]">
        <Image
          src="https://res.cloudinary.com/dkhns25jh/image/upload/v1733821293/xr_media/sqmxma6remiuh1mbv4x7.png"
          alt="Xperience Realty Real Estate"
          width={100}
          height={100}
          priority
          unoptimized
          className="w-15 h-10 md:w-22 md:h-15 lg:w-22 lg:h-15 xl:w-22 xl:h-15"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 mb-12 mt-10">
        {/* Heading */}
        <h1 className="text-white  text-3xl md:text-5xl xl:text-6xl font-bold font-playfair">
          Dubai Top Projects
        </h1>
        {/* Description */}
        <p className="text-gray-300 text-lg md:text-xl md:max-w-2xl text-center font-playfair tracking-wider ">
          Explore our exclusive collection of luxury real estate projects in
          Dubai through immersive virtual reality experiences.
        </p>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto ">
        {projects.length > 0 ? (
          projects?.map((project) => (
            <ProjectCard
              key={project?.documentId}
              title={project?.project_title}
              image={project?.project_card_cover_image?.url}
              slug={project?.project_slug}
            />
          ))
        ) : (
          <ProjectCardSkeleton />
        )}
      </div>
    </div>
  );
}
