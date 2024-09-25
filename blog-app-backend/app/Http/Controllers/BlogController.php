<?php

namespace App\Http\Controllers;
use App\Models\Blog;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::orderBy('created_at','DESC')->get();
        return response()->json([
      'status' => true,
      'data'=>$blogs
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
             'title'=>'required|max:255',
             'author'=>'required|max:255|min:3'
        ]);

        if($validator->fails()){
            return response()->json([
        'status'=>false,'message'=>'Please fix the errors',
        'errors'=>$validator->errors()
            ]);
        }
        $blog = new Blog();
        $blog->title = $request->title;
        $blog->shortDesc = $request->shortDesc;
        $blog->description = $request->description;
        $blog->author = $request->author;
        // for image column
          if ($request->hasFile('image')) {
            $request->validate([
                'image'=>'image|required|mimes:jpeg,png,jpg,gif,svg,|max:2048'
            ]);
            // Store the image in the "public" disk and get the path
            $path = $request->file('image')->store('public');
            $blog->image = $path; // Store the path in the database
       
        }
        $blog->save();

        return response()->json([
        'status'=>true,'message'=>'Blog created successfully',
        'data'=>$blog
            ]);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $blog= Blog::find($id);
        if($blog == null){
            return response()->json([
                'status'=>false,
                'data'=>'Blog not found'
            ]);
        }
      $blog['date'] = \Carbon\Carbon::parse($blog->created_at)->format('d M Y');

          return response()->json([
                'status'=>true,
                'data'=> $blog
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Log::info($request);
        $blog = Blog::find($id);

       if($blog == null){
            return response()->json([
                'status'=>false,
                'data'=>'Blog not found'
            ]);
        }   
        
      $validator = Validator::make($request->all(),[
             'title'=>'required|max:255',
             'author'=>'required|max:255|min:3'
        ]);

        if($validator->fails()){
            return response()->json([
        'status'=>false,'message'=>'Please fix the errors',
        'errors'=>$validator->errors()
            ]);
        }
      
        $blog->title = $request->title;
        $blog->shortDesc = $request->shortDesc;
        $blog->description = $request->description;
        $blog->author = $request->author;
        // for image column
          if ($request->hasFile('image')) {
            $request->validate([
                'image'=>'image|required|mimes:jpeg,png,jpg,gif,svg,|max:2048'
            ]);
            // Store the image in the "public" disk and get the path
            $path = $request->file('image')->store('public');
            $blog->image = $path; // Store the path in the database
       
        }
        $blog->save();

        return response()->json([
        'status'=>true,'message'=>'Blog updated successfully',
        'data'=>$blog
            ]);
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
