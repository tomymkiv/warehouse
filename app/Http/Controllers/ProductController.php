<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductsRequest;
use App\Models\Products;
use Inertia\Inertia;

class ProductController extends Controller
{
    // listado de productos
    public static function index()
    {
        $products = Products::latest()->paginate(2);
        // dd($products);

        return Inertia::render('products/index', [
            'products' => $products,
        ]);
    }

    public static function show(Products $product)
    {
        return inertia('products/show', [
            'products' => Products::findOrFail($product->id),
        ]);
    }

    // vista de la creacion
    public static function create()
    {
        return inertia('products/create', [
            'products' => new Products,
        ]);
    }

    // logica (backend) para la creacion
    public static function store(ProductsRequest $request)
    {
        $validated = $request->validated();
        Products::create($validated);

        return redirect()->route('products.index');
    }

    public static function update(ProductsRequest $request, Products $product)
    {
        $validated = $request->validated();

        $product->update($validated);

        return redirect()->route('products.index');
    }

    // vista de la edicion
    public static function edit(Products $product)
    {
        return inertia('products/edit', [
            'product' => $product,
        ]);
    }

    public static function destroy(Products $product)
    {
        $product->delete();

        return redirect()->route('products.index');
    }
}
