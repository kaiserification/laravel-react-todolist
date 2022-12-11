<?php

namespace App\Http\Controllers\API;

use App\Models\TaskStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\TaskStatusResource;
use App\Http\Requests\StoreTaskStatusRequest;
use App\Http\Requests\UpdateTaskStatusRequest;

class TaskStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $taskStatuses = TaskStatus::query()->get();

        return response(TaskStatusResource::collection($taskStatuses));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreTaskStatusRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTaskStatusRequest $request)
    {
        $taskStatus = TaskStatus::create($request->validated());

        return response(TaskStatusResource::make($taskStatus), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  TaskStatus $taskStatus
     * @return \Illuminate\Http\Response
     */
    public function show(TaskStatus $taskStatus)
    {
        return response(TaskStatusResource::make($taskStatus), 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  TaskStatus $taskStatus
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTaskStatusRequest $request, TaskStatus $taskStatus)
    {
        $taskStatus->update($request->validated());

        $taskStatus->refresh();

        return response(TaskStatusResource::make($taskStatus));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  TaskStatus $taskStatus
     * @return \Illuminate\Http\Response
     */
    public function destroy(TaskStatus $taskStatus)
    {
        $taskStatus->delete();
        
        return response('', 204);
    }
}
