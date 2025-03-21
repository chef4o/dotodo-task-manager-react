export const dbTables = {
  USERS: {
    tableName: "users",
    fields: {
      id: "id",
      username: "username",
      email: "email",
      createdAt: "createdAt",
    },
  },
  NOTES: {
    tableName: "notes",
    fields: {
      id: "id",
      title: "title",
      content: "content",
      startDate: "startDate",
      completedOn: "completedOn",
      dueDate: "dueDate",
      ownerId: "ownerId",
      trackProgress: "trackProgress",
      peers: [],
      archived: "archived",
    },
  },
  CHECKLISTS: {
    tableName: "checklists",
    fields: {
      id: "id",
      title: "title",
      startDate: "startDate",
      completedOn: "completedOn",
      dueDate: "dueDate",
      elements: {
        content: "content",
        status: "status",
      },
      peers: [],
      ownerId: "ownerId",
      archived: "archived",
    },
  },
};
