const prefix = "/mentor-dashboard";
export const mentorRoutes = [
  {
    title: "Mentor",
    url: "#",
    items: [
      { title: "Overview", url: `${prefix}` },
      { title: "Profile", url: `${prefix}/profile` },
      { title: "Submissions", url: `${prefix}/submissions` },
      {
        title: "Reviewed Submissions",
        url: `${prefix}/submissions/reviewed`,
      },
    ],
  },
];
