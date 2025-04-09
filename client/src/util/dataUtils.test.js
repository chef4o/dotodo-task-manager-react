import * as dataUtils from "./dataUtils";

// Tests for processData

describe("processData", () => {
  const sampleData = [
    { id: 3, title: "C Note", date: "2024-04-01" },
    { id: 1, title: "A Note", date: "2024-02-15" },
    { id: 2, title: "B Note", date: "2024-03-10" },
    { id: 4, title: null, date: null },
  ];

  test("returns same data when no options provided", () => {
    const result = dataUtils.processData({ data: sampleData });
    expect(result).toEqual(sampleData);
  });

  test("applies filterFn correctly", () => {
    const result = dataUtils.processData({
      data: sampleData,
      filterFn: (item) => item.title && item.title.startsWith("A"),
    });
    expect(result).toEqual([{ id: 1, title: "A Note", date: "2024-02-15" }]);
  });

  test("sorts numeric keys in ascending order", () => {
    const data = [{ id: 3 }, { id: 1 }, { id: 2 }];
    const result = dataUtils.processData({
      data,
      sortKey: "id",
    });
    expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  test("sorts numeric keys in descending order", () => {
    const data = [{ id: 3 }, { id: 1 }, { id: 2 }];
    const result = dataUtils.processData({
      data,
      sortKey: "id",
      sortOrder: "desc",
    });
    expect(result).toEqual([{ id: 3 }, { id: 2 }, { id: 1 }]);
  });

  test("sorts string keys alphabetically", () => {
    const data = [{ title: "C Note" }, { title: "A Note" }, { title: "B Note" }];
    const result = dataUtils.processData({
      data,
      sortKey: "title",
    });
    expect(result).toEqual([{ title: "A Note" }, { title: "B Note" }, { title: "C Note" }]);
  });

  test("sorts string keys alphabetically in descending order", () => {
    const data = [{ title: "C Note" }, { title: "A Note" }, { title: "B Note" }];
    const result = dataUtils.processData({
      data,
      sortKey: "title",
      sortOrder: "desc",
    });
    expect(result).toEqual([{ title: "C Note" }, { title: "B Note" }, { title: "A Note" }]);
  });

  test("limits the result after processing", () => {
    const result = dataUtils.processData({
      data: sampleData,
      limit: 2,
    });
    expect(result).toEqual(sampleData.slice(0, 2));
  });
});

// Tests for computeDueDaysHours

describe("computeDueDaysHours", () => {
  // Set time to 1 Jan 2024 at 00:00
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T00:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("returns null when dueDate is not provided", () => {
    expect(dataUtils.computeDueDaysHours(null)).toBeNull();
  });

  test("returns expired when due date is in the past", () => {
    const result = dataUtils.computeDueDaysHours("2022-12-31", "11:00:00");
    expect(result).toEqual({ days: 0, hours: 0, expired: true });
  });

  test("computes correct days and hours remaining when date and time are provided", () => {
    // Set due date/time 2 days and 5 hours later (3 Jan 2024 at 05:00)
    const result = dataUtils.computeDueDaysHours("2024-01-03", "05:00:00");
    expect(result).toEqual({ days: 2, hours: 5, expired: false });
  });

  test("handles dueDate without dueTime", () => {
    const result = dataUtils.computeDueDaysHours("2024-01-01");
    expect(result).toEqual({ days: 0, hours: 0, expired: false });
  });
});

// Tests for formatToDateTime

describe("formatToDateTime", () => {
  test("formats date-time as 'dd MMM yyyy HH:mm'", () => {
    const testDateTime = new Date(2025, 0, 30, 23, 0, 0, 0);
    const expectedDateTime = "30 Jan 2025 23:00";
    const result = dataUtils.formatToDateTime(testDateTime);
    expect(result).toBe(expectedDateTime);
  });
});
