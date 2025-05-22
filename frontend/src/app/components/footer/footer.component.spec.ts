import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display current year in copyright', () => {
    const compiled = fixture.nativeElement;
    const copyrightText = compiled.querySelector('.footer-bottom p');
    expect(copyrightText.textContent).toContain(component.currentYear.toString());
  });

  it('should have correct social links', () => {
    const expectedLinks = [
      { icon: 'fab fa-facebook-f', url: 'https://facebook.com/santiagoblues' },
      { icon: 'fab fa-instagram', url: 'https://instagram.com/santiagoblues' },
      { icon: 'fab fa-twitter', url: 'https://twitter.com/santiagoblues' },
      { icon: 'fab fa-youtube', url: 'https://youtube.com/santiagoblues' }
    ];

    expect(component.socialLinks.length).toBe(expectedLinks.length);
    component.socialLinks.forEach((link, index) => {
      expect(link.icon).toBe(expectedLinks[index].icon);
      expect(link.url).toBe(expectedLinks[index].url);
    });
  });

  it('should render all footer sections', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('.footer-section');
    expect(sections.length).toBe(3);
  });

  it('should have company information section', () => {
    const compiled = fixture.nativeElement;
    const companySection = compiled.querySelector('.footer-section:first-child');
    
    expect(companySection.querySelector('h3')).toBeTruthy();
    expect(companySection.querySelector('p')).toBeTruthy();
    expect(companySection.querySelectorAll('.contact-info').length).toBe(2);
  });

  it('should have services section with correct links', () => {
    const compiled = fixture.nativeElement;
    const servicesSection = compiled.querySelector('.footer-section:nth-child(2)');
    const services = servicesSection.querySelectorAll('li');
    
    expect(services.length).toBe(4);
    expect(services[0].textContent).toContain('Diseño Web');
    expect(services[1].textContent).toContain('Desarrollo Web');
    expect(services[2].textContent).toContain('Marketing Digital');
    expect(services[3].textContent).toContain('SEO');
  });

  it('should have social media section with correct links', () => {
    const compiled = fixture.nativeElement;
    const socialSection = compiled.querySelector('.footer-section:last-child');
    const socialLinks = socialSection.querySelectorAll('a');
    
    expect(socialLinks.length).toBe(component.socialLinks.length);
    socialLinks.forEach((link: HTMLAnchorElement, index: number) => {
      expect(link.href).toBe(component.socialLinks[index].url);
      const icon = link.querySelector('i');
      expect(icon).toBeTruthy();
      const iconClasses = icon?.className.split(' ');
      expect(iconClasses).toContain('fab');
      expect(iconClasses).toContain(component.socialLinks[index].icon.split(' ')[1]);
    });
  });

  it('should have contact information', () => {
    const compiled = fixture.nativeElement;
    const contactInfo = compiled.querySelectorAll('.contact-info');
    
    expect(contactInfo.length).toBe(2);
    expect(contactInfo[0].textContent).toContain('+56 9 1234 5678');
    expect(contactInfo[1].textContent).toContain('info@santiagoblues.cl');
  });

  it('should have correct structure with footer-bottom', () => {
    const compiled = fixture.nativeElement;
    const footerBottom = compiled.querySelector('.footer-bottom');
    
    expect(footerBottom).toBeTruthy();
    expect(footerBottom.querySelector('p')).toBeTruthy();
  });

  it('should have all social media icons', () => {
    const compiled = fixture.nativeElement;
    const socialIcons = compiled.querySelectorAll('.social-links i');
    
    expect(socialIcons.length).toBe(4);
    const iconClasses = Array.from(socialIcons).map(icon => (icon as HTMLElement).className.split(' '));
    expect(iconClasses[0]).toContain('fa-facebook-f');
    expect(iconClasses[1]).toContain('fa-instagram');
    expect(iconClasses[2]).toContain('fa-twitter');
    expect(iconClasses[3]).toContain('fa-youtube');
  });
});
