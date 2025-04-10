import { describe, it, expect, vi, beforeEach } from "vitest";
import * as checklistService from "./checklistService";
import { ServiceError } from "./serviceErrorMessages";
import { url } from "../api/url";
import * as request from "../api/request";
import { processData } from "../util/dataUtils";

vi.mock("../api/request", () => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  remove: vi.fn(),
}));
vi.mock("../util/dataUtils", () => ({
  processData: vi.fn(({ data }) => data),
}));

describe("checklistService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  
  afterEach(() => {
    console.error.mockRestore();
  });
  

  describe("getAllChecklists", () => {
    it("returns error if no userId provided", async () => {
      const result = await checklistService.getAllChecklists(null);
      expect(result).toEqual({ error: ServiceError.USER_ID_REQUIRED });
    });

    it("returns response when userId is provided", async () => {
      const userId = "u1";
      const responseData = [{ checklistId: "1" }];
      request.get.mockResolvedValue(responseData);
      const result = await checklistService.getAllChecklists(userId);
      expect(request.get).toHaveBeenCalledWith(`${url.checklists}/${userId}`);
      expect(result).toEqual(responseData);
    });
  });

  describe("getAllChecklistsSorted", () => {
    it("returns empty array when checklists are empty", async () => {
      const userId = "u1";
      request.get.mockResolvedValue([]);
      const result = await checklistService.getAllChecklistsSorted(userId, "title", "asc");
      expect(result).toEqual([]);
    });

    it("returns sorted checklists", async () => {
      const userId = "u1";
      const checklists = [{ checklistId: "2" }, { checklistId: "1" }];
      request.get.mockResolvedValue(checklists);
      processData.mockImplementation(({ data, sortKey, sortOrder }) =>
        data.sort((a, b) => a.checklistId.localeCompare(b.checklistId))
      );
      const result = await checklistService.getAllChecklistsSorted(userId, "checklistId", "asc");
      expect(result).toEqual([{ checklistId: "1" }, { checklistId: "2" }]);
    });
  });

  describe("getChecklistById", () => {
    it("returns error when checklistId is missing", async () => {
      const result = await checklistService.getChecklistById(null);
      expect(result).toEqual({ error: ServiceError.ELEMENT_ID_REQUIRED });
    });

    it("returns checklist when checklistId is provided", async () => {
      const checklistId = "c1";
      const checklistResponse = { checklistId, title: "Test Checklist" };
      request.get.mockResolvedValue(checklistResponse);
      const result = await checklistService.getChecklistById(checklistId);
      expect(request.get).toHaveBeenCalledWith(`${url.checklists}/${checklistId}`);
      expect(result).toEqual(checklistResponse);
    });
  });

  describe("addChecklist", () => {
    it("returns error when required fields are missing", async () => {
      const invalidData = { title: "Title", elements: [] }; // missing ownerId
      const result = await checklistService.addChecklist(invalidData);
      expect(result).toEqual({ error: ServiceError.MISSING_FIELDS });
    });

    it("calls request.post when required fields are provided", async () => {
      const validData = { ownerId: "u1", title: "Title", elements: ["item"] };
      const responseData = { success: true };
      request.post.mockResolvedValue(responseData);
      const result = await checklistService.addChecklist(validData);
      expect(request.post).toHaveBeenCalledWith(url.addChecklist, validData);
      expect(result).toEqual(responseData);
    });
  });

  describe("editChecklist", () => {
    it("returns error when checklistId or updatedData is missing", async () => {
      let result = await checklistService.editChecklist(null, { title: "New Title" });
      expect(result).toEqual({ error: ServiceError.ELEMENT_UPDATE_DATA_REQUIRED });
      result = await checklistService.editChecklist("c1", null);
      expect(result).toEqual({ error: ServiceError.ELEMENT_UPDATE_DATA_REQUIRED });
    });

    it("calls request.put with correct parameters when valid", async () => {
      const checklistId = "c1";
      const updatedData = { title: "New Title" };
      const responseData = { success: true };
      request.put.mockResolvedValue(responseData);
      const result = await checklistService.editChecklist(checklistId, updatedData);
      expect(request.put).toHaveBeenCalledWith(`${url.editChecklist}/${checklistId}`, updatedData);
      expect(result).toEqual(responseData);
    });
  });

  describe("deleteChecklist", () => {
    it("returns error when checklistId is missing", async () => {
      const result = await checklistService.deleteChecklist(null);
      expect(result).toEqual({ error: ServiceError.ELEMENT_ID_REQUIRED });
    });

    it("calls request.remove when checklistId is provided", async () => {
      const checklistId = "c1";
      const responseData = { success: true };
      request.remove.mockResolvedValue(responseData);
      const result = await checklistService.deleteChecklist(checklistId);
      expect(request.remove).toHaveBeenCalledWith(`${url.deleteChecklist}/${checklistId}`);
      expect(result).toEqual(responseData);
    });
  });

  describe("getSomeChecklistsByDueDateDesc", () => {
    it("processes, filters, sorts, and limits checklists correctly", async () => {
      const userId = "u1";
      const data = [
        { checklistId: "1", archived: false, dueDate: "2023-12-31" },
        { checklistId: "2", archived: true, dueDate: "2023-12-30" },
        { checklistId: "3", archived: false, dueDate: "2023-12-29" },
        { checklistId: "4", archived: false, dueDate: "2023-12-28" },
      ];
      request.get.mockResolvedValue(data);
      processData.mockImplementation(({ data, filterFn, limit }) =>
        data.filter(filterFn).slice(0, limit)
      );
      const result = await checklistService.getSomeChecklistsByDueDateDesc(userId, 2);
      const expected = data.filter((cl) => !cl.archived).slice(0, 2);
      expect(result).toEqual(expected);
    });
  });
});
