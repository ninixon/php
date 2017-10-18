<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Information;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('h5.index');
    }
    public function post(Request $request)
    {
        $name = $request->input('name');
        $phone = $request->input('phone');
        $village = $request->input('village');
        $area = $request->input('area');

        $model = new Information;
        $model->name = $name;
        $model->phone = $phone;
        $model->village = $village;
        $model->area = $area;


        if($model->save()){
            $data['msg'] = '提交成功';
        }else{
            $data['msg'] = 0;
        }

        echo json_encode($data);
    }
}



