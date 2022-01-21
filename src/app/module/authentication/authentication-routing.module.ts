import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { AuthenticationComponent } from "./authentication.component";
import { AuthenGuard } from "src/app/core/guards/authen.guard";

const routes : Routes = [
    {
        path: 'login',
        component: AuthenticationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthenticationRoutingModule{}