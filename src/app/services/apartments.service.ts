import { Injectable } from '@angular/core';

export interface Apartment {
  id: string;
  name: string;
  subtitle: string;
  guests: string;
  description: string;
  amenities: string[];
  images: string[];
}

@Injectable({ providedIn: 'root' })
export class ApartmentsService {
  readonly apartments: Apartment[] = [
    {
      id: 's-apartment',
      name: 'apt.s-apartment.name',
      subtitle: 'apt.view.lakeside',
      guests: '2',
      description: 'apt.s-apartment.desc',
      amenities: ['amenity.ac', 'amenity.kitchenette', 'amenity.balcony', 'amenity.bathroom', 'amenity.wifi', 'amenity.parking', 'amenity.pool', 'amenity.tv'],
      images: ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg'].map(f => `assets/Apartmani Sliki/S Apartman LakeSide View/${f}`)
    },
    {
      id: 'm-apartment',
      name: 'apt.m-apartment.name',
      subtitle: 'apt.view.lake',
      guests: '2-3',
      description: 'apt.m-apartment.desc',
      amenities: ['amenity.ac', 'amenity.kitchen', 'amenity.balcony', 'amenity.bathroom', 'amenity.wifi', 'amenity.parking', 'amenity.pool', 'amenity.tv', 'amenity.wardrobe'],
      images: ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg'].map(f => `assets/Apartmani Sliki/M Apartman Lake View/${f}`)
    },
    {
      id: 'xl-lakeside',
      name: 'apt.xl-lakeside.name',
      subtitle: 'apt.view.lake',
      guests: '4-5',
      description: 'apt.xl-lakeside.desc',
      amenities: ['amenity.ac', 'amenity.fullKitchen', 'amenity.balcony', 'amenity.bathroom', 'amenity.wifi', 'amenity.parking', 'amenity.pool', 'amenity.tv', 'amenity.wardrobe'],
      images: ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'xl_lakeside.jpg'].map(f => `assets/Apartmani Sliki/XL Lake view/${f}`)
    },
    {
      id: 'xl-mountain',
      name: 'apt.xl-mountain.name',
      subtitle: 'apt.view.mountain',
      guests: '4-5',
      description: 'apt.xl-mountain.desc',
      amenities: ['amenity.ac', 'amenity.fullKitchen', 'amenity.terrace', 'amenity.bathroom', 'amenity.wifi', 'amenity.parking', 'amenity.pool', 'amenity.tv'],
      images: ['img1.jpeg', 'img2.jpeg', 'img3.jpeg', 'img4.jpeg', 'xl_mountain_view.jpg', 'xl_mountain_view - Edited.jpg'].map(f => `assets/Apartmani Sliki/XL Mountain view/${f}`)
    },
    {
      id: 'mountain-suite',
      name: 'apt.mountain-suite.name',
      subtitle: 'apt.view.mountain',
      guests: '2-3',
      description: 'apt.mountain-suite.desc',
      amenities: ['amenity.ac', 'amenity.kitchenette', 'amenity.balcony', 'amenity.bathroom', 'amenity.wifi', 'amenity.parking', 'amenity.pool', 'amenity.tv'],
      images: ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg'].map(f => `assets/Apartmani Sliki/Mountain Suite Apartment/${f}`)
    },
    {
      id: 'superior-pool',
      name: 'apt.superior-pool.name',
      subtitle: 'apt.view.poolLake',
      guests: '4-5',
      description: 'apt.superior-pool.desc',
      amenities: ['amenity.ac', 'amenity.fullKitchen', 'amenity.balcony', 'amenity.bathroom', 'amenity.wifi', 'amenity.parking', 'amenity.pool', 'amenity.tv', 'amenity.wardrobe'],
      images: ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg'].map(f => `assets/Apartmani Sliki/SuperiorPoolView/${f}`)
    },
    {
      id: 'xxl-lakeside',
      name: 'apt.xxl-lakeside.name',
      subtitle: 'apt.view.lake',
      guests: '4-5',
      description: 'apt.xxl-lakeside.desc',
      amenities: ['amenity.ac', 'amenity.fullKitchen', 'amenity.privateTerrace', 'amenity.bathroom', 'amenity.wifi', 'amenity.parking', 'amenity.pool', 'amenity.tv', 'amenity.wardrobe'],
      images: ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'xxl_lakeside.jpg'].map(f => `assets/Apartmani Sliki/XXL LakeView/${f}`)
    },
    {
      id: 'xl-lake-2',
      name: 'apt.xl-lake-2.name',
      subtitle: 'apt.view.lake',
      guests: '4',
      description: 'apt.xl-lake-2.desc',
      amenities: ['amenity.ac', 'amenity.fullKitchen', 'amenity.balcony', 'amenity.bathroom', 'amenity.wifi', 'amenity.parking', 'amenity.pool', 'amenity.tv', 'amenity.wardrobe'],
      images: ['apart_img.jpg', 'apart2_img.jpg', 'balcony_img.jpg', 'bed_img.jpg', 'chair_img.jpg', 'tv_img.jpg', 'tv2_img.jpg', 'view_img.jpg', 'wc_img.jpg'].map(f => `assets/Apartmani Sliki/XL Lake View 2/${f}`)
    },
    {
      id: 'xxl-lake-2',
      name: 'apt.xxl-lake-2.name',
      subtitle: 'apt.view.lake',
      guests: '4',
      description: 'apt.xxl-lake-2.desc',
      amenities: ['amenity.ac', 'amenity.fullKitchen', 'amenity.terrace', 'amenity.bathroom', 'amenity.wifi', 'amenity.parking', 'amenity.pool', 'amenity.tv', 'amenity.wardrobe'],
      images: ['apart_img.jpg', 'apart2_img.jpg', 'balcony_img.jpg', 'bed_img.jpg', 'light_img.jpg', 'pot_img.jpg', 'wc_img.jpg', 'window_img.jpg'].map(f => `assets/Apartmani Sliki/XXL Lake View 2/${f}`)
    },
    {
      id: 'xxl-pool-ground',
      name: 'apt.xxl-pool-ground.name',
      subtitle: 'apt.view.poolLake',
      guests: '4',
      description: 'apt.xxl-pool-ground.desc',
      amenities: ['amenity.ac', 'amenity.fullKitchen', 'amenity.terrace', 'amenity.bathroom', 'amenity.wifi', 'amenity.parking', 'amenity.pool', 'amenity.tv', 'amenity.wardrobe'],
      images: ['apart_img.jpg', 'apart2_img.jpg', 'kitchen_img.jpg', 'window_img.jpg', 'window_pool_img.jpg'].map(f => `assets/Apartmani Sliki/xxl pool and lake view ground/${f}`)
    },
    {
      id: 'l-mountain',
      name: 'apt.l-mountain.name',
      subtitle: 'apt.view.mountain',
      guests: '3-4',
      description: 'apt.l-mountain.desc',
      amenities: ['amenity.ac', 'amenity.fullKitchen', 'amenity.terrace', 'amenity.bathroom', 'amenity.wifi', 'amenity.parking', 'amenity.pool', 'amenity.tv'],
      images: ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'l_mountain_view_new.jpg', 'l_mountain_view_new_2.jpg'].map(f => `assets/Apartmani Sliki/L Mountain View/${f}`)
    }
  ];

  getById(id: string): Apartment | undefined {
    return this.apartments.find(a => a.id === id);
  }
}
