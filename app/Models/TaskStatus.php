<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskStatus extends Model
{
    use HasFactory;

    const TODO        = 'TODO';
    const IN_PROGRESS = 'IN_PROGRESS';
    const DONE        = 'DONE';
    const BLOCKED     = 'BLOCKED';

    const LIST = [
        self::TODO        => 'A faire',
        self::IN_PROGRESS => 'En cours',
        self::DONE        => 'Terminé',
        self::BLOCKED     => 'Bloqué',
    ];

    protected $guarded = [];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public static function getId($name) 
    {
        return self::firstWhere('name', $name)->value('id');
    }
}
