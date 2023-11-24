import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IconDefinition, faChartBar, faIdBadge, faRightFromBracket, faUserShield } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {

    username: string = "";

    //#region icons
    logoutIcon: IconDefinition = faRightFromBracket;
    dashboardIcon: IconDefinition = faChartBar;
    peopleIcon: IconDefinition = faIdBadge;
    usersIcon: IconDefinition = faUserShield;
    //#endregion

    constructor(
        private router: Router,
        private service: AuthService
    ) {
        this.username = sessionStorage.getItem("username") ?? "";
    }

    logout = () => {
        this.service.logout().subscribe({
            next: (data) => {
                sessionStorage.clear();
                this.router.navigateByUrl("/login");
            },
            error: (error) => {
                console.error(error);
            }
        });
    }
}
