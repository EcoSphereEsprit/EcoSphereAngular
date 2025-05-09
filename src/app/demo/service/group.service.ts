// src/app/demo/service/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../api/groups';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private baseUrl = 'http://localhost:9080/api/groups';
  constructor(private http: HttpClient) {}



getGroups(): Promise<Group[]> {
  return this.http.get<Group[]>(this.baseUrl)
    .toPromise()
    .then(res => res ?? []);
}
getGroupsForGivenUser(userId : string):Promise<Group[]>{
  console.log('here getGroupsForGivenUser')
  return this.http.get<Group[]>(this.baseUrl+'/'+'by-member'+'/'+userId)
  .toPromise()
  .then(res => res ?? []);
}

  addGroup(groupData: any): Observable<any> {
    return this.http.post(this.baseUrl, groupData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
  }

  addMember(memberData: any, groupId : string): Observable<any> {
    return this.http.post(this.baseUrl+'/'+groupId+'/add-member', memberData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
  }
  
  deleteMember(groupId : string , memberid : string): Observable<any>{
    console.log('here')
    return this.http.delete(this.baseUrl+'/'+groupId+'/'+'remove-member'+'/'+memberid);
  }
  
}
