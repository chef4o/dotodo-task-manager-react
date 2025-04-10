import * as request from "../api/request";
import * as noteService from "./noteService";
import { ServiceError } from "./serviceErrorMessages";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { url } from "../api/url";
import { computeDueDaysHours, processData } from "../util/dataUtils";

vi.mock("../api/request", () => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  remove: vi.fn(),
}));

vi.mock("../util/dataUtils", () => ({
  computeDueDaysHours: vi.fn((dueDate, dueTime) => "computed"),
  processData: vi.fn(({ data }) => data),
}));

describe("noteService module", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("getAllNotes returns error if no userId provided", async () => {
    const result = await noteService.getAllNotes(null);
    expect(result).toEqual({ error: ServiceError.USER_ID_REQUIRED });
  });

  it("getAllNotes returns response when userId is provided", async () => {
    const userId = "u1";
    const responseData = [{ noteId: "1" }];
    request.get.mockResolvedValue(responseData);
    const result = await noteService.getAllNotes(userId);
    expect(request.get).toHaveBeenCalledWith(`${url.notes}/${userId}`);
    expect(result).toEqual(responseData);
  });

  it("getAllNotesSorted returns empty array when no notes are returned", async () => {
    const userId = "u1";
    request.get.mockResolvedValue([]);
    const result = await noteService.getAllNotesSorted(userId, "title", "asc");
    expect(result).toEqual([]);
  });

  it("getAllNotesSorted processes and sorts notes correctly", async () => {
    const userId = "u1";
    const notes = [{ noteId: "2" }, { noteId: "1" }];
    request.get.mockResolvedValue(notes);
    processData.mockImplementation(({ data, sortKey, sortOrder }) =>
      data.sort((a, b) => a.noteId.localeCompare(b.noteId))
    );
    const result = await noteService.getAllNotesSorted(userId, "noteId", "asc");
    expect(result).toEqual([{ noteId: "1" }, { noteId: "2" }]);
  });

  it("getNoteById returns error when noteId is missing", async () => {
    const result = await noteService.getNoteById(null);
    expect(result).toEqual({ error: ServiceError.ELEMENT_ID_REQUIRED });
  });

  it("getNoteById returns note with sorted comments when noteId is provided", async () => {
    const noteId = "n1";
    const noteResponse = {
      noteId,
      comments: [{ createdAt: "2020" }, { createdAt: "2021" }],
    };
    request.get.mockResolvedValue(noteResponse);
    processData.mockReturnValue([{ createdAt: "2021" }, { createdAt: "2020" }]);
    const result = await noteService.getNoteById(noteId);
    expect(request.get).toHaveBeenCalledWith(`${url.notes}/${noteId}`);
    expect(result.comments).toEqual([{ createdAt: "2021" }, { createdAt: "2020" }]);
  });

  it("addNote returns error when required field (e.g. userId) is missing", async () => {
    const invalidData = { title: "Title", content: "Content" };
    const result = await noteService.addNote(invalidData);
    expect(result).toEqual({ error: ServiceError.MISSING_FIELDS });
  });

  it("addNote calls request.post when required fields are provided", async () => {
    const validData = { ownerId: "u1", title: "Title", content: "Content" };
    const responseData = { success: true };
    request.post.mockResolvedValue(responseData);
    const result = await noteService.addNote(validData);
    expect(request.post).toHaveBeenCalledWith(url.addNote, validData);
    expect(result).toEqual(responseData);
  });

  it("editNote returns error when noteId or updatedData is missing", async () => {
    let result = await noteService.editNote(null, { title: "New Title" });
    expect(result).toEqual({ error: ServiceError.MISSING_FIELDS });
    result = await noteService.editNote("n1", null);
    expect(result).toEqual({ error: ServiceError.MISSING_FIELDS });
  });

  it("editNote calls request.put with correct parameters when valid", async () => {
    const noteId = "n1";
    const updatedData = { title: "New Title" };
    const responseData = { success: true };
    request.put.mockResolvedValue(responseData);
    const result = await noteService.editNote(noteId, updatedData);
    expect(request.put).toHaveBeenCalledWith(`${url.editNote}/${noteId}`, updatedData);
    expect(result).toEqual(responseData);
  });

  it("deleteNote returns error when noteId is missing", async () => {
    const result = await noteService.deleteNote(null);
    expect(result).toEqual({ error: ServiceError.ELEMENT_ID_REQUIRED });
  });

  it("deleteNote calls request.remove when noteId is provided", async () => {
    const noteId = "n1";
    const responseData = { success: true };
    request.remove.mockResolvedValue(responseData);
    const result = await noteService.deleteNote(noteId);
    expect(request.remove).toHaveBeenCalledWith(`${url.deleteNote}/${noteId}`);
    expect(result).toEqual(responseData);
  });

  it("getSomeNotesByDueDateDesc returns empty array when no notes are available", async () => {
    const userId = "u1";
    request.get.mockResolvedValue([]);
    const result = await noteService.getSomeNotesByDueDateDesc(userId, 3);
    expect(result).toEqual([]);
  });

  it("getSomeNotesByDueDateDesc processes, filters, sorts, and limits notes correctly", async () => {
    const userId = "u1";
    const data = [
      { noteId: "1", archived: false, dueDate: "2023-12-31", dueTime: "12:00" },
      { noteId: "2", archived: true, dueDate: "2023-12-30", dueTime: "12:00" },
      { noteId: "3", archived: false, dueDate: "2023-12-29", dueTime: "12:00" },
      { noteId: "4", archived: false, dueDate: "2023-12-28", dueTime: "12:00" },
    ];
    request.get.mockResolvedValue(data);
    processData.mockImplementation(({ data, filterFn, limit }) =>
      data.filter(filterFn).slice(0, limit)
    );
    const result = await noteService.getSomeNotesByDueDateDesc(userId, 2);
    const expected = data.filter((note) => !note.archived).slice(0, 2);
    expect(result).toEqual(expected);
  });
});
