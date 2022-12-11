<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $casts = ['ends_at' => 'date'];
    protected $appends = ['formatted_ends_at'];

    public function creator() 
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to_id');
    }

    public static function boot() 
    {
        parent::boot();

        static::creating(function($task) {
            $task->created_by_id  = auth()->id();
            $task->task_status_id = TaskStatus::getId(TaskStatus::TODO);
        });
    }

    public function task_status()
    {
        return $this->belongsTo(TaskStatus::class);
    }

    public function getEndsAtAttribute() 
    {
        return Carbon::parse($this->attributes['ends_at'])->format('Y-m-d');
    }

    public function setEndsAtAttribute($value) 
    {
        $this->attributes['ends_at'] = Carbon::parse($value);
    }

    public function getFormattedEndsAtAttribute() 
    {
        return Carbon::parse($this->attributes['ends_at'])->format('d/m/Y');
    }
}
