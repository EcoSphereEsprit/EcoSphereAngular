// notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private stompClient!: Client;
  private notificationsSubject = new BehaviorSubject<any[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private baseUrl = 'http://localhost:8081/api/notifications';

  constructor(private http: HttpClient) {}

  connect(): void {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8081/ws'),
      reconnectDelay: 5000,
      debug: (str) => console.log('[WebSocket Debug]:', str),
      onConnect: () => {
        console.log('✅ Connected to WebSocket');
        this.stompClient.subscribe('/topic/notifications', (message: IMessage) => {
          const notification = JSON.parse(message.body);
          console.log('📩 Received Notification:', notification);
          this.notificationsSubject.next([notification]);
        });
      },
      onStompError: (frame) => {
        console.error('❌ STOMP error:', frame.headers['message']);
        console.error('Details:', frame.body);
      }
    });

    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }

  getAllNotifictions(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createNotification(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, body, this.httpOptions);
  }

  editNotification(body: any, id: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, body, this.httpOptions);
  }

  deleteNotification(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, this.httpOptions);
  }
}
