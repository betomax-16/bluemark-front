import { Component, OnInit } from '@angular/core';
import { CouponController } from '../../../controllers/coupon.controller';
import { Coupon } from 'src/app/models/coupon';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit {
  coupons: Coupon[];
  constructor(private couponController: CouponController,
              private notificacionSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.couponController.getMyCoupons().subscribe(coupons => {
      this.coupons = coupons;
    });
  }

  deleteCoupon(coupon: Coupon) {
    if (confirm('¿Desea eliminar el cupon?')) {
      this.couponController.deleteCoupon(coupon).subscribe(res => {
        for (let index = 0; index < this.coupons.length; index++) {
          if (this.coupons[index]._id === coupon._id) {
            this.coupons.splice(index, 1);
          }
        }
        this.showMessage('Cupon eliminado', 3000);
      });
    }
  }

  showMessage(message: string, duration: number) {
    this.notificacionSnackBar.open( message, '', {
      duration,
    } );
  }
}
