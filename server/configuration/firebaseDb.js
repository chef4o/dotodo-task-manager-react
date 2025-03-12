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
      dueDateOnly: "dueDateOnly",
      ownerId: "ownerId",
      trackProgress: "trackProgress",
      archived: "archived",
    },
  },
};
