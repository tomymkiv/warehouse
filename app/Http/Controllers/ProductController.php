<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductsRequest;
use App\Models\Products;

class ProductController extends Controller
{
    public static function index(){
        return inertia('products/index', [
            'products' => Products::all(), // llamo a TODOS los productos (mala práctica para producción por la sobrecarga de recursos, pero está hecho con fines académicos)
        ]);
    }
    public static function create(){
        return inertia('products/create', [
            'products' => new Products() 
        ]);
    }
    public static function store(ProductsRequest $request){
        $validated = $request->validated();
        Products::create($validated);

        return redirect()->route('products.index');
    }
}
