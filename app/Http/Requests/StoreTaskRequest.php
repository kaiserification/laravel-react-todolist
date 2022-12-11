<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
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
            'name'           => ['required', 'string', 'max:255', 'unique:tasks,name'],
            'description'    => ['required', 'string', 'max:2000'],
            'assigned_to_id' => ['required', 'exists:users,id'],
            'ends_at'        => ['nullable', 'date', 'after:today', 'not_in:today'],
        ];
    }
}
