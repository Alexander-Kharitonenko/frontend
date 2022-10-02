import { ViewNoteModelDto } from 'projects/business/src/lib/services/communicat/open.api';

export class NoteModel {
  public id?: number;
  public titel?: string;
  public isCmpleted?: boolean;
  public detailse?: string;
  public createDate?: Date;
  public editTame?: Date;
}

export function mapNote(model: ViewNoteModelDto): NoteModel {
  const target = new NoteModel();

  if (model === null || undefined) {
    return target;
  }

  target.id = model.id;
  target.titel = model.titel;
  target.detailse = model.detailse;
  target.isCmpleted = model.isCmpleted;
  if (typeof model.createDate === 'string') {
    target.createDate = new Date(model.createDate);
  } else {
    target.createDate = model.createDate;
  }
  if (typeof model.editTame === 'string') {
    target.editTame = new Date(model.editTame);
  } else {
    target.editTame = model.editTame;
  }

  return target;
}
