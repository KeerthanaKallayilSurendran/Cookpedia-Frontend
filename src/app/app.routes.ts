import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ReciepesComponent } from './reciepes/reciepes.component';
import { SavedRecipeComponent } from './saved-recipe/saved-recipe.component';
import { ViewReciepeComponent } from './view-reciepe/view-reciepe.component';
import { PnfComponent } from './pnf/pnf.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    // lazy loaded admin module - http://localhost:4200/admin
    {
        path:'admin', canActivate:[authGuard], loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
    },

    // to setup path for base url - http://localhost:4200/
    {
        path:"",
        component:HomeComponent,
        title:"Home Page"
    },
    // to setup path for - http://localhost:4200/about
    {
        path:"about",
        component:AboutComponent,
        title:"About Page"
    },
    // to setup path for - http://localhost:4200/contact
    {
        path:"contact",
        component:ContactComponent,
        title:"Contact Page"
    },
    // to setup path for - http://localhost:4200/login
    {
        path:"login",
        component:LoginComponent,
        title:"Login Page"
    },
    // to setup path for - http://localhost:4200/register
    {
        path:"register",
        component:RegisterComponent,
        title:"Register Page"
    },
    // to setup path for - http://localhost:4200/all-recipes
    {
        path:"all-recipes",
        component:ReciepesComponent,
        title:"All Recipes Page"
    },
    // to setup path for - http://localhost:4200/profile
    {
        path:"profile",
        canActivate:[authGuard],
        component:ProfileComponent,
        title:"Profile Page"
    },
    // to setup path for - http://localhost:4200/save-recipe
    {
        path:"save-recipe",
        canActivate:[authGuard],
        component:SavedRecipeComponent,
        title:"Save Recipes Collection"
    },
    // to setup path for - http://localhost:4200/recipe/:id/view
    {
        path:"recipe/:id/view",
        canActivate:[authGuard],
        component:ViewReciepeComponent,
        title:"View Recipes"
    },
    // to setup path for - http://localhost:4200/recipe/*
    {
        path:"**",
        component:PnfComponent,
        title:"Page Not Found"
    },

];
