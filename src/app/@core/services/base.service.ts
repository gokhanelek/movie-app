import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpClientService {
  protected router: Router;

  constructor(
    public http: HttpClient,
  ) {
  }

  createAuthorizationHeader(headers: HttpHeaders): HttpHeaders {

    // headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', '*/*');
    return headers;
  }

  public get<T>(url: string, isDocument?: boolean): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    if (isDocument) {
      return this.http
        .get(url, { headers: headers, responseType: 'blob' })
        .pipe(catchError(this.handleError));
    }

    return this.http
      .get<T>(url, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  public post<T>(url: string, data: string = null, isEncoded: boolean = false): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    if (isEncoded) {
      headers = headers.append('Accept-Encoding', 'gzip, deflate, br');
    }
    return this.http
      .post<T>(url, data, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  public handleError(response: any) {
    const errorBody = response.error;
    return observableThrowError(errorBody);
  }
}


@Injectable()
export class DataService {
  protected BASE_API_URL = environment.api_base_url;
  protected client: HttpClientService;
  // private apikey: string = environment.apiKey;
  constructor(client: HttpClientService) {
    this.client = client;
  }
  public createUrlWithParams(urlPath: string, json: Object = null): string {
    // json['apikey'] = this.apikey;

    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        urlPath = urlPath.replace(
          `{${key}}`,
          json[key] == null ? '' : json[key],
        );
      }
    }

    return this.BASE_API_URL + urlPath;
  }
}


@Injectable()
export class BaseService<TRequest, TResponse> extends DataService {
  constructor(
    client: HttpClientService,
    @Inject('BASE_ENDPOINT') public endPoint: string,
  ) {
    super(client);
  }
}


