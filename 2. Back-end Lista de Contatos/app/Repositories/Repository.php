<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Repository
{
    protected Model|Builder $model;
    protected array $searchable;

    /**
     * Build a new Repository instance
     * 
     * @param Model $model The base model for this instance
     * @return void 
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Apply specified filters to query as WHERE clause
     * 
     * @param array $filters An key-value array with the conditions
     * @return void 
     */
    public function filter(array $filters)
    {
        foreach($filters as $filter){
            $filter = explode(":", $filter);
            $this->model = $this->model->where($filter[0], $filter[1]);
        }
    }

    /**
     * Do a WHERE LIKE %...% clause on all fields specified by $searchable parameter
     * 
     * @param string $query The value to search
     * @return void 
     */
    public function search(string $query)
    {
        foreach($this->searchable as $field){
            $this->model = $this->model->orWhere($field, "LIKE", "%$query%");
        }
    }

    /**
     * Specify the order of the query by a field and order type (ASC or DESC)
     * 
     * @param string $field The field to order
     * @param string $order The order (default: asc)
     * @return void 
     */
    public function order(string $field, string $order = "asc")
    {
        $this->model = $this->model->orderBy($field, $order);
    }

    /**
     * Specify the fields to retrieve from database. If not specified, all fields will be returned.
     * 
     * @param string $fields A comma-separated list of fields
     * @return void 
     */
    public function fields(string $fields)
    {
        $this->model = $this->model->selectRaw($fields);
    }

    /**
     * Specify related models to retrieve with the records.
     * @param string $relationships A comma-separated list of related models
     * @return void 
     */
    public function related(string $relationships)
    {
        $with = explode(",", $relationships);
        $this->model = $this->model->with($with);
    }

    /**
     * Process the query and return the results
     * 
     * @return mixed The query results
     */
    public function get()
    {
        return $this->model->get();
    }

    /**
     * Return the first registry found when processing the query, or null if there are no results.
     * 
     * @return mixed The first registry
     */
    public function first()
    {
        return $this->model->first();
    }

    /**
     * Return the last registry found when processing the query, or null if there are no results.
     * 
     * @return mixed The last registry
     */
    public function last()
    {
        return $this->model->last();
    }
}
