<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Inertia\Inertia;

class ProductController extends Controller
{
    public static function index(){
        return inertia('products/index', [
            'products' => Products::all(), // llamo a TODOS los productos (mala práctica para producción por la sobrecarga de recursos, pero está hecho con fines académicos)
        ]);
    }
    public static function create(){
        return inertia('products/create', [
            'products' => [], // llamo a TODOS los productos (mala práctica para producción por la sobrecarga de recursos, pero está hecho con fines académicos)
        ]);
    }
}
