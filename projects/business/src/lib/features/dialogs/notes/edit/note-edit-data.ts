export class NoteEditData {
  id: number;
  title: string;
  details: string;
  userId: number;
  isCompleted: boolean;
  createDate: Date;

  constructor(
    id: number,
    title: string,
    details: string,
    userId: number,
    isCompleted: boolean,
    createDate: Date
  ) {
    this.id = id;
    this.title = title;
    this.details = details;
    this.userId = userId;
    this.isCompleted = isCompleted;
    this.createDate = createDate;
  }
}
