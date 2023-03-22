import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteDto } from '../model/note-dto';
import { SaveNoteDto } from '../model/save-note-dto';
import { ResponseDto } from '../model/response-dto';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  basePath = "http://localhost:4000/note";

  constructor(
    private http: HttpClient
  ) { }

  public getAllByUser( userId: string ): Observable<NoteDto[]>{
    return this.http.get<NoteDto[]>(`${this.basePath}/${userId}`);
  }

  public create( userId: string, dto: SaveNoteDto ): Observable<NoteDto>{
    return this.http.post<NoteDto>(`${this.basePath}/${userId}`, dto);
  }

  public update( noteId: string, userId: string, dto: SaveNoteDto ): Observable<NoteDto>{
    return this.http.put<NoteDto>(`${this.basePath}/${noteId}/user/${userId}`, dto);
  }

  public delete( noteId: string ): Observable<ResponseDto<null>>{
    return this.http.delete<ResponseDto<null>>(`${this.basePath}/${noteId}`);
  }
}
