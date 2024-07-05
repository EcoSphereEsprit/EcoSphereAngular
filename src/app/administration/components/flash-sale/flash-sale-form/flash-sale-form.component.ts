import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-flash-sale-form',
    templateUrl: './flash-sale-form.component.html',
    styleUrls: ['./flash-sale-form.component.scss']
})
export class FlashSaleFormComponent implements OnInit {

    @Input() display: boolean = false;

    @Output() displayChange = new EventEmitter<boolean>();
    @Output() onFileUpload = new EventEmitter<void>();

    quantities: number[] = [1, 1, 1];

    value: string = '';

    checked: boolean = true;

    checked2: boolean = true;

    uploadedFiles: any[] = [];

    cities = [
        { name: 'USA / New York', code: 'NY' },
        { name: 'Italy / Rome', code: 'RM' },
        { name: 'United Kingdoom / London', code: 'LDN' },
        { name: 'Turkey / Istanbul', code: 'IST' },
        { name: 'France / Paris', code: 'PRS' }
    ];

    selectedCity: string = '';

    constructor() { }

    ngOnInit(): void {
    }

    visibleChange(event: boolean) {
        this.display = event;
        this.displayChange.emit(event);
    }

    onUpload(event: any) {
        // TODO Call upload & affect Image to product service
        this.onFileUpload.emit();
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.visibleChange(false);
    }

}
