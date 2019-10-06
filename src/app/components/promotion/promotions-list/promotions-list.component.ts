import { Component, OnInit } from '@angular/core';
import { Promotion } from '../../../models/promotion';
import { PromotionController } from '../../../controllers/promotion.controller';

@Component({
  selector: 'app-promotions-list',
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.css']
})
export class PromotionsListComponent implements OnInit {
  promotions: Promotion[];

  constructor(private promotionController: PromotionController) { }

  ngOnInit() {
    this.promotionController.getMyPromotions().subscribe(promotions => {
      this.promotions = promotions;
    });
  }

  newPromotion() {
    alert('Hola');
  }
}
