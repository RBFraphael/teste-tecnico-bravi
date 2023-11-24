<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Artisan;

class ApplicationSetupController extends Controller
{
    public function database()
    {
        Artisan::call("migrate:fresh --seed");
        return "<pre>".Artisan::output()."</pre>";
    }

    public function database_upgrade()
    {
        Artisan::call("migrate");
        return "<pre>".Artisan::output()."</pre>";
    }

    public function storage()
    {
        Artisan::call("storage:link");
        return "<pre>".Artisan::output()."</pre>";
    }
}
