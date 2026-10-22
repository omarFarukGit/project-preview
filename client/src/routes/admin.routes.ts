const prefix = "/admin-dashboard";

export const adminRoutes = [
  {
    title: "Admin",
    url: "#",
    items: [
      { title: "Overview", url: `${prefix}` },
      { title: "Profile", url: `${prefix}/profile` },
      { title: "Users", url: `${prefix}/users` },
      { title: "Submissions", url: `${prefix}/submissions` },
      {
        title: "Reviewed Submissions",
        url: `${prefix}/submissions/reviewed`,
      },
    ],
  },
];
