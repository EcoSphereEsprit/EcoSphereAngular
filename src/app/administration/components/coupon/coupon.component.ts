import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { CouponService } from '../../services/coupon.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-coupon',
    templateUrl: './coupon.component.html',
    styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {

    couponCode: string = '';
    userMail: string;

    constructor(
        private couponService: CouponService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
    }

    generateCoupon() {
        this.couponCode = uuidv4();
    }

    sendCouponToUser() {
        if (this.couponCode && this.userMail) {
            this.couponService.sendCouponToUser(this.couponCode, this.userMail).subscribe({
                next: (response) => {
                    console.log(response);
                    if (response === 200)
                        this.messageService.add({ key: 'mainMsgs', severity: 'info', summary: 'Success', detail: 'Coupon sent successfully' });
                },
                error: (error) => {
                    console.log(error);
                }
            })
        }
    }
}
