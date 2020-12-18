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

        return [
            'translate' => $tr->translate($request->text),
        ];
    }

    public function organize(Request $request)
    {
        $result = preg_replace('/\t|\n|\r/', " ", $request->text);
        $result = preg_replace('/\t|\.|\r/', ".\n", $result);
        $result = preg_replace('/^\s/m', "\n", $result);

        return [
            'organize' => $result,
        ];
    }

    public function organizeTranslate(Request $request)
    {
        $organize = $this->organize($request);
        $request->text = $organize['organize'];
        $translate = $this->translate($request);

        return [
            'organize' => $organize['organize'],
            'translate' => $translate['translate'],
        ];
    }
}
