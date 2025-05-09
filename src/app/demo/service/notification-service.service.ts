import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private ws: WebSocket | null = null;
  private notificationsSubject = new BehaviorSubject<any[]>([]);
  notifications$ = this.notificationsSubject.asObservable();
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private baseUrl = 'http://localhost:8081/api/notifications';
  constructor(private http: HttpClient) {}

  // Connect to WebSocket directly
  // connect() {
  //   this.ws = new WebSocket('ws://localhost:9092/ws-notifications');  // WebSocket URL

  //   this.ws.onopen = () => {
  //     console.log('WebSocket connected');
  //     // Optionally send a message when the connection opens
  //     this.ws?.send(JSON.stringify({ message: 'Client connected' }));
  //   };

  //   // Handling incoming messages
  //   this.ws.onmessage = (event: MessageEvent) => {
  //     console.log('Received message: ', event.data);
  //     try {
  //       const data = JSON.parse(event.data); // Assuming the message is in JSON format
  //       this.notificationsSubject.next(data); // Emit the new message to subscribers
  //     } catch (error) {
  //       console.error('Error parsing message: ', error);
  //     }
  //   };

  //   // Handle WebSocket errors
  //   this.ws.onerror = (error) => {
  //     console.error('WebSocket error: ', error);
  //   };

  //   // Handle WebSocket close events
  //   this.ws.onclose = (event: CloseEvent) => {
  //     console.log('WebSocket closed', event);
  //     // You can add reconnect logic here if needed
  //   };
  // }

  // // Disconnect WebSocket
  // disconnect() {
  //   if (this.ws) {
  //     this.ws.close();  // Close the WebSocket connection
  //     console.log('Disconnected from WebSocket');
  //   }
  // }

  getAllNotifictions(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  

  createNotification(body: any ): Observable<any> {
    return this.http.post<any>(
      this.baseUrl ,
      body,
      this.httpOptions
    );
  }
    editNotification(body: any , id : string): Observable<any> {
      return this.http.put<any>(
        this.baseUrl + '/' + id,
        body,
        this.httpOptions
      );
    }
  
    deleteNotification( id : string){

      return this.http.delete<any>(
        this.baseUrl + '/' + id,
      this.httpOptions
      );
    }

}
