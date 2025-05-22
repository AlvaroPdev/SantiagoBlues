import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logos.component.html',
  styleUrls: ['./logos.component.css']
})
export class LogosComponent {
  logos = [
    { src: 'assets/logos/google-analytics-2.svg', alt: 'Google Analytics Logo' },
    { src: 'assets/logos/Google_Ads_icon.svg', alt: 'Google Ads Logo' },
    { src: 'assets/logos/facebook-ads.svg', alt: 'Facebook Ads Logo' },
    { src: 'assets/logos/mailchimp.svg', alt: 'Mailchimp Logo' },
    { src: 'assets/logos/shopify-2.svg', alt: 'Shopify Logo' },
    { src: 'assets/logos/wordpress-icon.svg', alt: 'WordPress Logo' },
    { src: 'assets/logos/amazon-web-services.svg', alt: 'Amazon Web Services Logo' }
  ];
}
