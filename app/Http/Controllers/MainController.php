<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stichoza\GoogleTranslate\GoogleTranslate;

class MainController extends Controller
{
    public function translate(Request $request)
    {
        $tr = new GoogleTranslate('en');
        $tr->setSource('en');
        $tr->setTarget('fa');

        $data = [
            'translate' => $tr->translate($request->text),
        ];

        return $data;
    }
}
