import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, computed, HostListener,signal ,input, Inject, PLATFORM_ID } from '@angular/core';
import { MainComponent } from "../main/main.component";
import { sidebarComponent } from '../../component/navbar/navbar.component';
@Component({
  selector: 'app-layout',
  imports: [CommonModule, sidebarComponent, MainComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
isLeftSidebarCollapsed = signal<boolean>(false);
    screenWidth = signal<number>(0);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.screenWidth.set(window.innerWidth);
            this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
        }
    }

    @HostListener('window:resize')
    onResize() {
        if (isPlatformBrowser(this.platformId)) {
            this.screenWidth.set(window.innerWidth);
            if (this.screenWidth() < 768) {
                this.isLeftSidebarCollapsed.set(true);
            }
        }
    }

    changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
        this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
    }
}
