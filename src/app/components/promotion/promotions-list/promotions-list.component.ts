import { Component, OnInit } from '@angular/core';
import { Promotion } from '../../../models/promotion';
import { PromotionController } from '../../../controllers/promotion.controller';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-promotions-list',
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.css']
})
export class PromotionsListComponent implements OnInit {
  isSearch = false;
  promotions: Promotion[] = [];

  constructor(private promotionController: PromotionController,
              private router: Router,
              private route: ActivatedRoute,
              private notificacionSnackBar: MatSnackBar) { }

  ngOnInit() {
    if (/^\/company\/\S+\/promotion$/.test(this.router.url) || /^\/company\/promotion$/.test(this.router.url)) {
      this.route.params.subscribe(
        params => {
          if (params.id) {
            this.promotionController.getPromotionsByCompany(params.id).subscribe(promotion => {
              this.promotions = promotion;
            });
          } else {
            this.promotionController.getMyPromotions().subscribe(promotions => {
              this.promotions = promotions;
            });
          }
        });
    } else {
      this.isSearch = true;
      this.route.queryParams.subscribe(params => {
        const text: string = params.text ? params.text : '';
        this.promotionController.search(text).subscribe(promotions => {
          console.log(promotions);
          this.promotions = promotions;
        });
      });
    }
  }

  newPromotion() {
    this.router.navigate(['company/promotion/new']);
  }

  editPromotion(promotion: Promotion) {
    this.router.navigate(['company/promotion/edit/' + promotion._id]);
  }

  deletePromotion(promotion: Promotion) {
    if (confirm('¿Esta seguro de eliminar la promoción ' + promotion.namePromotion)) {
      this.promotionController.deletePromotion(promotion).subscribe(prom => {
        for (let index = 0; index < this.promotions.length; index++) {
          if (this.promotions[index]._id === promotion._id) {
            this.promotions.splice(index, 1);
          }
        }
        this.showMessage('promoción eliminada', 3000);
      });
    }
  }

  showPromotion(promotion: Promotion) {
    this.router.navigate(['promotion/' + promotion._id]);
  }

  showMessage(message: string, duration: number) {
    this.notificacionSnackBar.open( message, '', {
      duration,
    } );
  }
}
