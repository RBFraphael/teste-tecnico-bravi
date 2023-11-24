<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get("setup/database", "App\\Http\\Controllers\\ApplicationSetupController@database");
Route::get("setup/database-upgrade", "App\\Http\\Controllers\\ApplicationSetupController@database_upgrade");
Route::get("setup/storage", "App\\Http\\Controllers\\ApplicationSetupController@storage");

Route::prefix("v1")->namespace("App\\Http\\Controllers\\Api\\V1")->group(function(){

    Route::prefix("auth")->group(function(){

        Route::post("login", "AuthController@login");
        Route::post("refresh", "AuthController@refresh");
        Route::get("me", "AuthController@me");
        Route::post("logout", "AuthController@logout");

    });

    Route::middleware("auth:api")->group(function(){

        Route::resource("users", "UsersController");

        Route::resource("people", "PeopleController");

    });

});
