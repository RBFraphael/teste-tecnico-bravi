<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Repositories\UsersRepository;
use Illuminate\Database\Eloquent\Model;

class UsersController extends Controller
{
    protected Model $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $repository = new UsersRepository($this->model);

        if($filter = request("filter")){ $repository->filter($filter); }
        if($search = request("search")){ $repository->search($search); }
        if($with = request("with")){ $repository->related($with); }
        
        $users = $repository->get();

        return $users;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $user = User::create(request([
            "name", "email", "password"
        ]));

        return $user;
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        if($with = request("with")){
            $user->load(explode(",", $with));
        }

        return $user;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update(request([
            "name", "email", "password"
        ]));

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'message' => __("Successfully deleted user")
        ], 204);
    }
}
