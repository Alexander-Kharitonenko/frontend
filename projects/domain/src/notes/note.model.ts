import { ViewNoteModelDto } from 'projects/business/src/lib/services/communicat/open.api';

export class NoteModel {
  public id!: number;
  public userId: number;
  public title!: string;
  public isCompleted!: boolean;
  public details!: string;
  public createDate!: Date;
  public editTame!: Date;
}

export function mapNote(model: ViewNoteModelDto): NoteModel {
  const target = new NoteModel();

  if (model === null || undefined) {
    return target;
  }

  target.id = model.id!;
  target.userId = model.userId!;
  target.title = model.title!;
  target.details = model.details!;
  target.isCompleted = model.isCompleted!;
  if (typeof model.createDate === 'string') {
    target.createDate = new Date(model.createDate);
  } else {
    target.createDate = model.createDate!;
  }
  if (typeof model.editTame === 'string') {
    target.editTame = new Date(model.editTame);
  } else {
    target.editTame = model.editTame!;
  }

  return target;
}
