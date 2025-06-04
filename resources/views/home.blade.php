{{-- filepath: resources/views/shop/home.blade.php --}}
@extends('layouts.master')

@section('content')
    <div class="container" id="items">
        <h1 class="mb-4">Shop Products</h1>
      
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/shop.js') }}"></script>
@endpush
