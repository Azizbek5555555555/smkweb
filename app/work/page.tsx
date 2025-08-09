"use client";
import React from "react";
import "../work.css";
import "../header.css";
import FullpageProviderWork from "@/components/fullpageProviderWork";
import { Cursor } from "@/components/cursor";
import { HeaderNavigation } from "@/components/headerNavigation";
import { WorkSection } from "@/components/workPage/workSection";

const projectsData = [
  {
    title: (
      <>
        Power High <br /> School
      </>
    ),
    description: "Website",
    link: "https://www.powerhighschool.uz/",
    imageLink: "/ph.jpg", 
  },
  {
    title: (
      <>
        Volida <br /> Kids
      </>
    ),
    description: "Website",
    link: "/",
    imageLink: "/volida.jpg",
  },
  {
    title: (
      <>
        Gumstar <br />
      </>
    ),
    description: "Web Application",
    link: "https://gumstar.uz/uz",
    imageLink: "/gumstar.jpg",
  },
  {
    title: (
      <>
        Macsbay <br />
      </>
    ),
    description: "Web Application",
    link: "https://www.macsbay.uz/",
    imageLink: "/macsbay.jpg",
  },

  {
    title: (
      <>
        Silk Road <br /> Horizon
      </>
    ),
    description: "Website",
    link: "https://silkroadhorizons.com/",
    imageLink: "/silkroadhorizon.jpg",
  },
  {
    title: (
      <>
        Micco <br /> 
      </>
    ),
    description: "Website",
    link: "https://www.micco.uz/",
    imageLink: "/micc.jpg",
  },
];
//test
export default function WorkPage() {
  return (
    <>
      <Cursor />
      <HeaderNavigation />
      <FullpageProviderWork>
        <div id="fullpage">
          <div className="background">
          Проекты
            <br />
            Проекты
          </div>

          {projectsData.map((item, index) => (
            <WorkSection
              key={index}
              item={item}
              index={index}
              length={projectsData.length}
              color={index % 2 !== 0 ? "Light" : "Dark"}
            />
          ))}
        </div>
      </FullpageProviderWork>
    </>
  );
}
