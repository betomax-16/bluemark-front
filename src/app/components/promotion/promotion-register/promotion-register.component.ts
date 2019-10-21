import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Promotion } from '../../../models/promotion';
import { PromotionController } from '../../../controllers/promotion.controller';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { AuthService } from '../../../services/auth.service';
import { CouponController } from '../../../controllers/coupon.controller';

@Component({
  selector: 'app-promotion-register',
  templateUrl: './promotion-register.component.html',
  styleUrls: ['./promotion-register.component.css']
})
export class PromotionRegisterComponent implements OnInit {

  isUser = false;
  isSearch = false;
  promotion: Promotion;
  date = new FormControl(new Date());
  imageUrl: string|ArrayBuffer = 'https://www.promotienda.es/wp-content/uploads/2015/03/promocion-punto-venta-500x250.jpg';
  @ViewChild('file', {static: false}) myDiv: ElementRef;

  constructor(private promotionController: PromotionController,
              private couponController: CouponController,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private notificacionSnackBar: MatSnackBar) {
                this.promotion = new Promotion();
              }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.isUser = this.authService.getRol() === 'USER';
    }
    if (!(/^\/company\/promotion\/edit\/\S+/.test(this.router.url) || /^\/company\/promotion\/new$/.test(this.router.url))) {
      this.isSearch = true;
    }
    this.route.params.subscribe(params => {
      if (params.id) {
        this.promotionController.getPromotion(params.id).subscribe(prom => {
          this.promotion = prom;
          this.date.setValue(this.promotion.validity);
          this.imageUrl = this.promotion.imagePromotion;
        });
      } else {
        this.promotion = new Promotion();
      }
    });
  }

  save(image) {
    // if (typeof this.imageUrl === 'string') {
    //   this.promotion.imagePromotion = this.imageUrl;
    // }
    this.promotion.validity = this.date.value;

    const file = image.length > 0 ? image[0] : null;
    if (this.promotion._id) {
      this.promotionController.updatePromotion(this.promotion, file).subscribe(prom => {
        this.showMessage('promoción editada', 3000);
        this.router.navigate(['company/promotion']);
      });
    } else {
      this.promotionController.createPromotion(this.promotion, file).subscribe(prom => {
        this.showMessage('promoción creada', 3000);
        this.router.navigate(['company/promotion']);
      });
    }
  }

  openFile() {
    const el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    el.click();
  }

  selectDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.promotion.validity = event.value;
  }

  validateImage(file) {
    const type = file.type;
    const allowedExtensions = /.(gif|jpe?g|png)$/i;
    return allowedExtensions.exec(type);
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert('Only images are supported.');
      return;
    }

    const reader = new FileReader();
    // this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imageUrl = reader.result;
    };
  }

  createCoupon(idPromotion: string) {
    this.couponController.createCoupon(idPromotion).subscribe(coupon => {
      if (coupon.message) {
        this.showMessage(coupon.message, 3000);
      } else {
        this.showMessage('Cupon almacenado exitosamente.', 3000);
      }
    });
  }

  showMessage(message: string, duration: number) {
    this.notificacionSnackBar.open( message, '', {
      duration,
    } );
  }
}
