import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashSale } from 'src/app/administration/models/flashSale';
import { FlashSaleService } from 'src/app/administration/services/flash-sale.service';
import { Product } from 'src/app/demo/api/product';

@Component({
    selector: 'app-flash-sale-form',
    templateUrl: './flash-sale-form.component.html',
    styleUrls: ['./flash-sale-form.component.scss']
})
export class FlashSaleFormComponent implements OnInit {

    @Input() display: boolean = false;
    @Input() selectedPorduct: Product | null = null;

    @Output() displayChange = new EventEmitter<boolean>();
    @Output() onFileUpload = new EventEmitter<void>();

    uploadedFile: any;
    flashSaleForm: FormGroup;
    formSubmitted: boolean = false
    today: Date = new Date();
    minDateForFlashSale: Date = new Date();
    flashSale: FlashSale;

    constructor(
        private formBuilder: FormBuilder,
        private flashSaleService: FlashSaleService
    ) { }

    ngOnInit(): void {
        this.minDateForFlashSale.setDate(this.today.getDate() + 7);
        this.buildForm();
    }

    buildForm() {
        this.flashSaleForm = this.formBuilder.group({
            product: [this.selectedPorduct?._id],
            price: [{ value: this.selectedPorduct?.prix, disabled: true }],
            discountPrice: [null, Validators.required],
            startDate: [{ value: new Date(), disabled: true }],
            endDate: [null, Validators.required],
            image: [null]
        })
    }

    visibleChange(event: boolean) {
        this.display = event;
        this.displayChange.emit(event);
    }

    onUpload(event: any) {
        this.onFileUpload.emit();
        for (const file of event.files) {
            this.uploadedFile = file;
        }
    }

    save() {
        this.formSubmitted = true;
        if (this.flashSaleForm.valid) {
            this.flashSaleForm.controls['image'].setValue(this.uploadedFile);
            this.flashSale = this.flashSaleForm.getRawValue();
            this.flashSaleService.addFlashSale(this.flashSale).subscribe({
                next: (response) => {
                    console.log(response);
                    this.visibleChange(false);
                },
                error: (error) => {
                    console.log(error);
                }
            })
        }
    }

}
