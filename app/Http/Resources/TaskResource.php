<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'                => $this->id,
            'name'              => $this->name,
            'description'       => $this->description,
            'assigned_to_id'    => $this->assigned_to_id,
            'created_by_id'     => $this->created_by_id,
            'task_status_id'    => $this->task_status_id,
            'creator'           => UserResource::make($this->creator),
            'assignee'          => UserResource::make($this->assignee),
            'task_status'       => TaskStatusResource::make($this->task_status),
            'ends_at'           => $this->ends_at, 
            'formatted_ends_at' => $this->formatted_ends_at, 
        ];
    }
}
