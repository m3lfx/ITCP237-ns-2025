{{-- filepath: resources/views/cart.blade.php --}}
@extends('layouts.master')

@section('content')
<div class="container">
    <h1>Your Cart</h1>
    <div id="cartTable"></div>
    <a href="/" class="btn btn-secondary mt-3">Continue Shopping</a>
    <button id="checkoutBtn" class="btn btn-primary mt-3">Checkout</button>
</div>
@endsection

@push('scripts')
<script src="{{ asset('js/cart.js') }}"></script>
@endpush