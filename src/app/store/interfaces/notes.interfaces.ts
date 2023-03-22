import { NoteDto } from 'src/app/model/note-dto';
import { SaveNoteDto } from 'src/app/model/save-note-dto';

export interface NotesStartAction {
    userId: string
}

export interface NotesSuccessAction {
    notes: NoteDto[]
}

export interface NotesErrorAction {
    message: string;
}

export interface NoteDeleteStartAction {
    noteId: string;
}

export interface NoteDeleteSuccessAction {
    noteId: string;
    message: string;
}

export interface NoteDeleteErrorAction {
    message: string;
}

export interface NoteCreateStartAction {
    userId: string;
    note: SaveNoteDto;
}

export interface NoteUpdateStartAction {
    noteId: string;
    userId: string;
    note: SaveNoteDto;
}

export interface NoteSaveSuccessAction {
    note: NoteDto;
    message: string;
    isEdit: boolean;
}

export interface NoteSaveErrorAction {
    message: string;
}