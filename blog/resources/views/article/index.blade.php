@extends('layouts.app')

@section('content')
    @component('particals.jumbotron',['aa' => 'bb'])
        @slot('title')
            拒绝2323
        @endslot
        <h3>{{ config('blog.article.title') }}----</h3>

        <h6>{{ config('blog.article.description') }}+++++</h6>
    @endcomponent

    @include('widgets.article')

    {{ $articles->links('pagination.default') }}

@endsection