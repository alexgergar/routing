export const testData = {
  name: "root node",
  children: [
    {
      name: "child 1",
      children: [
        {
          name: "grandchild 1.1",
        },
        {
          name: "grandchild 1.2",
          children: [
            {
              name: "great grandchild 1.1",
            },
          ],
        },
      ],
    },
    {
      name: "child 2",
      children: [
        {
          name: "grandchild 2.1",
          children: [{ name: "great grandchild 2.1" }],
        },
        {
          name: "grandchild 2.2",
        },
      ],
    },
    {
      name: "child 3",
    },
    {
      name: "child 4",
    },
  ],
};
