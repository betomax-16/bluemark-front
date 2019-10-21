import { Component, OnInit } from '@angular/core';
import { CouponController } from '../../../controllers/coupon.controller';
import { Coupon } from 'src/app/models/coupon';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  constructor(private couponController: CouponController,
              private notificacionSnackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
  }

  onCodeResult(resultString: string) {
    const coupon: Coupon = new Coupon();
    coupon._id = resultString;
    coupon.status = 'REDEEMED';
    this.couponController.editCoupon(coupon).subscribe(res => {
      if (res.message) {
        this.showMessage(res.message, 3000);
      } else {
        this.showMessage('Cupon redimido', 3000);
      }
      this.router.navigate(['/']);
    });
  }

  showMessage(message: string, duration: number) {
    this.notificacionSnackBar.open( message, '', {
      duration,
    } );
  }
}
