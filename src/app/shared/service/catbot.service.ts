import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { map, retry, catchError, timeout } from 'rxjs/operators';


import { environment } from '../../../environments/environment';

@Injectable({ providedIn: "root" })
export class CatBotService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    // this.currentUserSubject = new BehaviorSubject<any>(
    //   JSON.parse(localStorage.getItem("currentUser"))
    // );
    // this.currentUser = this.currentUserSubject.asObservable();
    // var userId = localStorage.getItem("userId")
    // console.log(userId)
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'user_id': localStorage.getItem("userId"),
      'X-User': localStorage.getItem("name")
    })
  };

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  getQuestionAnswer(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/question-answer',this.httpOptions);
  }

  searchQuestionAnswerByCriteriaPage(req): Observable<any> {
    return this.http.post<any>(environment.api_endpoint + '/cat-bot/question-answer/search/page', JSON.stringify(req),this.httpOptions);
  }

  createLineUserId(req): Observable<any> {
    return this.http.post<any>(environment.api_endpoint + '/cat-bot/create-csv/line-user-id', JSON.stringify(req),this.httpOptions);
  }

  createExcelQuestionAnswer(req): Observable<any> {
    return this.http.post<any>(environment.api_endpoint + '/cat-bot/create-excel/question-answer', JSON.stringify(req),this.httpOptions);
  }

  getIntents(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/intents',this.httpOptions);
  }

  searchIntentsByCriteriaPage(req): Observable<any> {
    return this.http.post<any>(environment.api_endpoint + '/cat-bot/intents/search/page', JSON.stringify(req),this.httpOptions);
  }

  searchIntentsVerifyByCriteriaPage(req): Observable<any> {
    return this.http.post<any>(environment.api_endpoint + '/cat-bot/intents-verify/search/page', JSON.stringify(req),this.httpOptions);
  }

  getIntentsById(id): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/intents/'+id,this.httpOptions);
  }

  addIntents(req): Observable<any> {
    return this.http.post<any>(environment.api_endpoint + '/cat-bot/add/intents', JSON.stringify(req),this.httpOptions);
  }

  putIntents(req): Observable<any> {
    return this.http.put<any>(environment.api_endpoint + '/cat-bot/update/intents', JSON.stringify(req),this.httpOptions);
  }

  putIntentsDetail(req): Observable<any> {
    return this.http.put<any>(environment.api_endpoint + '/cat-bot/update/intents-detail', JSON.stringify(req),this.httpOptions);
  }

  validateUserExpression(req): Observable<any> {
    return this.http.post<any>(environment.api_endpoint + '/cat-bot/validate/user-expression', JSON.stringify(req),this.httpOptions);
  }

  deleteIntents(id): Observable<any> {
    return this.http.delete<any>(environment.api_endpoint + '/cat-bot/delete/intents/'+id,this.httpOptions);
  }

  patchIntents(req): Observable<any> {
    return this.http.patch<any>(environment.api_endpoint + '/cat-bot/patch/intents', JSON.stringify(req),this.httpOptions);
  }

  searchTraining(req): Observable<any> {
    return this.http.post<any>(environment.api_endpoint + '/cat-bot/search/training', JSON.stringify(req),this.httpOptions);
  }

  searchTrainingByCriteriaPage(req): Observable<any> {
    return this.http.post<any>(environment.api_endpoint + '/cat-bot/training/search/page', JSON.stringify(req),this.httpOptions);
  }

  updateTraining(req): Observable<any> {
    return this.http.post<any>(environment.api_endpoint + '/cat-bot/update/training', JSON.stringify(req),this.httpOptions);
  }

  getSystemContent(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/system-content/',this.httpOptions);
  }

  getSystemContentTest(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/system-content-test/',this.httpOptions);
  }

  putSystemContent(req): Observable<any> {
    return this.http.put<any>(environment.api_endpoint + '/cat-bot/update/system-content', JSON.stringify(req),this.httpOptions);
  }

  putSystemContentTest(req): Observable<any> {
    return this.http.put<any>(environment.api_endpoint + '/cat-bot/update/system-content-test', JSON.stringify(req),this.httpOptions);
  }

  getMappingContentIn(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/mapping-content-in/',this.httpOptions);
  }

  putMappingContentIn(req): Observable<any> {
    return this.http.put<any>(environment.api_endpoint + '/cat-bot/update/mapping-content-in', JSON.stringify(req),this.httpOptions);
  }

  getMappingContentOut(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/mapping-content-out/',this.httpOptions);
  }

  putMappingContentOut(req): Observable<any> {
    return this.http.put<any>(environment.api_endpoint + '/cat-bot/update/mapping-content-out', JSON.stringify(req),this.httpOptions);
  }

  getReplaceContentIn(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/replace-content-in/',this.httpOptions);
  }

  updateReplaceContentIn(req): Observable<any> {
    return this.http.put<any>(environment.api_endpoint + '/cat-bot/update/replace-content-in', JSON.stringify(req),this.httpOptions);
  }

  getReplaceContentOut(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/replace-content-out/',this.httpOptions);
  }

  updateReplaceContentOut(req): Observable<any> {
    return this.http.put<any>(environment.api_endpoint + '/cat-bot/update/replace-content-out', JSON.stringify(req),this.httpOptions);
  }

  getReplaceContentOut2(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/replace-content-out2/',this.httpOptions);
  }

  updateReplaceContentOut2(req): Observable<any> {
    return this.http.put<any>(environment.api_endpoint + '/cat-bot/update/replace-content-out2', JSON.stringify(req),this.httpOptions);
  }

  getResponseImage(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/response-image',this.httpOptions);
  }

  updateResponseImage(req): Observable<any> {
    return this.http.put<any>(environment.api_endpoint + '/cat-bot/update/response-image', JSON.stringify(req),this.httpOptions);
  }

  getHandleChatGPT(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/handle-chat-gpt/',this.httpOptions);
  }

  updateHandleChatGPT(req): Observable<any> {
    return this.http.put<any>(environment.api_endpoint + '/cat-bot/update/handle-chat-gpt', JSON.stringify(req),this.httpOptions);
  }

  getEmoji(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/emoji/',this.httpOptions);
  }

  updateEmoji(req): Observable<any> {
    return this.http.put<any>(environment.api_endpoint + '/cat-bot/update/emoji', JSON.stringify(req),this.httpOptions);
  }

  getMasterDataOpenAI(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/master-data-open-ai/',this.httpOptions);
  }

  getMasterDataOpenAITest(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/master-data-open-ai-test/',this.httpOptions);
  }

  getMasterDataTranslate(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/master-data-translate/',this.httpOptions);
  }

  getMasterDataTranslateTest(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/master-data-translate-test/',this.httpOptions);
  }

  patchMasterData(req): Observable<any> {
    return this.http.patch<any>(environment.api_endpoint + '/cat-bot/patch/master-data', JSON.stringify(req),this.httpOptions);
  }

  getPostScript(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/post-script/',this.httpOptions);
  }

  updatePostScript(req): Observable<any> {
    return this.http.put<any>(environment.api_endpoint + '/cat-bot/update/post-script', JSON.stringify(req),this.httpOptions);
  }
  
  uploadTemplateIntents_old(formData: FormData): Observable<any> {
    return this.http.post<any>(environment.api_endpoint + '/cat-bot/upload/template/intents', formData,this.httpOptions);
  }

  uploadTemplateIntents(formData: FormData): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', environment.api_endpoint + '/cat-bot/upload/template/intents', formData, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders({
          'X-User': localStorage.getItem("username")
        })
    });
    return this.http.request(req);
  }

  createTag(req): Observable<any> {
    return this.http.post<any>(environment.api_endpoint + '/cat-bot/create/tag', JSON.stringify(req),this.httpOptions);
  }

  getTag(): Observable<any> {
    return this.http.get<any>(environment.api_endpoint + '/cat-bot/tag',this.httpOptions);
  }

  updateTag(req): Observable<any> {
    return this.http.put<any>(environment.api_endpoint + '/cat-bot/update/tag', JSON.stringify(req),this.httpOptions);
  }

  patchStatusTag(req): Observable<any> {
    return this.http.patch<any>(environment.api_endpoint + '/cat-bot/patch/status/tag', JSON.stringify(req),this.httpOptions);
  }

  deleteTag(id): Observable<any> {
    return this.http.delete<any>(environment.api_endpoint + '/cat-bot/delete/tag/'+id,this.httpOptions);
  }

  searchConsultVeterinarianByCriteriaPage(req): Observable<any> {
    return this.http.post<any>(environment.api_endpoint + '/cat-bot/consult-veterinarian/search/page', JSON.stringify(req),this.httpOptions);
  }

  patchStatusAndBotMode(req): Observable<any> {
    return this.http.patch<any>(environment.api_endpoint + '/cat-bot/consult-veterinarian/patch/status-bot-mode', JSON.stringify(req),this.httpOptions);
  }

  handleError(error) {
    console.log(error);
    let errorMessage = '';
    if(error.error && error.error.data) {
      errorMessage = error.error.data.error_message;
    }
    return throwError(errorMessage);
  }
}
