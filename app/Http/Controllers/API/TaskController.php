<?php

namespace App\Http\Controllers\API;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Resources\TaskResource;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Controllers\AppBaseController;

class TaskController extends AppBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Task::query()->latest('id');

        if(request('status') && request('status') !== 'ALL') {
            $query = $query->whereHas('task_status', function($q) {
                return $q->where('task_statuses.name', request('status'));
            });
        }

        if(request('myTasks') && request('myTasks') == '1') {
            $query = $query->where('assigned_to_id', $request->user()->id);
        }

        $data = $query->paginate(10);
        
        return response([
            'pagination' => $this->paginationInfo($data),
            'data'       => TaskResource::collection($data),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTaskRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTaskRequest $request)
    {
        $task = Task::create($request->validated());

        return response(TaskResource::make($task), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        return response(TaskResource::make($task));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTaskRequest  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        $task->refresh();

        return response(TaskResource::make($task));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        $task->delete();
        
        return response('', 204);
    }
}
