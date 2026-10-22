const prefix = "/student-dashboard";

export const studentRoutes = [
  {
    title: "Student",
    url: "#",
    items: [
      { title: "Overview", url: `${prefix}` },
      { title: "Profile", url: `${prefix}/profile` },
      { title: "My Submissions", url: `${prefix}/submissions` },
      { title: "Submit Project", url: `${prefix}/submissions/create` },
    ],
  },
];
