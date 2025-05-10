<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Stock;
use Storage;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Item::withWhereHas('stock')->get();

        return response()->json($items);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $item = new Item;
        $item->description = $request->description;
        $item->sell_price = $request->sell_price;
        $item->cost_price = $request->cost_price;
        $files = $request->file('uploads');
        $item->image = 'storage/images/' . $files->getClientOriginalName();
        $item->save();

        $stock = new Stock();
        $stock->item_id = $item->item_id;
        $stock->quantity = $request->quantity;
        $stock->save();


        Storage::put('public/images/' . $files->getClientOriginalName(), file_get_contents($files));
        return response()->json(["success" => "item created successfully.", "item" => $item, "status" => 200]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
