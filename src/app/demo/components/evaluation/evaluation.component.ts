import { Component } from '@angular/core';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Evaluation } from '../../module/feedback';
import { FeedbackService } from '../../service/feedback.service';
import { Critere } from '../../module/critere';

interface EvaluationWithEdit extends Evaluation {
  isEditing?: boolean;
}
@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})


export class EvaluationComponent {
  products: Product[] = [];
  evaluations: EvaluationWithEdit[] = [];
  displayModal: boolean = false;
  displayAddModal: boolean = false;

  selectedProductId: number = 0;

  newEvaluation: Evaluation = {
    description: '',
    note: 0,
    critere: Critere.INNOVATION,
    projet: 0,
    user: 1
  };

  criteres: { label: string; value: Critere }[] = [];

  constructor(private productService: ProductService, private evaluationService: FeedbackService) {}

  ngOnInit() {
    this.productService.getProducts().then(data => this.products = data);
    this.criteres = Object.keys(Critere)
      .filter(k => isNaN(Number(k)))
      .map(k => ({ label: this.formatLabel(k), value: Critere[k as keyof typeof Critere] }));
  }

  formatLabel(c: string): string {
    return c.toLowerCase().split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  }

  showDialog(productId: number): void {

    this.selectedProductId = productId;
    this.displayModal = true;
    this.loadEvaluations(productId);
  }



  loadEvaluations(productId: number): void {
   console.log(productId)
    this.evaluationService.getAll(productId).subscribe({
      next: (data) => {
        this.evaluations = data
          .map(e => ({ ...e, isEditing: false }));
      },
      error: (err) => console.error('Erreur de chargement', err)
    });
    console.log('hello'+productId)
    console.log('hello'+this.evaluations)
  }

  openAddDialog(productId: number): void {
    console.log('hello Helloooo')

    this.selectedProductId = productId;
    this.newEvaluation = {
      description: '',
      note: 0,
      critere: Critere.INNOVATION,
      projet: productId,
      user: 1
    };
    this.displayAddModal = true;
  }

  saveEvaluation(): void {
    this.evaluationService.create(this.newEvaluation).subscribe(() => {
      this.displayAddModal = false;
      this.loadEvaluations(this.selectedProductId);
    });
  }

  onSaveInline(evale: EvaluationWithEdit): void {
    console.log ('hello '+evale)
    this.evaluationService.create(evale).subscribe({
      next: () => evale.isEditing = false,
      error: () => console.error('Erreur lors de la mise à jour')
    });
  }

  onDelete(evale: Evaluation): void {
    if (confirm('Voulez-vous vraiment supprimer cette évaluation ?')) {
      this.evaluationService.delete(evale.id!).subscribe({
        next: () => this.evaluations = this.evaluations.filter(e => e.id !== evale.id),
        error: () => console.error('Erreur lors de la suppression')
      });
    }
  }


  getCritereLabel(value: Critere | string): string {
    // Handle both string and number values
    const numericValue = typeof value === 'string' 
      ? Critere[value as keyof typeof Critere] 
      : value;
    
    const entry = this.criteres.find(c => c.value === numericValue);
    return entry ? entry.label : 'Inconnu';
  }
}
