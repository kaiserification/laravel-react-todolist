<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'           => [
                'required', 
                'string', 
                'max:255', 
                Rule::unique('tasks', 'name')->ignore($this->route('task')->id),
            ],
            'description'    => [
                'required', 
                'string', 
                'max:2000'
            ],
            'assigned_to_id' => [
                'required', 
                Rule::exists('users', 'id'),
            ],
            'task_status_id' => [
                'required',
                Rule::exists('task_statuses', 'id'),
            ],
            'ends_at'        => ['sometimes', 'date'],
        ];
    }
}
