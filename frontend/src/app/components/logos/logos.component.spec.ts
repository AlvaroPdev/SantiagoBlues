import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogosComponent } from './logos.component';

describe('LogosComponent', () => {
  let component: LogosComponent;
  let fixture: ComponentFixture<LogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const compiled = fixture.nativeElement;
    const title = compiled.querySelector('h2');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Algunas de las herramientas que usamos frecuentemente');
  });

  it('should have a logos grid container', () => {
    const compiled = fixture.nativeElement;
    const grid = compiled.querySelector('.logos-grid');
    expect(grid).toBeTruthy();
  });

  it('should have 8 logos defined', () => {
    expect(component.logos.length).toBe(8);
  });

  it('should render all logos', () => {
    const compiled = fixture.nativeElement;
    const images = compiled.querySelectorAll('img');
    expect(images.length).toBe(8);
  });

  it('should have correct logo data structure', () => {
    component.logos.forEach(logo => {
      expect(logo.src).toBeDefined();
      expect(logo.alt).toBeDefined();
      expect(typeof logo.src).toBe('string');
      expect(typeof logo.alt).toBe('string');
    });
  });

  it('should have correct logo sources', () => {
    const expectedSources = [
      'assets/logos/google-analytics-2.svg',
      'assets/logos/Google_Ads_icon.svg',
      'assets/logos/facebook-ads.svg',
      'assets/logos/hubspot.svg',
      'assets/logos/mailchimp.svg',
      'assets/logos/shopify-2.svg',
      'assets/logos/wordpress-icon.svg',
      'assets/logos/amazon-web-services.svg'
    ];

    component.logos.forEach((logo, index) => {
      expect(logo.src).toBe(expectedSources[index]);
    });
  });

  it('should have descriptive alt texts', () => {
    component.logos.forEach(logo => {
      expect(logo.alt).toContain('Logo');
      expect(logo.alt.length).toBeGreaterThan(0);
    });
  });
});
