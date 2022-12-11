<?php

namespace App\Http\Controllers;

class AppBaseController
{
    public function paginationInfo($page) 
    {
        return [
            'total'        => $page->total(),
            'per_page'     => $page->perPage(),
            'current_page' => $page->currentPage(),
            'last_page'    => $page->lastPage(),
            'from'         => $page->firstItem(),
            'to'           => $page->lastItem()
        ];
    }
}
