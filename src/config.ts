import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://raskour.com/",
  author: "Rasmeet Kour",
  desc: "My personal blog to share articles about React, JavaScript, Accessibility, tips and web fundamentals.",
  title: "RKour",
  ogImage: "", // TODO: fix og Image
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/Raskour",
    linkTitle: `Github Profile`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ras-kour/",
    linkTitle: `LinkedIn Profile`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:rasmeetkour735@gmail.com",
    linkTitle: `Send an email to rasmeetkour735@gmail.com}`,
    active: true,
  },
  {
    name: "CodePen",
    href: "https://codesandbox.io/u/raskour",
    linkTitle: `${SITE.title} on CodePen`,
    active: true,
  },
];
