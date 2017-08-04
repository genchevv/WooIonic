import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as WC from 'woocommerce-api';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category'

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  homePage: Component;
  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCtrl: NavController;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage
    this.categories = [];

     this.WooCommerce = WC({
      url: "http://localhost/wordpress/",
      consumerKey: "ck_b9ad0d417c5b58f072f206a0a670a65314e4752c",
      consumerSecret: "cs_77b44a62dcf4613b4cea299fbcef7bab83717e59"
    });


    this.WooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body).product_categories);

      let temp: any[] = JSON.parse(data.body).product_categories;

      for( let i = 0; i < temp.length; i ++){
        if(temp[i].parent == 0){

          if(temp[i].slug == "clothing"){
            temp[i].icon = "shirt";
          }
          if(temp[i].slug == "music"){
            temp[i].icon = "musical-notes";
          }
          if(temp[i].slug == "posters"){
            temp[i].icon = "images";
          }

          this.categories.push(temp[i]);
        }
      }

    }, (err)=> {
      console.log(err)
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Menu');
  }

  openCategoryPage(category){

    this.childNavCtrl.setRoot(ProductsByCategoryPage, { "category":  category});

  }

}