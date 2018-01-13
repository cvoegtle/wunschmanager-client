import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { WishListService } from "../services/wish-list.service";
import { ActivatedRoute, Router } from "@angular/router";
import { WishList } from "../services/wish-list";
import { UserStatus } from "../services/user.status";

@Component({
  selector: 'shared-view',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class ShareComponent implements OnInit {
  wishLists: WishList[];
  errorMessage: string;

  constructor(private userService: UserService,
              private wishListService: WishListService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.fetchStatus().subscribe(status => this.checkStatus(status),
        error => this.errorMessage = <any>error)
  }

  private checkStatus(userStatus: UserStatus) {
    if (userStatus == null || !userStatus.loggedIn) {
      this.router.navigate(['/login']);
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      this.fetchSharedWishList(id);
    }

  }

  private fetchSharedWishList(id: string) {
    this.wishListService.share(id).subscribe(wishLists => this.wishLists = wishLists,
        error => this.errorMessage = <any>error);
  }
}
