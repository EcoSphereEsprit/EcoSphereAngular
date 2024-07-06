import { Pipe, PipeTransform } from '@angular/core';
import { CategoryService } from '../demo/service/category.service';

@Pipe({
    name: 'category'
})
export class CategoryPipe implements PipeTransform {

    constructor(private categoryService: CategoryService) { }

    transform(idCategory: string) {
        if (!idCategory || idCategory == '')
            return null;
        else
            this.categoryService.getCategorieById(idCategory).subscribe((reponse) => {
                if (reponse)
                    return reponse.name
                else
                    return null
            })
        return null
    }

}
